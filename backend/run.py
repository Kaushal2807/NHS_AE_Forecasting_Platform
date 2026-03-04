"""
Entry point for running the NHS A&E Forecasting API
"""
import uvicorn
import sys
import os
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent))

if __name__ == "__main__":
    # Get port from environment variable (for Render/Docker) or default to 5000
    port = int(os.environ.get("PORT", 5000))
    
    print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", flush=True)
    print("🚀🔥 LATEST DOCKER IMAGE RUNNING - PREDICTION FIX VERSION 4 (NO-DROP SOLUTION) 🔥🚀", flush=True)
    print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", flush=True)
    print("\n")
    print("🏥 Starting NHS A&E Forecasting API...")
    print("📊 Loading data and training models (this may take a moment)...")
    print(f"📡 API will be available at: http://0.0.0.0:{port}")
    print(f"📚 API documentation: http://localhost:{port}/docs")
    print("\n")
    
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=port,
        reload=False,  # Disable reload in production
        log_level="info"
    )
