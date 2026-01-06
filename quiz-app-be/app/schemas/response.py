from typing import Any, Generic, Optional, TypeVar, Union
from pydantic import BaseModel

T = TypeVar("T")


class ResponseBase(BaseModel, Generic[T]):
    code: Union[int, str]
    message: str
    data: Optional[T] = None
