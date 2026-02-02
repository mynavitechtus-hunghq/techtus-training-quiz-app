from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api import deps
from app.crud import crud_user
from app.models.role import UserRole
from app.schemas.response import ResponseBase
from app.schemas.user import UserCreate, UserOut

from app.core.exceptions import AppException

from app.core.error_codes import ErrorCode

router = APIRouter()


@router.post(
    "/register",
    response_model=ResponseBase[UserOut],
    status_code=status.HTTP_201_CREATED,
)
def register_user(user_in: UserCreate, db: Session = Depends(deps.get_db)):
    user = crud_user.get_user_by_email(db=db, email=user_in.email)
    if user:
        raise AppException(
            code=ErrorCode.AUTH_EMAIL_ALREADY_EXISTS,
            message="Email already registered",
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    role = crud_user.get_role_by_name(db, name=UserRole.USER)
    if not role:
        raise AppException(
            code=ErrorCode.AUTH_ROLE_NOT_FOUND,
            message="User role not found in database",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    db_user = crud_user.create_user(db=db, user=user_in, role_id=role.id)
    return {
        "code": status.HTTP_201_CREATED,
        "message": "User registered successfully",
        "data": db_user,
    }
