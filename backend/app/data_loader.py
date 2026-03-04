"""
Data loading and preprocessing for NHS A&E dataset
"""
import pandas as pd
import numpy as np
from datetime import datetime
from pathlib import Path
import logging

from .config import DATA_FILE, COLUMN_MAPPING

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class DataLoader:
    """Load and preprocess NHS A&E cleaned.csv data"""
    
    def __init__(self, data_file: Path = DATA_FILE):
        self.data_file = data_file
        self.raw_data = None
        self.aggregated_data = None
        
    def load_and_aggregate(self) -> pd.DataFrame:
        """
        Load CSV, rename columns, aggregate by month to national totals
        
        Returns:
            pd.DataFrame: Aggregated monthly time series with columns:
                - Month (datetime)
                - Wait_12hrs
                - Type1_Admissions
                - Type2_Admissions
                - Other_Admissions
                - Other_Emergency
                - Total_Admissions (derived)
        """
        logger.info(f"Loading data from {self.data_file}")
        
        # Read CSV
        df = pd.read_csv(self.data_file)
        logger.info(f"Loaded {len(df)} rows")
        
        # Parse the Month column (format: M/D/YYYY like "4/1/2018")
        # We'll take just the first day of each month
        df['Month'] = pd.to_datetime(df['Month'], format='%m/%d/%Y', errors='coerce')
        
        # Drop rows with invalid dates
        df = df.dropna(subset=['Month'])
        
        # Keep only the Month column and numeric columns (drop Year and month name)
        numeric_cols = list(COLUMN_MAPPING.keys())
        df = df[['Month'] + numeric_cols]
        
        # Rename columns to shorter names
        df = df.rename(columns=COLUMN_MAPPING)
        
        # Convert to numeric, coerce errors to NaN
        for col in COLUMN_MAPPING.values():
            df[col] = pd.to_numeric(df[col], errors='coerce')
        
        # Fill NaN with 0 (assume missing = no admissions)
        df = df.fillna(0)
        
        logger.info(f"Data date range: {df['Month'].min()} to {df['Month'].max()}")
        
        # Aggregate by month (sum across all organizations)
        agg_dict = {col: 'sum' for col in COLUMN_MAPPING.values()}
        df_agg = df.groupby('Month').agg(agg_dict).reset_index()
        
        # Sort by date
        df_agg = df_agg.sort_values('Month').reset_index(drop=True)
        
        # Create derived column: Total Admissions
        df_agg['Total_Admissions'] = (
            df_agg['Type1_Admissions'] + 
            df_agg['Type2_Admissions'] + 
            df_agg['Other_Admissions'] + 
            df_agg['Other_Emergency']
        )
        
        # Create derived column: Breach Rate (percentage of attendances that breached 4-hour target)
        # Avoid division by zero
        df_agg['Breach_Rate'] = np.where(
            df_agg['Total_Attendances'] > 0,
            (df_agg['Total_Breaches'] / df_agg['Total_Attendances']) * 100,
            0
        )
        
        logger.info(f"Aggregated to {len(df_agg)} monthly records")
        logger.info(f"Sample totals - Type1: {df_agg['Type1_Admissions'].mean():.0f}/month, "
                   f"Total: {df_agg['Total_Admissions'].mean():.0f}/month, "
                   f"Breach Rate: {df_agg['Breach_Rate'].mean():.1f}%")
        
        self.raw_data = df
        self.aggregated_data = df_agg
        
        return df_agg
    
    def get_latest_month_data(self) -> dict:
        """
        Get statistics for the most recent month
        
        Returns:
            dict: Latest month metrics
        """
        if self.aggregated_data is None:
            raise ValueError("Data not loaded. Call load_and_aggregate() first.")
        
        latest_row = self.aggregated_data.iloc[-1]
        previous_row = self.aggregated_data.iloc[-2] if len(self.aggregated_data) > 1 else latest_row
        
        # Calculate month-over-month change
        mom_change = ((latest_row['Type1_Admissions'] - previous_row['Type1_Admissions']) / 
                     previous_row['Type1_Admissions'] * 100)
        
        return {
            'month': latest_row['Month'],
            'type1_admissions': int(latest_row['Type1_Admissions']),
            'total_admissions': int(latest_row['Total_Admissions']),
            'wait_12hrs': int(latest_row['Wait_12hrs']),
            'mom_change': mom_change,
        }
    
    def get_yoy_growth_rate(self) -> float:
        """
        Calculate average year-over-year growth rate
        
        Returns:
            float: Average YoY growth rate as percentage
        """
        if self.aggregated_data is None:
            raise ValueError("Data not loaded. Call load_and_aggregate() first.")
        
        df = self.aggregated_data.copy()
        
        # Calculate YoY change (compare to 12 months ago)
        df['yoy_change'] = df['Type1_Admissions'].pct_change(periods=12) * 100
        
        # Average YoY growth rate (skip first 12 months)
        avg_yoy = df['yoy_change'].iloc[12:].mean()
        
        return avg_yoy if not np.isnan(avg_yoy) else 0.0
    
    def get_total_records_count(self) -> int:
        """Get count of raw data records before aggregation"""
        if self.raw_data is None:
            raise ValueError("Data not loaded. Call load_and_aggregate() first.")
        return len(self.raw_data)


# Singleton instance
_data_loader_instance = None


def get_data_loader() -> DataLoader:
    """Get or create singleton DataLoader instance"""
    global _data_loader_instance
    if _data_loader_instance is None:
        _data_loader_instance = DataLoader()
        _data_loader_instance.load_and_aggregate()
    return _data_loader_instance
