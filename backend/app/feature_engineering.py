"""
Feature engineering for time series forecasting
Creates lag features, rolling statistics, and seasonality features
"""
import pandas as pd
import numpy as np
from typing import Tuple
import logging

from .config import LAGS, ROLLING_WINDOWS

logger = logging.getLogger(__name__)


class FeatureEngineer:
    """Generate features for time series forecasting"""
    
    def __init__(self, lags: list = LAGS, rolling_windows: list = ROLLING_WINDOWS):
        self.lags = lags
        self.rolling_windows = rolling_windows
    
    def create_features(self, df: pd.DataFrame, target_col: str) -> Tuple[pd.DataFrame, pd.Series]:
        """
        Create features for a specific target column
        
        Args:
            df: DataFrame with Month and metric columns
            target_col: Column name to forecast (e.g., 'Type1_Admissions')
        
        Returns:
            Tuple of (features_df, target_series)
        """
        df = df.copy()
        
        # Ensure Month is datetime
        if not pd.api.types.is_datetime64_any_dtype(df['Month']):
            df['Month'] = pd.to_datetime(df['Month'])
        
        # Sort by date
        df = df.sort_values('Month').reset_index(drop=True)
        
        # Target variable
        target = df[target_col].copy()
        
        # Time-based features
        df['time_index'] = np.arange(len(df))
        df['month_num'] = df['Month'].dt.month
        df['quarter'] = df['Month'].dt.quarter
        df['year'] = df['Month'].dt.year
        
        # Cyclical encoding for month (sine/cosine to capture seasonality)
        df['month_sin'] = np.sin(2 * np.pi * df['month_num'] / 12)
        df['month_cos'] = np.cos(2 * np.pi * df['month_num'] / 12)
        
        # Lag features
        for lag in self.lags:
            df[f'{target_col}_lag_{lag}'] = df[target_col].shift(lag)
        
        # Rolling statistics
        for window in self.rolling_windows:
            # Rolling mean
            df[f'{target_col}_rolling_mean_{window}'] = (
                df[target_col].shift(1).rolling(window=window).mean()
            )
            # Rolling std
            df[f'{target_col}_rolling_std_{window}'] = (
                df[target_col].shift(1).rolling(window=window).std()
            )
        
        # Year-over-year change (12-month lag difference)
        df[f'{target_col}_yoy_change'] = df[target_col].diff(12)
        
        # Drop rows with NaN (due to lags and rolling windows)
        # Keep rows where all lag features are available
        max_lookback = max(self.lags + self.rolling_windows + [12])
        df = df.iloc[max_lookback:].reset_index(drop=True)
        target = target.iloc[max_lookback:].reset_index(drop=True)
        
        # Select feature columns (exclude Month and target)
        feature_cols = [col for col in df.columns if col not in ['Month', target_col]]
        X = df[feature_cols]
        
        logger.info(f"Created {len(feature_cols)} features for {target_col}")
        logger.info(f"Available training samples: {len(X)}")
        
        return X, target
    
    def create_prediction_features(
        self, 
        historical_data: pd.DataFrame, 
        target_col: str,
        predictions: list
    ) -> pd.DataFrame:
        """
        Create features for the next prediction step using historical data and predictions
        
        Args:
            historical_data: Past data (includes recent predictions)
            target_col: Target column name
            predictions: List of predicted values so far
        
        Returns:
            pd.DataFrame: Single row of features for next prediction
        """
        # Combine historical data with predictions
        df = historical_data.copy()
        
        # Get the last known month
        last_month = df['Month'].max()
        next_month = last_month + pd.DateOffset(months=1)
        
        # Get the last row to use other metric values
        last_row = df.iloc[-1]
        
        # Create a new row for next month
        next_row = {
            'Month': next_month,
            target_col: None,  # To be predicted
        }
        
        # Include other metric columns (use last known values)
        # These are features that the model was trained with
        # Dynamically get all numeric columns except Month and the target
        metric_cols = [col for col in df.columns 
                      if col not in ['Month', target_col] 
                      and df[col].dtype in ['int64', 'float64']]
        
        for col in metric_cols:
            if col in df.columns and col != target_col:
                next_row[col] = last_row[col]
        
        # Time-based features
        next_row['time_index'] = len(df)
        next_row['month_num'] = next_month.month
        next_row['quarter'] = next_month.quarter
        next_row['year'] = next_month.year
        next_row['month_sin'] = np.sin(2 * np.pi * next_month.month / 12)
        next_row['month_cos'] = np.cos(2 * np.pi * next_month.month / 12)
        
        # Get recent values (historical + predictions)
        recent_values = df[target_col].tolist() + predictions
        
        # Lag features
        for lag in self.lags:
            if len(recent_values) >= lag:
                next_row[f'{target_col}_lag_{lag}'] = recent_values[-lag]
            else:
                next_row[f'{target_col}_lag_{lag}'] = 0  # fallback
        
        # Rolling statistics
        for window in self.rolling_windows:
            if len(recent_values) >= window:
                next_row[f'{target_col}_rolling_mean_{window}'] = np.mean(recent_values[-window:])
                next_row[f'{target_col}_rolling_std_{window}'] = np.std(recent_values[-window:])
            else:
                next_row[f'{target_col}_rolling_mean_{window}'] = np.mean(recent_values)
                next_row[f'{target_col}_rolling_std_{window}'] = 0
        
        # Year-over-year change
        if len(recent_values) >= 12:
            next_row[f'{target_col}_yoy_change'] = recent_values[-1] - recent_values[-12]
        else:
            next_row[f'{target_col}_yoy_change'] = 0
        
        # Convert to DataFrame
        features_df = pd.DataFrame([next_row])
        
        # Select only feature columns (exclude Month and target)
        feature_cols = [col for col in features_df.columns if col not in ['Month', target_col]]
        
        return features_df[feature_cols]


# Singleton instance
_feature_engineer_instance = None


def get_feature_engineer() -> FeatureEngineer:
    """Get or create singleton FeatureEngineer instance"""
    global _feature_engineer_instance
    if _feature_engineer_instance is None:
        _feature_engineer_instance = FeatureEngineer()
    return _feature_engineer_instance
