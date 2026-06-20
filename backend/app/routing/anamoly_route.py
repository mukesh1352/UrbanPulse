from fastapi import APIRouter
from pydantic import BaseModel

from app.impact.anamoly_service import (
    get_anomalies,
    detect_anomaly
)

router = APIRouter(
    prefix="/anomalies",
    tags=["Anomaly Detection"]
)


class AnomalyRequest(BaseModel):
    hour: int
    cluster: int
    severity: int


@router.get("/")
async def anomalies():
    return get_anomalies()


@router.post("/detect-anomaly")
async def detect(
    req: AnomalyRequest
):

    anomaly = detect_anomaly(
        req.hour,
        req.cluster,
        req.severity
    )

    return {
        "anomaly": anomaly
    }