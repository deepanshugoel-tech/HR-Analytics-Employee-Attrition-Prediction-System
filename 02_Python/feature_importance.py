import os
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestClassifier

# Project Path
base_dir = os.path.dirname(os.path.abspath(__file__))
project_dir = os.path.dirname(base_dir)

csv_path = os.path.join(project_dir, "01_Dataset", "WA_Fn-UseC_-HR-Employee-Attrition.csv")

# Load Dataset
df = pd.read_csv(csv_path)

# Target Encoding
df["Attrition"] = df["Attrition"].map({"No": 0, "Yes": 1})

# One-Hot Encoding
X = pd.get_dummies(df.drop("Attrition", axis=1), drop_first=True)
y = df["Attrition"]

# Train Model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# Feature Importance
importance = pd.DataFrame({
    "Feature": X.columns,
    "Importance": model.feature_importances_
})

importance = importance.sort_values(by="Importance", ascending=False).head(10)

print(importance)

# Plot
plt.figure(figsize=(10,6))
plt.barh(importance["Feature"], importance["Importance"])
plt.title("Top 10 Important Features")
plt.xlabel("Importance Score")
plt.gca().invert_yaxis()
plt.tight_layout()

images_path = os.path.join(project_dir, "06 images")
plt.savefig(os.path.join(images_path, "09_feature_importance.png"))

plt.show()