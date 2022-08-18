
from psycopg2.extras import RealDictCursor
import connection
import psycopg2


@connection.connection_handler
def get_highscore_list(cursor: RealDictCursor):
    query = """
        SELECT *
        FROM users
        ORDER BY score DESC;
        """
    cursor.execute(query)
    return cursor.fetchall()
