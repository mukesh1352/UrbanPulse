import networkx as nx
import osmnx as ox


def astar(
    graph,
    start,
    goal
):

    start_node = ox.distance.nearest_nodes(
        graph,
        start[1],
        start[0]
    )

    goal_node = ox.distance.nearest_nodes(
        graph,
        goal[1],
        goal[0]
    )

    route_nodes = nx.astar_path(
        graph,
        start_node,
        goal_node,
        weight="length"
    )

    coords = []

    for node in route_nodes:

        coords.append(
            (
                graph.nodes[node]["y"],
                graph.nodes[node]["x"]
            )
        )

    distance = (
        nx.path_weight(
            graph,
            route_nodes,
            weight="length"
        ) / 1000
    )

    return {
        "nodes": route_nodes,
        "coords": coords,
        "distance": distance
    }