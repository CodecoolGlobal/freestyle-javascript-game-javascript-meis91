from psycopg2.extras import RealDictCursor
import connection

@connection.connection_handler
def get_highscore_list(cursor: RealDictCursor):
    query = """
        SELECT user_name, score
        FROM users
        ORDER BY score DESC
        LIMIT 5;
        """
    cursor.execute(query)
    return cursor.fetchall()

@connection.connection_handler
def add_user_name(cursor, user_name):
    query = """
        INSERT INTO users
        VALUES (default, %s, 0)
        """
    cursor.execute(query, (user_name,))
    return

@connection.connection_handler
def update_user_score(cursor, score):
    query = """
        UPDATE users
        SET score = %s
        WHERE user_id = (SELECT MAX(user_id) FROM users);
        """
    cursor.execute(query, (score,))
    return