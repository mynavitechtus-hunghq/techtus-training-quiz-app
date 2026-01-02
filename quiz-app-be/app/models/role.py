from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_class import Base


class Role(Base):
    name: Mapped[str] = mapped_column(
        String, unique=True, index=True, nullable=False
    )
    description: Mapped[str | None] = mapped_column(String, nullable=True)

    users: Mapped[list["User"]] = relationship("User", back_populates="role")
