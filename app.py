from flask import Flask, render_template, jsonify, request, session
from flask_cors import CORS
import json
import sqlite3
from datetime import datetime
import hashlib
import secrets

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)
CORS(app)

# Database initialization
def init_db():
    conn = sqlite3.connect('maki_accounts.db')
    cursor = conn.cursor()
    
    # Create accounts table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS accounts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            level INTEGER NOT NULL,
            tier TEXT NOT NULL,
            tier_display TEXT NOT NULL,
            kd_ratio REAL NOT NULL,
            price INTEGER NOT NULL,
            image_url TEXT,
            badges TEXT,
            matches INTEGER,
            wins INTEGER,
            survival_time TEXT,
            featured BOOLEAN DEFAULT 0,
            sold BOOLEAN DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Create orders table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_email TEXT NOT NULL,
            customer_name TEXT NOT NULL,
            account_ids TEXT NOT NULL,
            total_amount INTEGER NOT NULL,
            status TEXT DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Create users table for sellers
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            is_seller BOOLEAN DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()

# Initialize database on startup
init_db()

# Sample data insertion
def insert_sample_data():
    conn = sqlite3.connect('maki_accounts.db')
    cursor = conn.cursor()
    
    # Check if data already exists
    cursor.execute('SELECT COUNT(*) FROM accounts')
    if cursor.fetchone()[0] > 0:
        conn.close()
        return
    
    sample_accounts = [
        {
            'title': 'Conqueror Account - Season 24',
            'level': 85,
            'tier': 'conqueror',
            'tier_display': 'Conqueror',
            'kd_ratio': 4.2,
            'price': 299,
            'image_url': '/placeholder.svg?height=200&width=300',
            'badges': 'verified,premium',
            'matches': 1250,
            'wins': 320,
            'survival_time': '15.2 min',
            'featured': 1
        },
        {
            'title': 'Ace Master - Rare Skins',
            'level': 72,
            'tier': 'ace',
            'tier_display': 'Ace Master',
            'kd_ratio': 3.8,
            'price': 199,
            'image_url': '/placeholder.svg?height=200&width=300',
            'badges': 'hot,premium',
            'matches': 980,
            'wins': 245,
            'survival_time': '12.8 min',
            'featured': 1
        },
        {
            'title': 'Crown V - Full Collection',
            'level': 68,
            'tier': 'crown',
            'tier_display': 'Crown V',
            'kd_ratio': 3.2,
            'price': 149,
            'image_url': '/placeholder.svg?height=200&width=300',
            'badges': 'verified',
            'matches': 750,
            'wins': 180,
            'survival_time': '11.5 min',
            'featured': 1
        },
        {
            'title': 'Diamond III - Starter Pack',
            'level': 45,
            'tier': 'diamond',
            'tier_display': 'Diamond III',
            'kd_ratio': 2.8,
            'price': 89,
            'image_url': '/placeholder.svg?height=200&width=300',
            'badges': 'verified',
            'matches': 420,
            'wins': 95,
            'survival_time': '9.2 min',
            'featured': 0
        },
        {
            'title': 'Platinum I - Good Stats',
            'level': 38,
            'tier': 'platinum',
            'tier_display': 'Platinum I',
            'kd_ratio': 2.4,
            'price': 59,
            'image_url': '/placeholder.svg?height=200&width=300',
            'badges': 'hot',
            'matches': 320,
            'wins': 68,
            'survival_time': '8.1 min',
            'featured': 0
        },
        {
            'title': 'Ace - Mythic Outfits',
            'level': 78,
            'tier': 'ace',
            'tier_display': 'Ace',
            'kd_ratio': 3.9,
            'price': 249,
            'image_url': '/placeholder.svg?height=200&width=300',
            'badges': 'premium,verified',
            'matches': 1100,
            'wins': 285,
            'survival_time': '14.1 min',
            'featured': 0
        }
    ]
    
    for account in sample_accounts:
        cursor.execute('''
            INSERT INTO accounts (title, level, tier, tier_display, kd_ratio, price, 
                                image_url, badges, matches, wins, survival_time, featured)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            account['title'], account['level'], account['tier'], account['tier_display'],
            account['kd_ratio'], account['price'], account['image_url'], account['badges'],
            account['matches'], account['wins'], account['survival_time'], account['featured']
        ))
    
    conn.commit()
    conn.close()

# Insert sample data
insert_sample_data()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/accounts')
def get_accounts():
    conn = sqlite3.connect('maki_accounts.db')
    cursor = conn.cursor()
    
    # Get query parameters
    tier_filter = request.args.get('tier', 'all')
    price_min = request.args.get('price_min', type=int)
    price_max = request.args.get('price_max', type=int)
    search = request.args.get('search', '')
    featured_only = request.args.get('featured', type=bool)
    
    # Build query
    query = 'SELECT * FROM accounts WHERE sold = 0'
    params = []
    
    if tier_filter != 'all':
        query += ' AND tier = ?'
        params.append(tier_filter)
    
    if price_min is not None:
        query += ' AND price >= ?'
        params.append(price_min)
    
    if price_max is not None:
        query += ' AND price <= ?'
        params.append(price_max)
    
    if search:
        query += ' AND (title LIKE ? OR tier_display LIKE ?)'
        params.extend([f'%{search}%', f'%{search}%'])
    
    if featured_only:
        query += ' AND featured = 1'
    
    query += ' ORDER BY featured DESC, created_at DESC'
    
    cursor.execute(query, params)
    rows = cursor.fetchall()
    
    accounts = []
    for row in rows:
        account = {
            'id': row[0],
            'title': row[1],
            'level': row[2],
            'tier': row[3],
            'tierDisplay': row[4],
            'kd': row[5],
            'price': row[6],
            'image': row[7],
            'badges': row[8].split(',') if row[8] else [],
            'stats': {
                'matches': row[9],
                'wins': row[10],
                'survival': row[11]
            },
            'featured': bool(row[12])
        }
        accounts.append(account)
    
    conn.close()
    return jsonify(accounts)

@app.route('/api/account/<int:account_id>')
def get_account(account_id):
    conn = sqlite3.connect('maki_accounts.db')
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM accounts WHERE id = ? AND sold = 0', (account_id,))
    row = cursor.fetchone()
    
    if not row:
        conn.close()
        return jsonify({'error': 'Account not found'}), 404
    
    account = {
        'id': row[0],
        'title': row[1],
        'level': row[2],
        'tier': row[3],
        'tierDisplay': row[4],
        'kd': row[5],
        'price': row[6],
        'image': row[7],
        'badges': row[8].split(',') if row[8] else [],
        'stats': {
            'matches': row[9],
            'wins': row[10],
            'survival': row[11]
        },
        'featured': bool(row[12])
    }
    
    conn.close()
    return jsonify(account)

@app.route('/api/order', methods=['POST'])
def create_order():
    data = request.get_json()
    
    if not data or not all(key in data for key in ['customer_email', 'customer_name', 'account_ids']):
        return jsonify({'error': 'Missing required fields'}), 400
    
    conn = sqlite3.connect('maki_accounts.db')
    cursor = conn.cursor()
    
    # Verify accounts exist and calculate total
    account_ids = data['account_ids']
    placeholders = ','.join(['?' for _ in account_ids])
    cursor.execute(f'SELECT id, price FROM accounts WHERE id IN ({placeholders}) AND sold = 0', account_ids)
    
    available_accounts = cursor.fetchall()
    if len(available_accounts) != len(account_ids):
        conn.close()
        return jsonify({'error': 'Some accounts are no longer available'}), 400
    
    total_amount = sum(account[1] for account in available_accounts)
    
    # Create order
    cursor.execute('''
        INSERT INTO orders (customer_email, customer_name, account_ids, total_amount)
        VALUES (?, ?, ?, ?)
    ''', (
        data['customer_email'],
        data['customer_name'],
        ','.join(map(str, account_ids)),
        total_amount
    ))
    
    order_id = cursor.lastrowid
    
    # Mark accounts as sold
    cursor.execute(f'UPDATE accounts SET sold = 1 WHERE id IN ({placeholders})', account_ids)
    
    conn.commit()
    conn.close()
    
    return jsonify({
        'order_id': order_id,
        'total_amount': total_amount,
        'status': 'success',
        'message': 'Order created successfully'
    })

@app.route('/api/stats')
def get_stats():
    conn = sqlite3.connect('maki_accounts.db')
    cursor = conn.cursor()
    
    # Get statistics
    cursor.execute('SELECT COUNT(*) FROM orders WHERE status = "completed"')
    completed_orders = cursor.fetchone()[0]
    
    cursor.execute('SELECT COUNT(*) FROM accounts WHERE sold = 0')
    available_accounts = cursor.fetchone()[0]
    
    cursor.execute('SELECT SUM(total_amount) FROM orders WHERE status = "completed"')
    total_revenue = cursor.fetchone()[0] or 0
    
    stats = {
        'happy_customers': completed_orders * 15,  # Multiplier for display
        'secure_trades': 100,  # Percentage
        'premium_accounts': available_accounts,
        'support_hours': '24/7'
    }
    
    conn.close()
    return jsonify(stats)

@app.route('/api/sell', methods=['POST'])
def sell_account():
    data = request.get_json()
    
    required_fields = ['title', 'level', 'tier', 'kd_ratio', 'price', 'matches', 'wins', 'survival_time']
    if not data or not all(key in data for key in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    conn = sqlite3.connect('maki_accounts.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO accounts (title, level, tier, tier_display, kd_ratio, price, 
                            image_url, badges, matches, wins, survival_time, featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        data['title'],
        data['level'],
        data['tier'],
        data.get('tier_display', data['tier'].title()),
        data['kd_ratio'],
        data['price'],
        data.get('image_url', '/placeholder.svg?height=200&width=300'),
        ','.join(data.get('badges', [])),
        data['matches'],
        data['wins'],
        data['survival_time'],
        0  # Not featured by default
    ))
    
    account_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return jsonify({
        'account_id': account_id,
        'status': 'success',
        'message': 'Account listed successfully'
    })

@app.route('/api/search')
def search_accounts():
    query = request.args.get('q', '')
    if not query:
        return jsonify([])
    
    conn = sqlite3.connect('maki_accounts.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT id, title, tier_display, price FROM accounts 
        WHERE sold = 0 AND (title LIKE ? OR tier_display LIKE ?)
        LIMIT 10
    ''', (f'%{query}%', f'%{query}%'))
    
    results = []
    for row in cursor.fetchall():
        results.append({
            'id': row[0],
            'title': row[1],
            'tier': row[2],
            'price': row[3]
        })
    
    conn.close()
    return jsonify(results)

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
