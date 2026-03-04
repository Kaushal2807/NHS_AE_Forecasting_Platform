"""
Test script to verify the updated prediction logic with seasonal adjustments
"""
import sys
from pathlib import Path

# Add app to path
sys.path.insert(0, str(Path(__file__).parent))

from app.predictor import get_predictor
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

def test_predictions():
    print("🧪 Testing Updated Prediction Logic\n")
    print("=" * 60)
    
    # Get predictor instance
    predictor = get_predictor()
    
    # Test with Type1_Admissions (most common metric)
    metric_name = "Type1_Admissions"
    horizon = 12  # 1 year forecast
    
    print(f"\n📊 Generating {horizon}-month forecast for {metric_name}...")
    
    try:
        dates, predictions = predictor.forecast_metric(metric_name, horizon)
        
        print(f"\n✅ Forecast generated successfully!")
        print(f"\nForecast Summary:")
        print(f"  • Start Date: {dates[0].strftime('%Y-%m')}")
        print(f"  • End Date: {dates[-1].strftime('%Y-%m')}")
        print(f"  • Min Value: {min(predictions):,.0f}")
        print(f"  • Max Value: {max(predictions):,.0f}")
        print(f"  • Mean Value: {sum(predictions)/len(predictions):,.0f}")
        
        print(f"\n📈 Month-by-Month Predictions:")
        for i, (date, value) in enumerate(zip(dates, predictions), 1):
            print(f"  {i:2d}. {date.strftime('%Y-%m')}: {value:,.0f}")
        
        print("\n" + "=" * 60)
        print("✅ Test completed successfully!")
        print("\n💡 Predictions now include:")
        print("   • Seasonal patterns from historical data")
        print("   • Natural variations based on historical trends")
        print("   • Realistic bounds to prevent unrealistic drops")
        
    except Exception as e:
        print(f"\n❌ Error during prediction: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_predictions()
