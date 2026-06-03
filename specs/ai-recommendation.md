# AI Recommendation Spec

## Summary
Claude AI provides personalized travel tips based on user preference and route data.

## Goals
- Give friendly 2-3 sentence recommendation
- Mention fare, time, and a Hyderabad-specific tip
- Fall back gracefully if API fails

## Non-Goals
- Replace route engine logic
- Store user history

## Implementation Plan
1. Build prompt with route summary and user preference
2. Call Claude API with route data
3. Display response in AI panel
4. Show fallback message if API call fails

## Acceptance Criteria
- [ ] AI response appears within 5 seconds
- [ ] Fallback message shown if API call fails
- [ ] Response mentions correct fare and travel time