from pathlib import Path
import pandas as pd
import joblib

from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    classification_report,
    accuracy_score,
)

from catboost import CatBoostClassifier


# --------------------------------------------------
# Load dataset
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parents[2]

df = pd.read_csv(
    BASE_DIR / "data" / "traffic_events_clustered.csv"
)

print("Dataset shape:", df.shape)


# --------------------------------------------------
# Features and target
# --------------------------------------------------

features = [
    "hour",
    "day_of_week",
    "month",
    "weekend",
    "duration_minutes",
    "event_type",
    "event_cause",
    "cluster",
    "severity_score",
    "requires_road_closure",
    "is_closed",
    "is_resolved",
]

target = "priority"


# --------------------------------------------------
# Prepare X and y
# --------------------------------------------------

X = df[features].copy()
y = df[target].copy()


# --------------------------------------------------
# Missing values
# --------------------------------------------------

for col in X.columns:
    if X[col].dtype == "object" or pd.api.types.is_string_dtype(X[col]):
        X[col] = X[col].fillna("Unknown")
    else:
        X[col] = X[col].fillna(X[col].median())

# --------------------------------------------------
# Label Encoding
# --------------------------------------------------

encoders = {}

categorical_cols = [
    "event_type",
    "event_cause",
]

for col in categorical_cols:

    le = LabelEncoder()

    X[col] = le.fit_transform(
        X[col].astype(str)
    )

    encoders[col] = le


target_encoder = LabelEncoder()

y = target_encoder.fit_transform(
    y.astype(str)
)

encoders["priority"] = target_encoder


# --------------------------------------------------
# Train Test Split
# --------------------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y,
)


# --------------------------------------------------
# CatBoost Model
# --------------------------------------------------

model = CatBoostClassifier(
    iterations=1000,
    depth=8,
    learning_rate=0.03,
    loss_function="MultiClass",
    eval_metric="Accuracy",
    random_seed=42,
    verbose=100,
)


# --------------------------------------------------
# Train
# --------------------------------------------------

model.fit(
    X_train,
    y_train,
)


# --------------------------------------------------
# Evaluate
# --------------------------------------------------

pred = model.predict(X_test)

print("\nAccuracy:")

print(
    accuracy_score(
        y_test,
        pred
    )
)

print("\nClassification Report:\n")

print(
    classification_report(
        y_test,
        pred
    )
)


# --------------------------------------------------
# Save model
# --------------------------------------------------

MODELS_DIR = BASE_DIR / "models"

MODELS_DIR.mkdir(
    exist_ok=True
)

joblib.dump(
    model,
    MODELS_DIR / "priority_model.pkl"
)

joblib.dump(
    encoders,
    MODELS_DIR / "encoders.pkl"
)

print("\nSaved model successfully.")