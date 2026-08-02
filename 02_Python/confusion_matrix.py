import os
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import ConfusionMatrixDisplay

# Load Dataset
base_dir = os.path.dirname(os.path.abspath(__file__))
project_dir = os.path.dirname(base_dir)

csv_path = os.path.join(project_dir, "01_Dataset", "WA_Fn-UseC_-HR-Employee-Attrition.csv")

df = pd.read_csv(csv_path)

# Target Encoding
df["Attrition"] = df["Attrition"].map({"No": 0, "Yes": 1})

# One-Hot Encoding
X = pd.get_dummies(df.drop("Attrition", axis=1), drop_first=True)
y = df["Attrition"]

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train Model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Confusion Matrix
ConfusionMatrixDisplay.from_estimator(model, X_test, y_test)

plt.title("Employee Attrition Confusion Matrix")
plt.tight_layout()

images_path = os.path.join(project_dir, "06 images")
plt.savefig(os.path.join(images_path, "10_confusion_matrix.png"))

plt.show()

print("Confusion Matrix Saved Successfully!")