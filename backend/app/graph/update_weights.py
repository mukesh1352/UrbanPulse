# update_weights.py
import numpy as np
from scipy.spatial import cKDTree

_SPATIAL_INDEX_CACHE = {}

PENALTIES = {
    "accident": 50,
    "traffic_jam": 20,
    "lane_closed": 15,
    "construction": 10,
    "festival": 5,
    "concert": 5,
    "cricket_match": 5,
}


def get_penalty(event):
    return PENALTIES.get(event["event_cause"], 1)


def _get_spatial_index(graph):
    key = id(graph)
    if key not in _SPATIAL_INDEX_CACHE:
        node_ids = list(graph.nodes)
        lats = np.array([graph.nodes[n]["y"] for n in node_ids])
        lons = np.array([graph.nodes[n]["x"] for n in node_ids])
        mean_lat_rad = np.radians(lats.mean())
        x_m = lons * 111320 * np.cos(mean_lat_rad)
        y_m = lats * 110540
        tree = cKDTree(np.column_stack([x_m, y_m]))
        _SPATIAL_INDEX_CACHE[key] = (node_ids, tree, mean_lat_rad)
    return _SPATIAL_INDEX_CACHE[key]


def get_affected_nodes(graph, events, radius_m=1000):
    node_ids, tree, mean_lat_rad = _get_spatial_index(graph)
    affected = []
    for event in events:
        x_m = event["longitude"] * 111320 * np.cos(mean_lat_rad)
        y_m = event["latitude"] * 110540
        idx = tree.query_ball_point([x_m, y_m], r=radius_m)
        affected.append([node_ids[i] for i in idx])
    return affected


def get_node_penalties(events, affected_nodes, penalty_fn):
    """One penalty per node — resolves overlapping events to their max BEFORE expansion."""
    node_penalty = {}
    for event, nodes in zip(events, affected_nodes):
        penalty = penalty_fn(event)
        for node in nodes:
            node_penalty[node] = max(node_penalty.get(node, 1), penalty)
    return node_penalty


def get_edge_penalties(graph, node_penalty):
    """Read-only, no copy. Each affected node's neighbor-edges are visited exactly once."""
    edge_penalty = {}
    for node, penalty in node_penalty.items():
        for neighbor in graph.neighbors(node):
            for key in graph[node][neighbor]:
                edge_key = (node, neighbor, key)
                edge_penalty[edge_key] = max(edge_penalty.get(edge_key, 1), penalty)
    return edge_penalty