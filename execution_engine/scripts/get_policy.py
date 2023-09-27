import os
import sqlite3

def run():
    conn = sqlite3.connect(os.environ["DB_PATH"])
    cursor = conn.cursor()

    cursor.execute(os.environ["SELECT_POLICIES_QUERY"])
    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return rows