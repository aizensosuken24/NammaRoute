# Feature Spec: Route Planning

## Feature Name
Smart Route Planning

## Overview
The core feature of this application. Given a source and destination, the system
computes the most efficient public transport route, considering time, number of
transfers, and real-time delays.

## Goals
- [x] Allow users to input source and destination
- [x] Return one or more route options ranked by efficiency
- [ ] Show real-time delay information per segment

## User Story
As a **commuter**, I want to **enter my start and end location and get the best
public transport route**, so that **I can reach my destination on time without
confusion**.

## Acceptance Criteria
- [ ] User can type a source and destination in free text
- [ ] System returns at least one valid route
- [ ] Each route shows: total duration, number of transfers, transport modes used
- [ ] If no route is found, a clear message is shown
- [ ] Results load within 3 seconds under normal conditions

## Technical Notes
- Use the configured transit API (`BASE_URL` from `.env`)
- Cache results for identical source/destination pairs for 60 seconds
- Handle API timeouts gracefully with a user-friendly error message

## Out of Scope
- Walking-only or cycling routes
- Cross-city or intercity routes
- Booking or ticketing
