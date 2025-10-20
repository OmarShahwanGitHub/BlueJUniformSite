#!/usr/bin/env python3
"""
Simple HTTP server for testing the BlueJay Uniform website locally.
Run this script and open http://localhost:8000 in your browser.
"""

import http.server
import socketserver
import webbrowser
from pathlib import Path

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

if __name__ == '__main__':
    # Change to the script's directory
    script_dir = Path(__file__).parent
    import os
    os.chdir(script_dir)

    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"╔══════════════════════════════════════════════════════════╗")
        print(f"║  BlueJay Uniform - Local Development Server             ║")
        print(f"╚══════════════════════════════════════════════════════════╝")
        print(f"\n  Server running at: http://localhost:{PORT}")
        print(f"  Press Ctrl+C to stop the server\n")
        print(f"  Opening browser...")

        # Open browser
        webbrowser.open(f'http://localhost:{PORT}')

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\nServer stopped.")
