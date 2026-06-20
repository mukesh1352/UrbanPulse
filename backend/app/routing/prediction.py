from fastapi import APIRouter
from app.impact.prediction_service import predict_priority

router = APIRouter(
    prefix="/predict",
    tags=["Prediction"]
)


@router.post("/")
async def predict(
    data: dict
):

    return predict_priority(data)