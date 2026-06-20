from app.graph.graph_store import graph

print(
    len(graph)
)

node = list(graph.keys())[0]

print(
    node
)

print(
    graph[node]
)