from sqlalchemy import create_engine, text
import os

DATABASE_URL = os.getenv("DATABASE_URL","postgresql://localhost/truedrive")

engine = create_engine(DATABASE_URL, pool_pre_ping=True)