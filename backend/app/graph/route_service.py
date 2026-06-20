# route_service.py
from app.graph.graph_store import graph
from app.graph.astar import astar_from_nodes, resolve_node, make_weight_fn
from app.graph.route_blocker import get_blocked_edges
from app.graph.update_weights import (
    get_affected_nodes,
    get_node_penalties,
    get_edge_penalties,
    get_penalty,
)

AVERAGE_SPEED = 30


def find_routes(start, goal, events):

    start_node = resolve_node(start)
    goal_node = resolve_node(goal)

    affected_nodes = get_affected_nodes(graph, events)

    # PRIMARY — congestion-aware
    node_penalty = get_node_penalties(events, affected_nodes, get_penalty)
    congestion_penalty = get_edge_penalties(graph, node_penalty)
    primary = astar_from_nodes(
        graph, start_node, goal_node, weight_fn=make_weight_fn(edge_penalty=congestion_penalty)
    )

    # DIVERSION — only the incident-affected stretch of the primary route is deterred
    blocked_edges = get_blocked_edges(
        graph, primary["nodes"], affected_nodes_set=set(node_penalty)
    )
    diversion = astar_from_nodes(
        graph,
        start_node,
        goal_node,
        weight_fn=make_weight_fn(edge_penalty=congestion_penalty, blocked_edges=blocked_edges),
    )

    # EMERGENCY — every event treated as a mere lane closure
    emergency_node_penalty = get_node_penalties(
        events, affected_nodes, lambda e: get_penalty({**e, "event_cause": "lane_closed"})
    )
    emergency_penalty = get_edge_penalties(graph, emergency_node_penalty)
    emergency = astar_from_nodes(
        graph, start_node, goal_node, weight_fn=make_weight_fn(edge_penalty=emergency_penalty)
    )

    return {
        "primary_route": primary["coords"],
        "diversion_route": diversion["coords"],
        "emergency_route": emergency["coords"],
        "primary_distance": round(primary["distance"], 2),
        "diversion_distance": round(diversion["distance"], 2),
        "emergency_distance": round(emergency["distance"], 2),
        "primary_eta": round(primary["distance"] / AVERAGE_SPEED * 60),
        "diversion_eta": round(diversion["distance"] / AVERAGE_SPEED * 60),
        "emergency_eta": round(emergency["distance"] / AVERAGE_SPEED * 60),
    }