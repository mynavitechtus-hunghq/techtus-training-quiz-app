from sqlalchemy.sql.functions import func
from sqlalchemy.sql.sqltypes import DateTime
from sqlalchemy.sql.schema import Column
from sqlalchemy.sql.sqltypes import Integer
from typing import Any
from sqlalchemy.ext.declarative import as_declarative, declared_attr


@as_declarative()
class Base:
    id: Integer = Column(Integer, primary_key=True)
    created_at: Column(DateTime, default=func.now())
    updated_at: Column(DateTime, default=func.now(), onupdate=func.now())
    deleted_at: Column(DateTime, nullable=True)

    __name__: str

    # Generate __tablename__ automatically
    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower()
