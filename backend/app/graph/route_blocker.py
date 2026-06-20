from copy import deepcopy


def block_route(
    graph,
    nodes
):

    G = deepcopy(graph)

    for i in range(len(nodes)-1):

        u = nodes[i]
        v = nodes[i+1]

        if G.has_edge(u, v):

            for key in G[u][v]:

                G[u][v][key]["length"] *= 1e9

        if G.has_edge(v, u):

            for key in G[v][u]:

                G[v][u][key]["length"] *= 1e9

    return G