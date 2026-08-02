import os
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

print("Loading Dataset...")

# -----------------------------
# Load Dataset
# -----------------------------
base_dir = os.path.dirname(os.path.abspath(__file__))
project_dir = os.path.dirname(base_dir)

csv_path = os.path.join(
    project_dir,
    "01_Dataset",
    "WA_Fn-UseC_-HR-Employee-Attrition.csv"
)

df = pd.read_csv(csv_path)

print("Dataset Loaded Successfully!")

# -----------------------------
# Target Encoding
# -----------------------------
df["Attrition"] = df["Attrition"].map({"No": 0, "Yes": 1})

# -----------------------------
# One-Hot Encode Categorical Columns
# -----------------------------
X = df.drop("Attrition", axis=1)

# Saare text columns automatically encode ho jayenge
X = pd.get_dummies(X, drop_first=True)

y = df["Attrition"]

print("Encoding Completed")
print("Dataset Shape After Encoding:", X.shape)

# -----------------------------
# Train Test Split
# -----------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

print("Train Test Split Completed")

# -----------------------------
# Random Forest Model
# -----------------------------
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

print("Training Started...")

model.fit(X_train, y_train)

print("Training Completed")

# -----------------------------
# Prediction
# -----------------------------
y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print("\n==============================")
print(f"Accuracy : {accuracy*100:.2f}%")
print("==============================")

print(classification_report(y_test, y_pred))

# -----------------------------
# Save Model
# -----------------------------
model_path = os.path.join(project_dir, "employee_attrition_model.pkl")
joblib.dump(model, model_path)

print("Model Saved Successfully!")