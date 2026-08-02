import pandas as pd

# CSV file load
df = pd.read_csv("../01_Dataset/WA_Fn-UseC_-HR-Employee-Attrition.csv")

# First 5 rows
print(df.head())

# Dataset shape
print("\nShape:", df.shape)

# Column names
print("\nColumns:")
print(df.columns.tolist())
print("\nDataset Information:")
print(df.info())

print("\nMissing Values:")
print(df.isnull().sum())

print("\nStatistical Summary:")
print(df.describe())
print("\n==============================")
print("Dataset Information")
print("==============================")

print("Rows :", df.shape[0])
print("Columns :", df.shape[1])

print("\nData Types")
print(df.dtypes)

print("\nDuplicate Rows :", df.duplicated().sum())