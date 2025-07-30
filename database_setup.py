import sqlite3
import json
from datetime import datetime

def setup_database():
    """Set up the database with initial schema and sample data"""
    
    conn = sqlite3.connect('maki_accounts.db')
    cursor = conn.cursor()
    
    # Drop existing tables if they exist
    cursor.execute('DROP TABLE IF EXISTS accounts')
    cursor.execute('DROP TABLE IF EXISTS orders')
    cursor.execute('DROP TABLE IF EXISTS users')
    
    # Create accounts table
    cursor.execute('''
        CREATE TABLE accounts (
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
            seller_id INTEGER,
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Create orders table
    cursor.execute('''
        CREATE TABLE orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_email TEXT NOT NULL,
            customer_name TEXT NOT NULL,
            customer_phone TEXT,
            account_ids TEXT NOT NULL,
            total_amount INTEGER NOT NULL,
            payment_method TEXT DEFAULT 'pending',
            status TEXT DEFAULT 'pending',
            transaction_id TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            completed_at TIMESTAMP
        )
    ''')
    
    # Create users table
    cursor.execute('''
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            full_name TEXT,
            phone TEXT,
            is_seller BOOLEAN DEFAULT 0,
            is_admin BOOLEAN DEFAULT 0,
            reputation_score INTEGER DEFAULT 0,
            total_sales INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_login TIMESTAMP
        )
    ''')
    
    # Insert sample accounts
    sample_accounts = [
        ('Conqueror Account - Season 24', 85, 'conqueror', 'Conqueror', 4.2, 299, 
         '/placeholder.svg?height=200&width=300', 'verified,premium', 1250, 320, '15.2 min', 1, 0, 1,
         'Premium Conqueror account with rare skins and high K/D ratio. Perfect for competitive players.'),
        
        ('Ace Master - Rare Skins', 72, 'ace', 'Ace Master', 3.8, 199,
         '/placeholder.svg?height=200&width=300', 'hot,premium', 980, 245, '12.8 min', 1, 0, 1,
         'Ace Master account featuring exclusive rare skins and solid gameplay statistics.'),
        
        ('Crown V - Full Collection', 68, 'crown', 'Crown V', 3.2, 149,
         '/placeholder.svg?height=200&width=300', 'verified', 750, 180, '11.5 min', 1, 0, 1,
         'Crown tier account with complete skin collection and consistent performance.'),
        
        ('Diamond III - Starter Pack', 45, 'diamond', 'Diamond III', 2.8, 89,
         '/placeholder.svg?height=200&width=300', 'verified', 420, 95, '9.2 min', 0, 0, 1,
         'Great starter account for new players looking to jump into higher tier gameplay.'),
        
        ('Platinum I - Good Stats', 38, 'platinum', 'Platinum I', 2.4, 59,
         '/placeholder.svg?height=200&width=300', 'hot', 320, 68, '8.1 min', 0, 0, 1,
         'Solid Platinum account with good statistics and room for improvement.'),
        
        ('Ace - Mythic Outfits', 78, 'ace', 'Ace', 3.9, 249,
         '/placeholder.svg?height=200&width=300', 'premium,verified', 1100, 285, '14.1 min', 0, 0, 1,
         'Ace tier account featuring mythic outfits and exceptional gameplay performance.'),
        
        ('Crown III - Sniper Specialist', 62, 'crown', 'Crown III', 3.5, 129,
         '/placeholder.svg?height=200&width=300', 'verified', 680, 165, '10.8 min', 0, 0, 1,
         'Crown account specialized in sniper gameplay with excellent long-range statistics.'),
        
        ('Diamond V - Team Player', 51, 'diamond', 'Diamond V', 2.9, 99,
         '/placeholder.svg?height=200&width=300', 'verified', 520, 125, '9.8 min', 0, 0, 1,
         'Diamond account perfect for team-based gameplay with solid support statistics.')
    ]
    
    for account in sample_accounts:
        cursor.execute('''
            INSERT INTO accounts (title, level, tier, tier_display, kd_ratio, price, 
                                image_url, badges, matches, wins, survival_time, featured, 
                                sold, seller_id, description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', account)
    
    # Insert sample admin user
    cursor.execute('''
        INSERT INTO users (username, email, password_hash, full_name, is_seller, is_admin, reputation_score)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', ('admin', 'admin@makiaccounts.com', 'hashed_password_here', 'MAKI Admin', 1, 1, 100))
    
    conn.commit()
    conn.close()
    print("Database setup completed successfully!")

def reset_database():
    """Reset the database to initial state"""
    setup_database()
    print("Database has been reset!")

if __name__ == '__main__':
    setup_database()
