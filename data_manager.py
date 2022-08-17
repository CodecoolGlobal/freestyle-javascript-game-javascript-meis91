import psycopg2
from psycopg2.extras import RealDictCursor
import connection


@connection.connection_handler
def get_highscore_list(cursor: RealDictCursor):
    query = """
        SELECT user_name, score
        FROM users
        LIMIT 5;
        """
    cursor.execute(query)
    return cursor.fetchall()
