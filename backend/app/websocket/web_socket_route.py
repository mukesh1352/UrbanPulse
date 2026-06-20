# app/websocket/web_socket_route.py

from fastapi import APIRouter, WebSocket
from app.websocket.manager import manager
import asyncio

router = APIRouter()

@router.websocket("/ws/events")
async def websocket_endpoint(websocket: WebSocket):

    await manager.connect(websocket)

    try:
        while True:
            await asyncio.sleep(1)

    except Exception:
        manager.disconnect(websocket)