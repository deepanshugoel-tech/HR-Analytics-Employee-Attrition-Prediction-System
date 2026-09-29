
import os
import joblib
import pandas as pd
import shap


from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.engine import URL

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ============================================================
# DATABASE CONFIGURATION
# ============================================================

load_dotenv()

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_NAME = os.getenv("DB_NAME", "hr_analytics")

DATABASE_URL = URL.create(
    drivername="mysql+pymysql",
    username=DB_USER,
    password=DB_PASSWORD,
    host=DB_HOST,
    port=int(DB_PORT),
    database=DB_NAME
)

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)

# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(
    title="HR Analytics & Employee Attrition Prediction API",
    description="AI-powered Employee Attrition Prediction System",
    version="1.0.0"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# PATHS
# ============================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "employee_attrition_model.pkl"
)

DATASET_PATH = os.path.join(
    BASE_DIR,
    "..",
    "01_Dataset",
    "IBM -HR-Employee-Attrition.csv"
)


# ============================================================
# LOAD MODEL
# ============================================================

try:
    model = joblib.load(MODEL_PATH)
    MODEL_LOADED = True
    print("Model loaded successfully.")

except Exception as e:
    model = None
    MODEL_LOADED = False
    print("Model loading failed:", str(e))


# ============================================================
# LOAD DATASET
# ============================================================

try:
    df = pd.read_csv(DATASET_PATH)
    DATASET_LOADED = True
    print("Dataset loaded successfully.")
    print("Dataset shape:", df.shape)

except Exception as e:
    df = pd.DataFrame()
    DATASET_LOADED = False
    print("Dataset loading failed:", str(e))


# ============================================================
# PYDANTIC MODEL
# ============================================================

class EmployeeData(BaseModel):
    Age: int
    MonthlyIncome: float
    YearsAtCompany: int
    JobSatisfaction: int
    OverTime: str
    JobLevel: int


# ============================================================
# CREATE MODEL INPUT
# ============================================================

def create_employee_data(employee):

    return {
        "Age": employee.Age,
        "BusinessTravel": "Travel_Rarely",
        "DailyRate": 800,
        "Department": "Research & Development",
        "DistanceFromHome": 5,
        "Education": 3,
        "EducationField": "Life Sciences",
        "EmployeeCount": 1,
        "EmployeeNumber": 9999,
        "EnvironmentSatisfaction": 3,
        "Gender": "Male",
        "HourlyRate": 65,
        "JobInvolvement": 3,
        "JobLevel": employee.JobLevel,
        "JobRole": "Research Scientist",
        "JobSatisfaction": employee.JobSatisfaction,
        "MaritalStatus": "Single",
        "MonthlyIncome": employee.MonthlyIncome,
        "MonthlyRate": 14000,
        "NumCompaniesWorked": 2,
        "Over18": "Y",
        "OverTime": employee.OverTime,
        "PercentSalaryHike": 15,
        "PerformanceRating": 3,
        "RelationshipSatisfaction": 3,
        "StandardHours": 80,
        "StockOptionLevel": 0,
        "TotalWorkingYears": max(
            employee.YearsAtCompany + 2,
            employee.YearsAtCompany
        ),
        "TrainingTimesLastYear": 3,
        "WorkLifeBalance": 3,
        "YearsAtCompany": employee.YearsAtCompany,
        "YearsInCurrentRole": min(
            employee.YearsAtCompany,
            5
        ),
        "YearsSinceLastPromotion": min(
            employee.YearsAtCompany,
            3
        ),
        "YearsWithCurrManager": min(
            employee.YearsAtCompany,
            5
        )
    }


# ============================================================
# PREPARE MODEL INPUT
# ============================================================

def prepare_model_input(input_df):

    # Convert categorical variables into numerical columns
    input_df = pd.get_dummies(
        input_df,
        drop_first=True
    )

    # Match exactly with model training features
    if hasattr(model, "feature_names_in_"):

        input_df = input_df.reindex(
            columns=model.feature_names_in_,
            fill_value=0
        )

    return input_df


# ============================================================
# ROOT
# ============================================================

@app.get("/")
def root():

    return {
        "message": "Welcome to HR Analytics & Employee Attrition Prediction API",
        "backend": "running",
        "model_loaded": MODEL_LOADED,
        "dataset_loaded": DATASET_LOADED
    }


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health_check():

    return {
        "status": "healthy",
        "model_loaded": MODEL_LOADED,
        "dataset_loaded": DATASET_LOADED
    }

    # ============================================================
# DATABASE CONNECTION TEST
# ============================================================

@app.get("/db-test")
def database_test():

    try:

        with engine.connect() as connection:

            result = connection.execute(
                text("SELECT DATABASE()")
            )

            database_name = result.scalar()

        return {
            "success": True,
            "database_connected": True,
            "database": database_name,
            "message": "MySQL database connection successful."
        }

    except Exception as e:

        print(
            "Database Connection Error:",
            str(e)
        )

        return {
            "success": False,
            "database_connected": False,
            "error": str(e),
            "message": "MySQL database connection failed."
        }


# ============================================================
# DASHBOARD SUMMARY
# ============================================================

@app.get("/dashboard-summary")
def dashboard_summary():

    if df.empty:

        return {
            "success": False,
            "error": "Dataset not loaded"
        }

    total_employees = len(df)

    employees_left = int(
        (df["Attrition"] == "Yes").sum()
    )

    employees_stayed = int(
        (df["Attrition"] == "No").sum()
    )

    attrition_rate = round(
        (employees_left / total_employees) * 100,
        2
    )

    average_income = round(
        float(df["MonthlyIncome"].mean()),
        2
    )

    # Department-wise attrition
    department_attrition = (
        df.groupby("Department")["Attrition"]
        .apply(
            lambda x: int((x == "Yes").sum())
        )
        .to_dict()
    )

    # Attrition distribution
    attrition_distribution = (
        df["Attrition"]
        .value_counts()
        .to_dict()
    )

    # Job role distribution
    job_role_distribution = (
        df["JobRole"]
        .value_counts()
        .to_dict()
    )

    # Gender distribution
    gender_distribution = (
        df["Gender"]
        .value_counts()
        .to_dict()
    )

    # Age groups
    age_groups = pd.cut(
        df["Age"],
        bins=[0, 25, 35, 45, 55, 100],
        labels=[
            "18-25",
            "26-35",
            "36-45",
            "46-55",
            "56+"
        ]
    )

    age_distribution = (
        age_groups
        .value_counts()
        .sort_index()
        .to_dict()
    )

    # Job satisfaction
    satisfaction_distribution = (
        df["JobSatisfaction"]
        .value_counts()
        .sort_index()
        .to_dict()
    )

    # Overtime attrition
    overtime_attrition = (
        df.groupby("OverTime")["Attrition"]
        .apply(
            lambda x: int((x == "Yes").sum())
        )
        .to_dict()
    )

    # Overtime distribution
    overtime_distribution = (
        df["OverTime"]
        .value_counts()
        .to_dict()
    )

    return {

        "success": True,

        "total_employees": total_employees,

        "employees_left": employees_left,

        "employees_stayed": employees_stayed,

        "attrition_rate": attrition_rate,

        "average_monthly_income": average_income,

        "department_attrition": department_attrition,

        "attrition_distribution": attrition_distribution,

        "job_role_distribution": job_role_distribution,

        "gender_distribution": gender_distribution,

        "age_distribution": age_distribution,

        "satisfaction_distribution": satisfaction_distribution,

        "overtime_attrition": overtime_attrition,

        "overtime_distribution": overtime_distribution
    }


# ============================================================
# HIGH-RISK EMPLOYEES
# ============================================================

@app.get("/high-risk-employees")
def get_high_risk_employees():

    try:

        if df.empty:

            return {
                "success": False,
                "total_high_risk": 0,
                "employees": [],
                "error": "Dataset not loaded"
            }

        # ----------------------------------------------------
        # STEP 1: Remove target column
        # ----------------------------------------------------

        model_data = df.drop(
            columns=["Attrition"],
            errors="ignore"
        ).copy()

        # ----------------------------------------------------
        # STEP 2: Prepare model input
        # ----------------------------------------------------

        model_input = prepare_model_input(
            model_data
        )

        # ----------------------------------------------------
        # STEP 3: Predictions
        # ----------------------------------------------------

        predictions = model.predict(
            model_input
        )

        probabilities = model.predict_proba(
            model_input
        )

        # ----------------------------------------------------
        # STEP 4: Find Attrition = Yes probability
        # ----------------------------------------------------

        classes = list(model.classes_)

        if 1 in classes:

            yes_index = classes.index(1)

        elif "Yes" in classes:

            yes_index = classes.index("Yes")

        else:

            yes_index = 1

        # ----------------------------------------------------
        # STEP 5: Build high-risk employees
        # ----------------------------------------------------

        high_risk_employees = []

        for index, (_, row) in enumerate(
            df.iterrows()
        ):

            prediction = predictions[index]

            risk_percentage = round(
                float(
                    probabilities[index][yes_index]
                ) * 100,
                2
            )

            # Risk level

            if risk_percentage < 35:

                risk_level = "Low"

            elif risk_percentage < 65:

                risk_level = "Medium"

            else:

                risk_level = "High"

            # Only high-risk employees

            if risk_level == "High":

                high_risk_employees.append({

                    "employee_number": int(
                        row["EmployeeNumber"]
                    ),

                    "age": int(
                        row["Age"]
                    ),

                    "monthly_income": float(
                        row["MonthlyIncome"]
                    ),

                    "overtime": str(
                        row["OverTime"]
                    ),

                    "risk_percentage": risk_percentage,

                    "risk_level": risk_level,

                    "prediction": (
                        "Yes"
                        if prediction == 1
                        else "No"
                    )

                })

        # ----------------------------------------------------
        # STEP 6: Highest risk first
        # ----------------------------------------------------

        high_risk_employees.sort(
            key=lambda x: x["risk_percentage"],
            reverse=True
        )

        # ----------------------------------------------------
        # STEP 7: Response
        # ----------------------------------------------------

        return {

            "success": True,

            "total_high_risk": len(
                high_risk_employees
            ),

            "employees": high_risk_employees

        }

    except Exception as e:

        print(
            "High Risk Error:",
            str(e)
        )

        return {

            "success": False,

            "total_high_risk": 0,

            "employees": [],

            "error": str(e)

        }
# ============================================================
# EMPLOYEE SEARCH
# ============================================================

@app.get("/employees/search")
def search_employees(
    department: str = "",
    job_role: str = "",
    gender: str = "",
    overtime: str = "",
    attrition: str = ""
):

    try:

        if df.empty:

            return {
                "success": False,
                "total": 0,
                "employees": [],
                "error": "Dataset not loaded"
            }

        filtered_df = df.copy()

        # Department
        if department and department.lower() != "all":

            filtered_df = filtered_df[
                filtered_df["Department"]
                .astype(str)
                .str.lower()
                == department.lower()
            ]

        # Job Role
        if job_role and job_role.lower() != "all":

            filtered_df = filtered_df[
                filtered_df["JobRole"]
                .astype(str)
                .str.lower()
                == job_role.lower()
            ]

        # Gender
        if gender and gender.lower() != "all":

            filtered_df = filtered_df[
                filtered_df["Gender"]
                .astype(str)
                .str.lower()
                == gender.lower()
            ]

        # Overtime
        if overtime and overtime.lower() != "all":

            filtered_df = filtered_df[
                filtered_df["OverTime"]
                .astype(str)
                .str.lower()
                == overtime.lower()
            ]

        # Attrition
        if attrition and attrition.lower() != "all":

            filtered_df = filtered_df[
                filtered_df["Attrition"]
                .astype(str)
                .str.lower()
                == attrition.lower()
            ]

        # Create response
        employees = []

        for _, row in filtered_df.iterrows():

            employees.append({

                "employee_number": int(
                    row["EmployeeNumber"]
                ),

                "age": int(
                    row["Age"]
                ),

                "department": str(
                    row["Department"]
                ),

                "job_role": str(
                    row["JobRole"]
                ),

                "gender": str(
                    row["Gender"]
                ),

                "overtime": str(
                    row["OverTime"]
                ),

                "monthly_income": int(
                    row["MonthlyIncome"]
                ),

                "attrition": str(
                    row["Attrition"]
                )
            })

        return {

            "success": True,

            "total": len(employees),

            "employees": employees
        }

    except Exception as e:

        print(
            "Employee Search Error:",
            str(e)
        )

        return {

            "success": False,

            "total": 0,

            "employees": [],

            "error": str(e)
        }


# ============================================================
# EMPLOYEE ATTRITION PREDICTION
# ============================================================
@app.post("/predict")
def predict_employee(employee: EmployeeData):

    try:

        # Create employee input
        employee_dict = create_employee_data(employee)

        input_df = pd.DataFrame([employee_dict])

        # Prepare model input
        model_input = prepare_model_input(input_df)

        # Prediction
        prediction = model.predict(model_input)[0]

        # Probability
        probabilities = model.predict_proba(model_input)[0]

        # ---------------------------------------------
        # IMPORTANT:
        # Find probability of Attrition = Yes
        # using model.classes_
        # ---------------------------------------------

        classes = list(model.classes_)

        if 1 in classes:
            yes_index = classes.index(1)
        elif "Yes" in classes:
            yes_index = classes.index("Yes")
        else:
            yes_index = 1

        risk_percentage = round(
            float(probabilities[yes_index]) * 100,
            2
        )

        # ---------------------------------------------
        # Prediction result
        # ---------------------------------------------

        if prediction == 1 or str(prediction).lower() == "yes":
            prediction_result = "Yes"
        else:
            prediction_result = "No"

        # ---------------------------------------------
        # Risk level
        # ---------------------------------------------

        if risk_percentage < 35:
            risk_level = "Low"

        elif risk_percentage < 65:
            risk_level = "Medium"

        else:
            risk_level = "High"

        # ---------------------------------------------
        # Message
        # ---------------------------------------------

        if prediction_result == "Yes":

            message = (
                "Employee is predicted to leave."
            )

        else:

            message = (
                "Employee is predicted to stay."
            )

        return {

            "success": True,

            "prediction": prediction_result,

            "risk_percentage": risk_percentage,

            "risk_level": risk_level,

            "message": message

        }

    except Exception as e:

        print(
            "Prediction Error:",
            str(e)
        )

        return {

            "success": False,

            "error": str(e)

        }


# ============================================================
# SHAP EXPLANATION
# ============================================================

@app.post("/explain")
def explain_employee(employee: EmployeeData):

    try:

        # Create input
        employee_dict = create_employee_data(
            employee
        )

        input_df = pd.DataFrame(
            [employee_dict]
        )

        # Prepare model input
        model_input = prepare_model_input(
            input_df
        )


        # SHAP Tree Explainer
        explainer = shap.TreeExplainer(
            model
        )

        shap_values = explainer.shap_values(
            model_input
        )


        # Handle SHAP output format
        if isinstance(shap_values, list):

            values = shap_values[1][0]

        else:

            values = shap_values[0]

            if len(values.shape) > 1:

                values = values[:, 1][0]


        # Create feature importance table
        feature_names = model_input.columns

        explanation = []

        for feature, value in zip(
            feature_names,
            values
        ):

            explanation.append({

                "feature": feature,

                "impact": round(
                    float(value),
                    4
                )
            })


        # Sort by absolute impact
        explanation.sort(
            key=lambda x: abs(
                x["impact"]
            ),
            reverse=True
        )


        return {

            "success": True,

            "explanation": explanation[:10]
        }


    except Exception as e:

        print(
            "SHAP Error:",
            str(e)
        )

        return {

            "success": False,

            "error": str(e)
        }
