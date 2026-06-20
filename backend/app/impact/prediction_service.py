from pathlib import Path
import joblib
import pandas as pd

BASE_DIR = Path(__file__).resolve().parents[2]

model = joblib.load(
    BASE_DIR/"models"/"priority_model.pkl"
)

encoders = joblib.load(
    BASE_DIR/"models"/"encoders.pkl"
)


def predict_priority(data):

    event_type = encoders["event_type"].transform(
        [data["event_type"]]
    )[0]

    event_cause = encoders["event_cause"].transform(
        [data["event_cause"]]
    )[0]

    row = pd.DataFrame(
        [
            {
                "hour":data["hour"],
                "day_of_week":data["day_of_week"],
                "month":data["month"],
                "weekend":data["weekend"],
                "duration_minutes":data["duration_minutes"],
                "event_type":event_type,
                "event_cause":event_cause,
                "cluster":data["cluster"],
                "severity_score":data["severity_score"],
                "requires_road_closure":data["requires_road_closure"],
                "is_closed":data["is_closed"],
                "is_resolved":data["is_resolved"]
            }
        ]
    )

    pred = model.predict(row)[0]

    label = (
        encoders["priority"]
        .inverse_transform([pred])[0]
    )

    prob = (
        model.predict_proba(row)
        .max()
    )

    return {
        "priority":label,
        "confidence":float(prob)
    }