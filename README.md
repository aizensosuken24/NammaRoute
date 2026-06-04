# 🚇 NammaRoute — Smart Public Transport Planner

> AI-powered transit routing for Hyderabad using real HMRL Metro & TSRTC Bus fares.

[![GitLab CI](https://code.swecha.org/Anirudh24/smart-public-transport-planner/badges/main/pipeline.svg)](https://code.swecha.org/Anirudh24/smart-public-transport-planner/-/pipelines)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📖 Overview

**NammaRoute** is a web-based smart public transport planner designed for Hyderabad commuters. It helps users find the best route between metro stations using real official fares from HMRL Metro and TSRTC Bus services — powered by Claude AI recommendations.

Whether you want the fastest route, the cheapest fare, the least crowded option, or the most eco-friendly journey, NammaRoute has you covered.

---

## ✨ Features

- ⚡ **Fastest Route** — Direct metro with minimum travel time
- ₹ **Cheapest Route** — TSRTC ordinary bus with lowest fare
- 👤 **Least Crowded** — Express bus + metro combo to avoid rush
- 🌿 **Eco Route** — Lowest CO₂ emissions vs auto-rickshaw
- 🤖 **AI Recommendation** — Claude AI gives personalized travel tips
- 🗺️ **Live Map** — Interactive route visualization via OpenStreetMap
- 💳 **Smart Card Support** — 10% discount fares auto-calculated
- 🕐 **Peak Hour Awareness** — Crowd levels adapt to time of day

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, JavaScript (Vanilla) |
| Map | Leaflet.js + OpenStreetMap |
| AI | Claude API (claude-sonnet-4) |
| CI/CD | GitLab CI, Pre-commit Hooks |
| Container | Docker |
| Linting | Ruff, Black, Mypy |

---

## 🚀 Installation

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge)
- An Anthropic API key ([Get one here](https://console.anthropic.com))

### Steps

1. **Clone the repository**
   ```bash
   git clone https://code.swecha.org/Anirudh24/smart-public-transport-planner.git
   cd smart-public-transport-planner
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your Anthropic API key
   ```

3. **Run with Docker (recommended)**
   ```bash
   docker build -t nammaroute .
   docker run -p 8080:80 nammaroute
   ```

4. **Or open directly in browser**
   ```bash
   open index.html
   ```

---

## 📱 Usage

1. Open the app in your browser
2. Select your **Origin** station (e.g., Miyapur)
3. Select your **Destination** station (e.g., LB Nagar)
4. Choose your **preference** — Fastest / Cheapest / Least Crowded / Eco
5. Select **departure time** — Now / Morning Peak / Evening Peak / Off-Peak
6. Click **Find Route**
7. View route options, map, step-by-step directions, and AI recommendation

---

## 🗺️ Supported Stations

The app covers **22 major Hyderabad Metro stations** including:

Lingampally · Miyapur · JNTU · Kukatpally · Ameerpet · HITEC City · Raidurg · Gachibowli · Secunderabad · Uppal · LB Nagar · Dilsukhnagar · Nampally · MGBS · Begumpet · Paradise · and more.

---

## 💰 Fare Reference

### HMRL Metro (Official 2024)
| Distance | Fare |
|----------|------|
| Up to 2 km | ₹10 |
| 2 – 6 km | ₹15 – ₹20 |
| 6 – 12 km | ₹25 – ₹35 |
| Above 21 km | ₹60 (max) |

> Smart card holders get **10% discount**.

### TSRTC Bus (Official 2024)
| Distance | Ordinary | Express |
|----------|----------|---------|
| Up to 3 km | ₹6 | ₹8 |
| 3 – 10 km | ₹8 – ₹10 | ₹10 – ₹12 |
| Above 30 km | ₹25 | ₹30 |

---

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a pull request.

```bash
# Install pre-commit hooks
pip install pre-commit
pre-commit install
```

See [AGENTS.md](AGENTS.md) for AI agent guidelines and [USER_MANUAL.md](USER_MANUAL.md) for detailed usage docs.

---

## 🔒 Security

Please report vulnerabilities responsibly. See [SECURITY.md](SECURITY.md) for our disclosure policy.

---

## 📄 License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

---

---

## 📋 About Project

| Field | Details |
|-------|---------|
| **Team Name** | Trail Blazers |
| **Focus Area** | City Level – Hyderabad |
| **Problem Statement** | Commuters in Hyderabad rely on multiple disconnected apps (Google Maps, TSRTC App, Metro App). Existing solutions fail to combine multi-modal routing, real-time delays, crowd estimation, fare comparisons, and alternative route recommendations. This leads to increased journey planning times, unexpected delays, and overcrowding exposure. |
| **Proposed Solution** | An AI-powered journey planning platform that helps users plan travel combining TSRTC buses and Hyderabad Metro. Users enter source and destination, and the platform surfaces optimized travel choices filtered by four pillars: Fastest, Cheapest, Least Crowded, and Eco-friendly routes. |
| **Existing Solutions** | Google Maps: point-to-point navigation only. TSRTC App: limited to bus schedules. Hyderabad Metro App: isolated metro routes only. |
| **Unique Value Proposition** | 1. Crowd Estimation using historical patterns. 2. Multi-Criteria Routing by budget, speed, or comfort. 3. Bus + Metro Integration for end-to-end connections. 4. AI Travel Assistant powered by Claude API. 5. Dynamic Delay Alerts with live alternatives. |
| **Tech Stack** | HTML, CSS, JavaScript, Claude API, Leaflet.js, OpenStreetMap, GitLab CI, Docker |
| **Live Demo** | https://namma-route-fdxl.vercel.app/ |

---

## 👥 Contributors

| Contributor | Tasks |
|-------------|-------|
| @Anirudh24 | Project setup, routing engine, fare calculation (HMRL Metro + TSRTC Bus slabs), AI integration with Claude API, map visualization with Leaflet.js, UI/UX design, CI/CD pipeline setup, Docker configuration, documentation |