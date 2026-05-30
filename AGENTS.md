# AGENTS.md

# AI Agents Documentation

## Project

**Hyderabad Smart Public Transport Planner**

## Overview

The project uses multiple logical AI agents to handle different tasks within the system. Each agent is responsible for a specific function that contributes to providing intelligent route recommendations and commuter assistance.

---

## Agent 1: Route Planning Agent

### Responsibility

* Calculate possible routes between source and destination.
* Combine Bus and Metro routes.
* Identify fastest routes.

### Inputs

* Source Location
* Destination Location

### Outputs

* Route Options
* Estimated Travel Time
* Number of Transfers

---

## Agent 2: Fare Calculation Agent

### Responsibility

* Estimate travel cost for each route.
* Compare fares across available routes.

### Inputs

* Selected Route
* Transport Mode

### Outputs

* Estimated Fare
* Cheapest Route Recommendation

---

## Agent 3: Crowd Estimation Agent

### Responsibility

* Estimate crowd levels for buses and metro services.
* Classify routes as Low, Medium, or High congestion.

### Inputs

* Route Information
* Historical Occupancy Data

### Outputs

* Crowd Score
* Congestion Indicator

---

## Agent 4: AI Recommendation Agent

### Responsibility

* Analyze route, fare, and crowd information.
* Generate personalized travel recommendations.

### Inputs

* User Preferences
* Route Data
* Fare Data
* Crowd Data

### Outputs

* Fastest Route
* Cheapest Route
* Least Crowded Route
* Balanced Recommendation

---

## Agent Workflow

User Request
→ Route Planning Agent
→ Fare Calculation Agent
→ Crowd Estimation Agent
→ AI Recommendation Agent
→ Final Route Suggestions

---

## Technologies

* Gemini API
* Python
* Flask/FastAPI
* OpenStreetMap / Google Maps API
* PostgreSQL / SQLite

---

## Future Enhancements

* Real-time traffic prediction
* Live bus tracking
* Voice-based travel assistant
* Smart notifications
* Personalized commuter profiles

---

## Maintainers

* Anirudh R
* C Aneesh
* Peyush Reddy
