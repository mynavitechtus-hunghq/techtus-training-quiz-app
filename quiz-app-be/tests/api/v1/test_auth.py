from app.core.config import settings
from app.models.role import Role, UserRole
from app.core.error_codes import ErrorCode


def test_register_user(client, db):
    # Ensure role exists
    role = db.query(Role).filter(Role.name == UserRole.USER).first()
    if not role:
        role = Role(name=UserRole.USER)
        db.add(role)
        db.commit()

    data = {
        "email": "test@example.com",
        "password": "testpassword",
    }
    response = client.post(
        f"{settings.API_V1_STR}/auth/register",
        json=data,
    )
    assert response.status_code == 201
    content = response.json()
    assert content["code"] == 201
    assert content["message"] == "User registered successfully"
    assert content["data"]["email"] == data["email"]
    assert "id" in content["data"]
    assert "password" not in content["data"]


def test_register_user_duplicate(client, db):
    # Ensure role and initial user exist
    role = db.query(Role).filter(Role.name == UserRole.USER).first()
    if not role:
        role = Role(name=UserRole.USER)
        db.add(role)
        db.commit()

    data = {
        "email": "duplicate@example.com",
        "password": "testpassword",
    }
    # Create first user
    client.post(f"{settings.API_V1_STR}/auth/register", json=data)

    # Try to create again
    response = client.post(
        f"{settings.API_V1_STR}/auth/register",
        json=data,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["code"] == ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
    assert content["message"] == "Email already registered"
    assert content["data"] is None
