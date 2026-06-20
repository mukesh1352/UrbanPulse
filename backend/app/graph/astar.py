# astar.py
import math
from functools import lru_cache

import networkx as nx
import osmnx as ox

from app.graph.graph_store import graph as base_graph


def _haversine_m(y1, x1, y2, x2):
    R = 6371000
    phi1, phi2 = math.radians(y1), math.radians(y2)
    dphi = math.radians(y2 - y1)
    dlambda = math.radians(x2 - x1)
    a = (
        math.sin(dphi / 2) ** 2
        + math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2) ** 2
    )
    return 2 * R * math.asin(math.sqrt(a))


@lru_cache(maxsize=512)
def _nearest_node_cached(lat, lon):
    # resolved against the base graph — safe to reuse on weighted_graph /
    # blocked_graph / emergency_graph too, since .copy() never touches
    # node coordinates, only edge weights
    return ox.distance.nearest_nodes(base_graph, lon, lat)


def resolve_node(coord):
    lat, lon = round(coord[0], 5), round(coord[1], 5)  # ~1m precision
    return _nearest_node_cached(lat, lon)


def astar_from_nodes(
    graph,
    start_node,
    goal_node,
    weight_fn=None
):
    goal_y = graph.nodes[goal_node]["y"]
    goal_x = graph.nodes[goal_node]["x"]

    def heuristic(u, _):
        n = graph.nodes[u]
        return _haversine_m(n["y"], n["x"], goal_y, goal_x)

    route_nodes = nx.astar_path(
    graph,
    start_node,
    goal_node,
    heuristic=heuristic,
    weight=weight_fn or "length"
)

    coords = []
    distance_m = 0.0

    for i, node in enumerate(route_nodes):
        n = graph.nodes[node]
        coords.append((n["y"], n["x"]))

        if i > 0:
            edge_data = graph.get_edge_data(route_nodes[i - 1], node)
            distance_m += min(d.get("length", 0) for d in edge_data.values())

    return {"nodes": route_nodes, "coords": coords, "distance": distance_m / 1000}

def make_weight_fn(edge_penalty=None, blocked_edges=None, block_penalty=1000):
    edge_penalty = edge_penalty or {}
    blocked_edges = blocked_edges or set()

    def weight(u, v, edge_dict):
        best = float("inf")
        for key, attrs in edge_dict.items():
            length = attrs.get("length", 1)
            cost = length * edge_penalty.get((u, v, key), 1)
            if (u, v, key) in blocked_edges:
                cost += block_penalty
            if cost < best:
                best = cost
        return best

    return weight

def astar(graph, start, goal):
    """Coordinate-based entry point, kept for any other caller."""
    start_node = resolve_node(start)
    goal_node = resolve_node(goal)
    return astar_from_nodes(graph, start_node, goal_node)