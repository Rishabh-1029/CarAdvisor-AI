import os
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import create_engine

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

ASYNC_DATABASE_URL = DATABASE_URL.replace(
    "postgresql://",
    "postgresql+psycopg://"
)

async_engine = create_async_engine(
    ASYNC_DATABASE_URL,
    echo=True,
    pool_pre_ping=True
)

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)
