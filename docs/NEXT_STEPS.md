# Momentum: Next Steps Analysis

## Current state snapshot

Momentum already has a solid prototype loop:

- A live session timer with start/end controls.
- A snowball animation that grows with elapsed time.
- Session persistence and a basic insights calendar/day breakdown.

This is a strong foundation for validating the core interaction quickly.

## Product gaps to close next

### 1) Make "focus" measurable (not just elapsed time)
Right now, the app tracks time only. To support the stated goal (elapsed time **and** focus), introduce at least one focus signal:

- **Manual focus check-ins** every X minutes ("Still focused? yes/no").
- **Distraction events** (user taps a "distracted" button).
- **Session intention + reflection** (goal at start, self-rating at end).

> Start with manual signals first; they are cheap, interpretable, and useful for early-stage product learning.

### 2) Stabilize session lifecycle
A few edge cases are likely in day-to-day usage:

- App closed/reloaded during an active session.
- Accidental double starts.
- Sessions with very short durations (noise).

Recommended:

- Persist `sessionActive` and `startTime` so active sessions recover after refresh.
- Add a minimum duration threshold (e.g., ignore under 10–20 seconds).
- Add an explicit pause/stop model if needed.

### 3) Improve date consistency in insights
The calendar creates day keys from `toISOString()`, while grouping uses local date formatting. This can shift entries around midnight/timezone boundaries.

Recommended:

- Use one shared date-key helper everywhere (local date key), including calendar cells.

### 4) Strengthen visual feedback loop for the snowball
The snowball currently grows and rolls, but users need clearer meaning from growth milestones.

Recommended:

- Define growth stages (e.g., Seed → Pebble → Snowball → Boulder).
- Add milestone labels at time thresholds.
- Tie stage progression to both elapsed time and focus score.

### 5) Prepare data model for future insights
Current session records are minimal. Extend now to avoid future migrations.

Suggested session schema additions:

- `goal` (string)
- `focusScore` (0–100 or 1–5)
- `distractionCount` (number)
- `tags` (e.g., Deep Work, Reading, Writing)

## Prioritized roadmap (early-stage)

### Phase 1 (1–2 weeks): trustworthy core loop

- Recover active session on app reload.
- Standardize date keys and fix calendar/day mapping.
- Add empty states for insights and session list.
- Remove debug logging and dead links/routes.

Success criteria:

- Users can run sessions without losing progress.
- Daily totals are correct across timezone boundaries.

### Phase 2 (2–3 weeks): first focus signal

- Add end-of-session reflection ("How focused were you?").
- Show per-session focus score in day details.
- Add simple daily focus average in insights.

Success criteria:

- You can compare two equal-duration days by quality, not only time.

### Phase 3 (2–4 weeks): motivating progression

- Introduce snowball stages + milestone badges.
- Add streak logic (days with minimum focused time).
- Add lightweight weekly summary card.

Success criteria:

- Users feel progression and can explain why a day was "good."

## Engineering next steps (high-leverage)

1. Add unit tests for helper utilities (`formatTime`, daily grouping, intensity mapping).
2. Add IDs/keys for session list items to avoid rendering issues.
3. Add basic route completeness (remove or implement Settings route).
4. Replace generic README with product-specific setup + vision.

## Suggested north-star metrics for this stage

- Weekly active users running at least 3 sessions.
- Median focused minutes per active day.
- Session completion rate (started vs ended).
- % of sessions with focus reflection completed.

## Immediate action list (next 5 tickets)

1. Persist active-session state and restore timer after reload.
2. Unify date-key generation in calendar and insights views.
3. Add `focusScore` field captured at session end.
4. Show total focused minutes + average focus score per day.
5. Define and render snowball milestone stages.
