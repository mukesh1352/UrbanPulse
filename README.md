# UrbanPulse 

## AI-Powered Event-Driven Traffic Intelligence Platform

UrbanPulse is an intelligent traffic management platform designed to proactively manage congestion caused by **planned and unplanned events** such as political rallies, festivals, sports events, construction activities, accidents, and sudden gatherings.

By combining historical traffic data, real-time event streams, geospatial analytics, graph-based route optimization, hotspot clustering, and intelligent resource allocation, UrbanPulse enables authorities to transition from reactive traffic management to proactive decision-making.

> **Predict → Visualize → Optimize → Respond → Learn**

---

# 📑 Table of Contents

* [Problem Statement](#-problem-statement)
* [Why UrbanPulse](#-why-urbanpulse)
* [Solution Overview](#-solution-overview)
* [Key Features](#-key-features)
* [How UrbanPulse Works](#-how-urbanpulse-works)
* [End-to-End Workflow](#-end-to-end-workflow)
* [Key Innovations](#-key-innovations)
* [System Architecture](#-system-architecture)
* [Dataset](#-dataset)
* [Technology Stack](#-technology-stack)
* [Why These Technologies?](#-why-these-technologies)
* [Quick Start](#-quick-start)
* [Installation](#-installation)
* [Environment Variables](#-environment-variables)
* [Docker Deployment](#-docker-deployment)
* [Project Structure](#-project-structure)
* [Future Scope](#-future-scope)
* [Contributing](#-contributing)
* [License](#-license)

---

# 🎯 Problem Statement

## Event-Driven Congestion (Planned & Unplanned)

### Operational Challenges

Political rallies, festivals, sports events, construction activities, accidents, and sudden gatherings frequently create localized traffic breakdowns.

### Why It Is Difficult Today

* Event impact is not quantified beforehand.
* Resource deployment is largely experience-driven.
* Diversion planning is reactive.
* Traffic hotspots evolve dynamically.
* No post-event learning mechanism exists.

### Objective

> How can historical and real-time data be used to forecast event-related traffic impact and recommend optimal manpower deployment, barricading strategies, and diversion plans?

---

# 💡 Why UrbanPulse

Traditional traffic management systems are reactive. Congestion is addressed only after it forms, and operational decisions depend heavily on manual experience.

While studying event-driven congestion, we identified several gaps.

## 1. Events Have Predictable Patterns

Planned events such as festivals, rallies, concerts, and sports matches repeatedly affect the same areas.

Similarly, accidents and lane closures create localized disruptions that spread rapidly.

Therefore, UrbanPulse incorporates an **Event Impact Prediction Engine** capable of forecasting congestion before it becomes critical.

---

## 2. Traffic Conditions Change Continuously

Static dashboards provide snapshots rather than live situational awareness.

UrbanPulse uses **WebSockets** to continuously stream incidents and update the control center in real time.

---

## 3. Congestion Is Spatial

Traffic problems are not isolated points.

UrbanPulse uses:

* DBSCAN clustering
* Heatmaps
* Risk scoring

to identify critical congestion zones and prioritize response efforts.

---

## 4. Diversions Should Be Computed, Not Guessed

UrbanPulse models Bengaluru's road network as a graph and uses A* search to generate:

* Primary Routes
* Diversion Routes
* Emergency Corridors

---

## 5. Resource Allocation Should Be Data-Driven

UrbanPulse recommends:

* Police deployment
* Barricade allocation
* Ambulance requirements

and dynamically assigns the nearest traffic police station to minimize response time.

---

## 6. Situational Awareness Is Critical

UrbanPulse integrates:

* Live Events
* Heatmaps
* Hotspot Clusters
* Resource Deployment
* Route Recommendations
* Police Station Assignments

into a unified command center.

---

## 7. Learning From Events Matters

UrbanPulse stores post-event insights to improve future recommendations and create a continuously learning system.

---

# 🚀 Solution Overview

UrbanPulse provides an AI-assisted traffic command platform capable of:

1. Detecting traffic incidents in real time.
2. Forecasting congestion severity.
3. Generating hotspot clusters.
4. Visualizing congestion through heatmaps.
5. Generating alternate routes using graph algorithms.
6. Recommending manpower and barricading requirements.
7. Dynamically assigning nearby traffic police stations.
8. Providing a live command center dashboard.
9. Storing post-event insights for future improvements.

---

# ⭐ Key Features

## Real-Time Event Monitoring

### Planned Events

* Festivals
* Concerts
* Cricket Matches
* Political Rallies
* VIP Movements

### Unplanned Events

* Accidents
* Traffic Jams
* Lane Closures
* Construction Activities
* Road Blockages

---

## Traffic Impact Forecasting

Predicts:

* Impact Score
* Risk Level
* Congestion Severity
* Recommended Response

---

## Heatmap Analytics

Visualizes:

* High-Risk Zones
* Historical Hotspots
* Cluster Density
* Congestion Regions

---

## DBSCAN Hotspot Clustering

Provides:

* Cluster IDs
* Severity Levels
* Risk Scores
* Congestion Zones

---

## Route Optimization Engine

Using NetworkX and A* Search:

* Primary Route
* Diversion Route
* Emergency Corridor

Outputs:

* Distance
* ETA
* Route Geometry

---

## Resource Allocation

Recommends:

* Police Units
* Barricades
* Ambulances

---

## Dynamic Police Station Assignment

Provides:

* Station Name
* Distance from Incident
* Estimated Response Time
* Unit Allocation

---

## Command Response Center

Displays:

* Active Incidents
* Heatmaps
* Risk Scores
* Resource Usage
* Diversion Plans
* Recommended Actions

---

# ⚙️ How UrbanPulse Works

UrbanPulse combines historical data, live event streams, geospatial analytics, graph algorithms, and intelligent resource allocation.

---

## Hotspot Detection

Live events contain:

* Latitude
* Longitude
* Event Type
* Event Cause
* Severity Score
* Timestamp

These are visualized through weighted heatmaps.

---

## Cluster Formation

UrbanPulse uses **DBSCAN** to group nearby incidents.

### Inputs

* Latitude
* Longitude

### Parameters

* ε (distance radius)
* Minimum number of points

### Outputs

```
Cluster 18
Cluster 37
Cluster 42
```

Each cluster represents a congestion zone.

---

## Risk Score Calculation

```
Risk Score =
(Police × 2)
+
(Barricades × 1)
+
(Ambulances × 3)
```

### Congestion Categories

| Score | Congestion |
| ----- | ---------- |
| 0-24  | Low        |
| 25-49 | Moderate   |
| ≥50   | Heavy      |

---

## Police and Barricade Allocation

### Accident

```
Police : 8
Barricades : 6
Ambulances : 2
```

### Traffic Jam

```
Police : 4
Barricades : 3
```

### Lane Closure

```
Police : 2
Barricades : 5
```

### Festival / Concert / Cricket Match

```
Police : 15
Barricades : 20
Ambulances : 3
```

Resources accumulate across cluster events.

---

## Priority Assignment

| Severity Score | Priority |
| -------------- | -------- |
| ≥5             | Critical |
| 4              | High     |
| 3              | Moderate |
| ≤2             | Stable   |

---

## Route Generation

Road network:

* Nodes → Junctions
* Edges → Roads

Using A* Search:

* Primary Route
* Diversion Route
* Emergency Corridor

Outputs:

* Distance
* ETA
* Route Geometry

---

## Nearest Police Station Assignment

UrbanPulse computes geodesic distances between incidents and nearby stations.

Outputs:

* Station Name
* Distance
* ETA
* Units to Deploy

---

## Heatmap Weights

| Event         | Weight |
| ------------- | ------ |
| Accident      | 5      |
| Traffic Jam   | 4      |
| Lane Closure  | 3      |
| Festival      | 2      |
| Concert       | 2      |
| Cricket Match | 2      |
| Others        | 1      |

---

# 🔄 End-to-End Workflow

```text
Historical Dataset
        ↓
Live Event Stream
(WebSocket)
        ↓
DBSCAN Hotspot Clustering
        ↓
Heatmap Generation
        ↓
Risk Score Computation
        ↓
Resource Recommendation
        ↓
Nearest Police Station Assignment
        ↓
A* Route Optimization
        ↓
Command Response Dashboard
        ↓
Post Event Analytics
```

---

# ⭐ Key Innovations

Unlike conventional traffic systems that react after congestion occurs, UrbanPulse:

* Predicts event-driven traffic impact.
* Streams incidents in real time.
* Uses DBSCAN clustering for hotspot detection.
* Generates weighted heatmaps.
* Computes A* diversion routes.
* Dynamically assigns police stations.
* Calculates resource requirements.
* Supports post-event learning.

---

# 🏗 System Architecture

```text
Historical Dataset
        ↓
Event Simulator
        ↓
Live Event Stream
(WebSocket)
        ↓
DBSCAN Clustering
        ↓
Heatmap Engine
        ↓
Risk Score Engine
        ↓
Route Optimization
(A*)
        ↓
Nearest Police Station Assignment
        ↓
Command Dashboard
        ↓
Post Event Analytics
```

---

# 📊 Dataset

UrbanPulse uses Bengaluru traffic datasets containing:

* Historical Events
* Cluster Information
* Planned Events
* Unplanned Incidents

### Event Categories

* Accident
* Traffic Jam
* Lane Closure
* Construction
* Festival
* Concert
* Cricket Match
* Public Gathering

---

# 🛠 Technology Stack

## Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS
* MapLibre GL
* Zustand

## Backend

* FastAPI
* Uvicorn
* WebSockets

## Machine Learning

* CatBoost
* Scikit-Learn

## Graph Processing

* NetworkX
* A* Search

## Geospatial Analytics

* DBSCAN
* Geopy

## Deployment

* Docker
* Docker Compose

---

# ❓ Why These Technologies?

### CatBoost

Efficient for tabular traffic datasets.

### DBSCAN

Naturally detects congestion clusters without requiring predefined cluster counts.

### WebSockets

Enables real-time updates instead of polling.

### NetworkX + A*

Provides dynamic route planning.

### MapLibre

Open-source interactive maps without vendor lock-in.

### Docker

Ensures reproducible deployments.

---

# ⚡ Quick Start

Run the entire platform:

```bash
docker compose up --build
```

| Service      | URL                           |
| ------------ | ----------------------------- |
| Frontend     | http://localhost:3000         |
| Backend      | http://localhost:8000         |
| Swagger Docs | http://localhost:8000/docs    |
| WebSocket    | ws://localhost:8000/ws/events |

---

# 📦 Installation

## Clone Repository

```bash
git clone https://github.com/mukesh1352/UrbanPulse.git

cd UrbanPulse
```

## Backend

```bash
cd backend

uv sync

uv run uvicorn app.main:app --reload
```

Backend:

```
http://localhost:8000
```

Swagger:

```
http://localhost:8000/docs
```

---

## Frontend

```bash
cd frontend

pnpm install

pnpm dev
```

Frontend:

```
http://localhost:3000
```

---

# 🔑 Environment Variables

## Backend (.env)

```env
TOMTOM_API_KEY=YOUR_API_KEY
```

Used to dynamically fetch nearby traffic police stations.

---

## Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000

NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws/events
```

---

# 🐳 Docker Deployment

## Backend

```bash
cd backend

docker build -t urbanpulse-backend .
```

```bash
docker run -p 8000:8000 urbanpulse-backend
```

---

## Frontend

```bash
cd frontend

docker build -t urbanpulse-frontend .
```

```bash
docker run -p 3000:3000 urbanpulse-frontend
```

---

## Full Stack

```bash
docker compose up --build
```

---

# 📁 Project Structure

```text
UrbanPulse/
│
├── frontend/
├── backend/
│     ├── app/
│     ├── models/
│     ├── data/
│     ├── cache/
│     ├── pyproject.toml
│     └── uv.lock
│
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

# 🔮 Future Scope

* Smart Signal Optimization
* GPS Vehicle Tracking
* CCTV Analytics
* Graph Neural Networks
* Digital Twin Traffic Simulation
* Multi-Agent Reinforcement Learning
* Crowd Density Estimation

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit changes.
4. Open a Pull Request.

---

# 📜 License

This project is licensed under the MIT License.
