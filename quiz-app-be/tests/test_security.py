from app.core.security import (
    get_password_hash,
    verify_password,
    create_access_token,
)
from jose import jwt
from app.core.config import settings


def test_password_hashing():
    password = "secret_password"
    hashed_password = get_password_hash(password)
    assert hashed_password != password
    assert verify_password(password, hashed_password) is True
    assert verify_password("wrong_password", hashed_password) is False


def test_create_access_token():
    subject = "test_user"
    token = create_access_token(subject)
    payload = jwt.decode(token, settings.SECRET_KEY, [settings.ALGORITHM])
    assert payload["sub"] == subject
