from fastapi import FastAPI
from fastapi.exceptions import HTTPException, RequestValidationError
from app.core.config import settings
from app.api.v1.api import api_router
from app.core.exceptions import (
    AppException,
    app_exception_handler,
    http_exception_handler,
    validation_exception_handler,
)
import uvicorn

app = FastAPI(title=settings.PROJECT_NAME)

app.add_exception_handler(AppException, app_exception_handler)
app.add_exception_handler(HTTPException, http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)

app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/")
def read_root():
    return {"message": "Welcome to Quiz App API"}


def start():
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
