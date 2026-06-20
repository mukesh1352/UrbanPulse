# route_blocker.py
def get_blocked_edges(graph, route_nodes, affected_nodes_set=None):
    """
    Only deters the portion(s) of the route that actually pass through a
    currently-affected area — not the whole route. If nothing on the route
    is affected, nothing is blocked, and diversion naturally matches primary.
    """
    blocked = set()

    for i in range(len(route_nodes) - 1):
        u, v = route_nodes[i], route_nodes[i + 1]

        if affected_nodes_set is not None and u not in affected_nodes_set and v not in affected_nodes_set:
            continue

        if graph.has_edge(u, v):
            for key in graph[u][v]:
                blocked.add((u, v, key))
        if graph.has_edge(v, u):
            for key in graph[v][u]:
                blocked.add((v, u, key))

    return blocked