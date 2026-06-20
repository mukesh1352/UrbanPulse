from fastapi import WebSocket


class ConnectionManager:

    def __init__(self):
        self.connections: list[WebSocket] = []


    async def connect(self, websocket: WebSocket):

        await websocket.accept()

        self.connections.append(websocket)

        print("Clients:", len(self.connections))


    def disconnect(self, websocket: WebSocket):

        if websocket in self.connections:
            self.connections.remove(websocket)

        print("Clients:", len(self.connections))


    async def broadcast(self, data):

        dead_connections = []

        for connection in self.connections:

            try:

                await connection.send_json(data)

            except Exception:

                dead_connections.append(connection)

        for connection in dead_connections:

            self.disconnect(connection)

        print(
            "Broadcasting to",
            len(self.connections)
        )


manager = ConnectionManager()