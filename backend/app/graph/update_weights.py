from copy import deepcopy
import osmnx as ox


def get_penalty(event):

    cause = event["event_cause"]

    penalties = {
        "accident": 50,
        "traffic_jam": 20,
        "lane_closed": 15,
        "construction": 10,
        "festival": 5,
        "concert": 5,
        "cricket_match": 5
    }

    return penalties.get(cause, 1)


def update_graph_weights(graph, events):

    G = deepcopy(graph)

    for event in events:

        center = ox.distance.nearest_nodes(
            G,
            event["longitude"],
            event["latitude"]
        )

        nearby_nodes = [
            n for n in G.nodes
            if ox.distance.great_circle(
                G.nodes[center]["y"],
                G.nodes[center]["x"],
                G.nodes[n]["y"],
                G.nodes[n]["x"]
            ) <= 1000
        ]

        penalty = get_penalty(event)

        for node in nearby_nodes:

            for neighbor in G.neighbors(node):

                for key in G[node][neighbor]:

                    G[node][neighbor][key]["length"] *= penalty

    return G