from app.graph.graph_store import graph
from app.graph.astar import astar
from app.graph.route_blocker import block_route
from app.graph.update_weights import update_graph_weights

AVERAGE_SPEED = 30


def find_routes(start, goal, events):

    weighted_graph = update_graph_weights(
        graph,
        events
    )

    # PRIMARY ROUTE should already be congestion-aware
    primary = astar(
        weighted_graph,
        start,
        goal
    )

    blocked_graph = block_route(
        weighted_graph,
        primary["nodes"]
    )

    diversion = astar(
        blocked_graph,
        start,
        goal
    )

    emergency_graph = update_graph_weights(
        graph,
        [
            {
                **e,
                "event_cause": "lane_closed"
            }
            for e in events
        ]
    )

    emergency = astar(
        emergency_graph,
        start,
        goal
    )

    return {

        "primary_route":
            primary["coords"],

        "diversion_route":
            diversion["coords"],

        "emergency_route":
            emergency["coords"],

        "primary_distance":
            round(primary["distance"], 2),

        "diversion_distance":
            round(diversion["distance"], 2),

        "emergency_distance":
            round(emergency["distance"], 2),

        "primary_eta":
            round(primary["distance"]/AVERAGE_SPEED*60),

        "diversion_eta":
            round(diversion["distance"]/AVERAGE_SPEED*60),

        "emergency_eta":
            round(emergency["distance"]/AVERAGE_SPEED*60)

    }