from app.graph.graph_store import graph
from app.graph.update_weights import update_graph_weights

node = list(graph.keys())[0]

event = {
    "event_cause": "accident",
    "latitude": node[0],
    "longitude": node[1]
}

new_graph = update_graph_weights(
    graph,
    [event]
)

print("Before")

print(
    graph[node]
)

print()

print("After")

print(
    new_graph[node]
)