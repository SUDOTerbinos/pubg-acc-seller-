#!/usr/bin/env python3
"""
MAKI ACCOUNTS - PUBG Account Trading Platform
Run this script to start the Flask development server
"""

import os
import sys
from app import app
from database_setup import setup_database

def main():
    """Main function to run the server"""
    
    # Check if database exists, if not create it
    if not os.path.exists('maki_accounts.db'):
        print("Setting up database for the first time...")
        setup_database()
    
    print("=" * 50)
    print("🎮 MAKI ACCOUNTS - PUBG Trading Platform")
    print("=" * 50)
    print("🚀 Starting Flask development server...")
    print("📱 Frontend: http://localhost:5000")
    print("🔧 API Base: http://localhost:5000/api")
    print("=" * 50)
    print("Available API endpoints:")
    print("  GET  /api/accounts - Get all accounts")
    print("  GET  /api/account/<id> - Get specific account")
    print("  POST /api/order - Create new order")
    print("  POST /api/sell - List account for sale")
    print("  GET  /api/stats - Get platform statistics")
    print("  GET  /api/search?q=<query> - Search accounts")
    print("=" * 50)
    print("Press Ctrl+C to stop the server")
    print("=" * 50)
    
    try:
        # Run the Flask app
        app.run(
            debug=True,
            host='0.0.0.0',
            port=5000,
            use_reloader=True
        )
    except KeyboardInterrupt:
        print("\n👋 Server stopped. Thanks for using MAKI ACCOUNTS!")
        sys.exit(0)
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
