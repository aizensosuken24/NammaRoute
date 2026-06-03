# User Manual — Smart Public Transport Planner

## Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Features](#features)
4. [How to Use](#how-to-use)
5. [Configuration](#configuration)
6. [Troubleshooting](#troubleshooting)
7. [FAQ](#faq)

---

## Overview

Smart Public Transport Planner is a tool designed to help users plan efficient
routes using public transport. It integrates real-time data to suggest optimal
journeys across buses, metro, and other transit modes.

---

## Getting Started

### Prerequisites

- Python 3.10 or higher
- pip (Python package manager)

### Installation

```bash
git clone https://code.swecha.org/Anirudh24/smart-public-transport-planner.git
cd smart-public-transport-planner
pip install -r requirements.txt
```

### Running the Application

```bash
python main.py
```

Or, if using the web interface:

```bash
streamlit run app.py
```

---

## Features

- **Route Planning**: Enter a source and destination to get the best public transport route.
- **Multi-modal Support**: Combines bus, metro, and other transit options.
- **Real-time Data**: Fetches live schedules and delays where available.
- **Trip Summary**: Shows estimated time, number of transfers, and fare.

---

## How to Use

1. **Enter Source**: Type your starting location in the "From" field.
2. **Enter Destination**: Type your destination in the "To" field.
3. **Select Date/Time**: Choose when you plan to travel (defaults to now).
4. **Click "Plan Trip"**: The planner will display the best available routes.
5. **Review Options**: Compare routes by time, transfers, or cost.
6. **Select a Route**: Click on a route to see step-by-step directions.

---

## Configuration

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Key settings in `.env`:

| Variable          | Description                        |
|-------------------|------------------------------------|
| `API_KEY`         | Your transport data API key        |
| `BASE_URL`        | API base URL for transit data      |
| `DEBUG`           | Set to `true` for verbose logging  |

---

## Troubleshooting

**No routes found**
- Ensure your source and destination are valid locations served by public transport.
- Check that your API key in `.env` is valid and active.

**Application won't start**
- Verify all dependencies are installed: `pip install -r requirements.txt`
- Ensure you are using Python 3.10+: `python --version`

**Slow response times**
- This may be due to external API latency. Try again after a few seconds.

---

## FAQ

**Q: Is this free to use?**
A: Yes, the application is open source under the MIT License.

**Q: Which cities are supported?**
A: Support depends on the configured transit data API. See your API provider's documentation.

**Q: Can I contribute new features?**
A: Absolutely! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.
