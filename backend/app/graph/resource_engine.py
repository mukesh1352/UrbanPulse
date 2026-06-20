"""
Useful for calculating:
    1. Number of the police required
    2. Barricades Required
    3. Ambulances Required
    4. Fire Engines Required
    5. If any Diversion is required or not. 
"""

def calculate_resources(event):

    cause = event["event_cause"]
    severity = event["severity_score"]

    police = 1
    barricades = 0
    ambulance = 0
    fire_engine = 0
    diversion = False

    # ACCIDENT
    if cause == "accident":

        police = severity + 1
        barricades = severity
        ambulance = 1

        if severity >= 4:
            fire_engine = 1

        diversion = True

    # TRAFFIC JAM
    elif cause == "traffic_jam":

        police = 2
        barricades = 2

        if severity >= 4:
            diversion = True

    # LANE CLOSURE
    elif cause == "lane_closed":

        police = 2
        barricades = 3
        diversion = True

    # FESTIVAL / CONCERT / MATCH
    elif cause in [
        "festival",
        "concert",
        "cricket_match"
    ]:

        police = 5
        barricades = 4
        diversion = True

    # CONSTRUCTION
    elif cause == "construction":

        police = 2
        barricades = 2

    # ROAD MAINTENANCE
    elif cause == "road_maintenance":

        police = 1
        barricades = 1

    return {

        "police_required": police,

        "barricades_required": barricades,

        "ambulance_required": ambulance,

        "fire_engines_required": fire_engine,

        "diversion_required": diversion

    }