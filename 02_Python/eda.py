import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# -----------------------------
# Load Dataset
# -----------------------------
base_dir = os.path.dirname(os.path.abspath(__file__))
project_dir = os.path.dirname(base_dir)

csv_path = os.path.join(project_dir, "01_Dataset", "WA_Fn-UseC_-HR-Employee-Attrition.csv")
images_path = os.path.join(project_dir, "06 images")

df = pd.read_csv(csv_path)

sns.set_style("whitegrid")

# -----------------------------
# 1. Employee Attrition Count
# -----------------------------
plt.figure(figsize=(6,4))
sns.countplot(x="Attrition", data=df)
plt.title("Employee Attrition Count")
plt.tight_layout()
plt.savefig(os.path.join(images_path, "01_employee_attrition.png"))
plt.close()

# -----------------------------
# 2. Department-wise Attrition
# -----------------------------
plt.figure(figsize=(8,5))
sns.countplot(x="Department", hue="Attrition", data=df)
plt.title("Department-wise Attrition")
plt.xticks(rotation=15)
plt.tight_layout()
plt.savefig(os.path.join(images_path, "02_department_attrition.png"))
plt.close()

# -----------------------------
# 3. Gender-wise Attrition
# -----------------------------
plt.figure(figsize=(6,4))
sns.countplot(x="Gender", hue="Attrition", data=df)
plt.title("Gender-wise Attrition")
plt.tight_layout()
plt.savefig(os.path.join(images_path, "03_gender_attrition.png"))
plt.close()

# -----------------------------
# 4. Job Role Analysis
# -----------------------------
plt.figure(figsize=(12,6))
sns.countplot(y="JobRole", data=df)
plt.title("Employees by Job Role")
plt.tight_layout()
plt.savefig(os.path.join(images_path, "04_job_role.png"))
plt.close()

# -----------------------------
# 5. Monthly Income Distribution
# -----------------------------
plt.figure(figsize=(8,5))
sns.histplot(df["MonthlyIncome"], bins=20, kde=True)
plt.title("Monthly Income Distribution")
plt.tight_layout()
plt.savefig(os.path.join(images_path, "05_monthly_income.png"))
plt.close()

# -----------------------------
# 6. Age Distribution
# -----------------------------
plt.figure(figsize=(8,5))
sns.histplot(df["Age"], bins=15, kde=True)
plt.title("Age Distribution")
plt.tight_layout()
plt.savefig(os.path.join(images_path, "06_age_distribution.png"))
plt.close()

# -----------------------------
# 7. OverTime vs Attrition
# -----------------------------
plt.figure(figsize=(6,4))
sns.countplot(x="OverTime", hue="Attrition", data=df)
plt.title("OverTime vs Attrition")
plt.tight_layout()
plt.savefig(os.path.join(images_path, "07_overtime_attrition.png"))
plt.close()

# -----------------------------
# 8. Correlation Heatmap
# -----------------------------
plt.figure(figsize=(14,10))
numeric_df = df.select_dtypes(include=["int64", "float64"])
sns.heatmap(numeric_df.corr(), cmap="coolwarm")
plt.title("Correlation Heatmap")
plt.tight_layout()
plt.savefig(os.path.join(images_path, "08_correlation_heatmap.png"))
plt.close()

# -----------------------------
# Attrition Rate
# -----------------------------
attrition_rate = (df[df["Attrition"] == "Yes"].shape[0] / len(df)) * 100

print("="*50)
print("HR Analytics EDA Completed Successfully")
print("="*50)
print(f"Total Employees : {len(df)}")
print(f"Attrition Rate  : {attrition_rate:.2f}%")
print(f"Graphs Saved In : {images_path}")
print("="*50)