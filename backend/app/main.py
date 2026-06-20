from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import asyncio
# Routers
from app.routing.dashboard import router as dashboard_router

app = FastAPI(
    title="EventFlow AI API",
    description="AI-Powered Event-Driven Traffic Management System",
    version="1.0.0"
)
from app.routing.prediction import (
    router as prediction_router
)
from app.routing.anamoly_route import router as anomaly_router
from app.routing.forecast import(
    router as forecast_router
)
from app.routing.hotspot import(
    router as hotspot_router
)
from app.routing.trend import(
    router as trend_router
)

from app.routing.route import router as route_router
from app.routing.simulate import router as simulate_router
from app.websocket.web_socket_route import(
    router as ws_router
)

from app.routing.post_event import(
    router as post_event_router
)

from app.simulation.live_simulator import(
    run_simulator
)

from app.routing.live_insights import(
    router as live_router
)

from app.routing.resource_optimizer import(
    router as resource_router
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health Check
@app.get("/", tags=["Health"])
async def root():
    return {
        "message": "EventFlow AI Backend Running 🚀"
    }


@app.get("/health", tags=["Health"])
async def health():
    return {
        "status": "healthy"
    }


@app.on_event("startup")
async def startup():

    asyncio.create_task(
        run_simulator()
    )


# Dashboard APIs
app.include_router(
    dashboard_router,
    prefix="/dashboard",
    tags=["Dashboard"]
)

app.include_router(
    prediction_router
)

app.include_router(
    anomaly_router
)

app.include_router(
    forecast_router
)

app.include_router(
    hotspot_router
)

app.include_router(
    trend_router
)


app.include_router(
    ws_router
)

app.include_router(
    live_router
)

app.include_router(
    route_router
)

app.include_router(
    post_event_router
)

app.include_router(
    resource_router
)