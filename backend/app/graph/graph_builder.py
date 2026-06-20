import os
import osmnx as ox

GRAPH_FILE = "cache/bangalore.graphml"

def build_graph():

    if os.path.exists(GRAPH_FILE):

        print("Loading cached graph...")
        return ox.load_graphml(GRAPH_FILE)

    print("Downloading graph...")

    G = ox.graph_from_place(
        "Bangalore, Karnataka, India",
        network_type="drive"
    )

    os.makedirs("cache", exist_ok=True)

    ox.save_graphml(
        G,
        GRAPH_FILE
    )

    return G