import numpy as np
from sklearn.cluster import DBSCAN

from app.simulation.live_analytics import live_events


def get_hotspots():

    if len(live_events) < 5:
        return []

    coords = np.array([
        [e["latitude"], e["longitude"]]
        for e in live_events
    ])

    clustering = DBSCAN(
        eps=0.01,
        min_samples=3
    ).fit(coords)

    labels = clustering.labels_

    clusters = {}

    for label, event in zip(labels, live_events):

        if label == -1:
            continue

        if label not in clusters:

            clusters[label] = {
                "cluster": int(label),
                "incidents": 0,
                "risk_score": 0,
                "latitudes": [],
                "longitudes": []
            }

        clusters[label]["incidents"] += 1

        clusters[label]["risk_score"] += event["severity_score"]

        clusters[label]["latitudes"].append(
            event["latitude"]
        )

        clusters[label]["longitudes"].append(
            event["longitude"]
        )

    result = []

    for c in clusters.values():

        result.append({
            "cluster": c["cluster"],
            "incidents": c["incidents"],
            "risk_score": c["risk_score"],
            "center_lat":
                sum(c["latitudes"])/len(c["latitudes"]),
            "center_lon":
                sum(c["longitudes"])/len(c["longitudes"])
        })

    return sorted(
        result,
        key=lambda x: x["risk_score"],
        reverse=True
    )