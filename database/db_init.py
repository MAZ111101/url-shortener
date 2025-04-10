import psycopg2
import json

conn = psycopg2.connect(
    dbname="urlshortener",
    user="postgres",
    password="mysecretpassword",
    host="localhost",
    port="5433"
)

cur = conn.cursor()

cur.execute("""
CREATE TABLE IF NOT EXISTS url (
    url_id SERIAL PRIMARY KEY,
    url VARCHAR(100) NOT NULL,
    key VARCHAR(100) NOT NULL UNIQUE
)
""")

conn.commit()
cur.close()
conn.close()
