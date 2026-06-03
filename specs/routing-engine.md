# Routing Engine Spec

## Summary
AI-powered route recommendation between Hyderabad Metro and TSRTC Bus stations.

## Goals
- Provide 4 route options: Fastest, Cheapest, Least Crowded, Eco
- Use official HMRL and TSRTC fare slabs
- Show crowd levels based on time of day

## Non-Goals
- Real-time GPS tracking
- Live bus location

## Implementation Plan
1. Accept source and destination station as input
2. Calculate distance using Haversine formula
3. Compute fares using official slab tables
4. Return 4 route objects with time, fare, crowd, CO2

## Acceptance Criteria
- [ ] Returns 4 route options for any valid station pair
- [ ] Fares match official HMRL/TSRTC slabs
- [ ] Crowd level changes based on peak/off-peak time