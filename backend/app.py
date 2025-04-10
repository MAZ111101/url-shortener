from flask import Flask, request, jsonify, redirect
import psycopg2
import string
import random
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_db_connection():
    conn = psycopg2.connect(
        dbname="urlshortener",
        user="postgres",
        password="mysecretpassword",
        host="localhost",
        port="5433"
    )
    return conn

def generate_key(length=6):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

@app.route('/shorten', methods=['POST'])
def shorten_url():
    data = request.get_json()
    url = data.get('url')

    if not url:
        return jsonify({'error': 'URL is required'}), 400

    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("SELECT key FROM url WHERE url = %s", (url,))
        result = cur.fetchone()

        if result:
            shortened_url = f"http://localhost:5000/{result[0]}"
            return jsonify({'shortened_url': shortened_url})

        key = generate_key()
        cur.execute("INSERT INTO url (url, key) VALUES (%s, %s) RETURNING key", (url, key))
        conn.commit()
        shortened_url = f"http://localhost:5000/{key}"
        return jsonify({'shortened_url': shortened_url})
    
    except Exception as e:
        conn.rollback()
        return jsonify({'error': 'Failed to shorten URL', 'details': str(e)}), 500
    finally:
        cur.close()
        conn.close()

@app.route('/<key>', methods=['GET'])
def retrieve_url(key):
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("SELECT url FROM url WHERE key = %s", (key,))
        result = cur.fetchone()

        if result:
            return jsonify({'url': result[0]})
        else:
            return jsonify({'error': 'Short URL not found'}), 404
    except Exception as e:
        print(f"Error retrieving URL: {e}")
        return jsonify({'error': 'Error retrieving URL'}), 500
    finally:
        cur.close()
        conn.close()

if __name__ == '__main__':
    app.run(debug=True)