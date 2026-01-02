from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class Role(Base):
    name = Column(String, unique=True, index=True, nullable=False)
    description = Column(String, nullable=True)

    users = relationship("User", back_populates="role")