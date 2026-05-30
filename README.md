# Hyderabad Smart Public Transport Planner

An AI-powered multi-modal journey planning platform tailored for Hyderabad commuters. This solution integrates TSRTC buses and Hyderabad Metro services to provide real-time, optimized travel options based on speed, cost, and crowd levels.

---

## 📌 Submission Overview

| Field | Details |
| :--- | :--- |
| **Team Name** |Trail Blazers |
| **Focus Area** | City Level – Hyderabad |
| **Problem Statement** | Commuters in Hyderabad rely on multiple disconnected apps (Google Maps, TSRTC App, Metro App) for transport information. Existing solutions provide standalone route navigation but fail to effectively combine multi-modal routing (Bus + Metro), real-time delays, crowd estimation, fare comparisons, and alternative route recommendations. This gaps leads to increased journey planning times, unexpected delays, and overcrowding exposure. |
| **Proposed Solution** | An AI-powered journey planning platform that helps users seamlessly plan travel combining TSRTC buses and the Hyderabad Metro. Users enter their source and destination, and the platform surfaces optimized travel choices filtered by four core pillars: **Fastest**, **Cheapest**, **Least Crowded**, and **Eco-friendly** routes. |
| **Existing Solutions** | • **Google Maps:** Focuses primarily on point-to-point navigation and general schedules.<br>• **TSRTC Official App:** Limited to bus schedules without real-time synchronization or multi-modal transfers.<br>• **Hyderabad Metro Rail App:** Isolated metro routes and fare calculations only. |
| **Unique Value Prop** | 1. **Crowd Estimation:** Predicts transit crowd levels using historical patterns and simulated occupancy data.<br>2. **Multi-Criteria Routing:** Offers granular routes prioritized by budget, speed, or comfort instead of a single default line.<br>3. **Bus + Metro Integration:** Provides seamless, end-to-end multi-modal connections.<br>4. **AI Travel Assistant:** Powered by the Gemini API to answer natural language queries (e.g., *"I need to reach HITEC City by 9 AM with minimum cost"*).<br>5. **Dynamic Delay Alerts:** Notifies users of sudden disruptions and suggests immediate live alternatives. |
| **Tech Stack** | • **Frontend:** React + Vite + Tailwind CSS<br>• **Backend:** Flask / FastAPI<br>• **Database:** PostgreSQL / MongoDB<br>• **Maps:** OpenStreetMap / Google Maps API<br>• **AI Integration:** Gemini API<br>• **Charts:** Chart.js<br>• **Authentication:** JWT<br>• **Deployment:** Vercel + Render<br>• **Version Control:** GitHub |

---

## 🛠️ System Architecture

```text
       ┌──────────────────────────┐
       │        User Input        │
       │   (Source/Destination)   │
       └────────────┬─────────────┘
                    │
                    ▼
       ┌──────────────────────────┐
       │       Route Engine       │
       └────────────┬─────────────┘
                    │
      ┌─────────────┼─────────────┐
      ▼             ▼             ▼
┌───────────┐ ┌───────────┐ ┌───────────┐
│   Fare    │ │   Crowd   │ │   Delay   │
│Calculator│ │ Estimator │ │ Predictor │
└─────┬─────┘ └─────┬─────┘ └─────┬─────┘
      │             │             │
      └─────────────┼─────────────┘
                    │
                    ▼
       ┌──────────────────────────┐
       │ Gemini AI Recommendation │
       └────────────┬─────────────┘
                    │
                    ▼
       ┌──────────────────────────┐
       │    Route Suggestions     │
       │(Fastest/Cheapest/Comfort)│
       └────────────┬─────────────┘
                    │
                    ▼
       ┌──────────────────────────┐
       │ Interactive Map & Dash  │
       └──────────────────────────┘


       THe link is:  http://127.0.0.1:5500/index.html