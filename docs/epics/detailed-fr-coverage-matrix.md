# Detailed FR Coverage Matrix

| FR # | Description | Epic | Story |
|------|-------------|------|-------|
| FR1 | Create accounts (email/password) | Epic 1 | 1.3 |
| FR2 | Login securely | Epic 1 | 1.3 |
| FR3 | Reset forgotten passwords | Epic 1 | 1.3 |
| FR4 | Session persistence | Epic 1 | 1.3 |
| FR5 | Logout | Epic 1 | 1.3 |
| FR6 | Delete account + data | Epic 5 | 5.4 |
| FR7 | Create tasks (plain text) | Epic 2 | 2.1 |
| FR8 | View all tasks | Epic 2 | 2.1 |
| FR9 | Edit task descriptions | Epic 2 | 2.1 |
| FR10 | Delete tasks | Epic 2 | 2.4 |
| FR11 | Mark tasks complete | Epic 2 | 2.3 |
| FR12 | Unmark completed tasks | Epic 2 | 2.3 |
| FR13 | Visual distinction (active/completed) | Epic 2 | 2.3 |
| FR14 | Works without AI | Epic 2 | 2.1-2.4 |
| FR15 | Optional importance rating | Epic 4 | 4.1 |
| FR16 | Optional confidence rating | Epic 4 | 4.1 |
| FR17 | Visual indicators (metadata) | Epic 4 | 4.1 |
| FR18 | Skip metadata (simple mode) | Epic 4 | 4.1 |
| FR19 | Capture goals (conversational) | Epic 3 | 3.1 |
| FR20 | Skip goal capture | Epic 3 | 3.1 |
| FR21 | Edit/update goals | Epic 3 | 3.1 |
| FR22 | View saved goals | Epic 3 | 3.1 |
| FR23 | Store goals for AI context | Epic 3 | 3.1 |
| FR24 | Enable/disable AI coaching | Epic 3 | 3.7 |
| FR25 | Request coaching on specific tasks | Epic 3 | 3.6 |
| FR26 | Request coaching before creating task | Epic 3 | 3.6 |
| FR27 | <800ms latency (99th percentile) | Epic 3 | 3.3, 3.4, 3.5 |
| FR28 | Coaching references goals | Epic 3 | 3.2 |
| FR29 | Persona-adaptive tone | Epic 3 | 3.2 |
| FR30 | Opportunity cost framing (business) | Epic 3 | 3.2 |
| FR31 | Future-value framing (student) | Epic 3 | 3.2 |
| FR32 | Conversational tone (2-3 sentences) | Epic 3 | 3.2 |
| FR33 | Respond to coaching (actions) | Epic 3 | 3.6 |
| FR34 | Thumbs up/down feedback | Epic 3 | 3.11 |
| FR35 | Rule-based fallback (degradation) | Epic 3 | 3.8 |
| FR36 | Pre-generated patterns (latency) | Epic 3 | 3.5 |
| FR37 | Cache responses (reduce API calls) | Epic 3 | 3.3, 3.4 |
| FR38 | Gentle coaching invitation (5+ tasks) | Epic 3 | 3.9 |
| FR39 | Show example before first use | Epic 3 | 3.9 |
| FR40 | Thinking indicator | Epic 3 | 3.6 |
| FR41 | Celebrate milestones (every 5) | Epic 3 | 3.10 |
| FR42 | Dismissible suggestions | Epic 3 | 3.9, 3.10 |
| FR43 | Quick-add task entry (always visible) | Epic 2 | 2.2 |
| FR44 | Optimistic UI (immediate feedback) | Epic 2 | 2.5 |
| FR45 | Keyboard shortcuts (desktop) | Epic 4 | 4.2 |
| FR46 | Swipe gestures (mobile) | Epic 4 | 4.3 |
| FR47 | Skeleton screens (loading) | Epic 2 | 2.8 |
| FR48 | Responsive layout (mobile/tablet/desktop) | Epic 2 | 2.6 |
| FR49 | Detect usage context | Epic 3 | 3.2 |
| FR50 | Multi-column layout (desktop) | Epic 4 | 4.4 |
| FR51 | Bottom navigation (mobile) | Epic 4 | 4.5 |
| FR52 | Touch-optimized tap targets (44×44px) | Epic 4 | 4.5 |
| FR53 | Emphasize keyboard shortcuts (desktop) | Epic 4 | 4.2 |
| FR54 | Adapt coaching language (implicit) | Epic 3 | 3.2 |
| FR55 | Free tier: unlimited tasks | Epic 5 | 5.1 |
| FR56 | Free tier: 10 coaching/month | Epic 5 | 5.1 |
| FR57 | Paid tier: unlimited coaching | Epic 5 | 5.1 |
| FR58 | Track coaching usage | Epic 5 | 5.1 |
| FR59 | Notify approaching limit | Epic 5 | 5.1 |
| FR60 | Upgrade to paid tier | Epic 5 | 5.2 |
| FR61 | Export all data | Epic 5 | 5.3 |
| FR62 | Opt out of interaction logging | Epic 5 | 5.4 |
| FR63 | Clear privacy policy | Epic 5 | 5.4 |
| FR64 | Delete all data (GDPR) | Epic 5 | 5.4 |
| FR65 | Todo data remains private | Epic 5 | 5.4 |
| FR66 | Landing page (5-second value prop) | Epic 1 | 1.2 |
| FR67 | Demo video (15-second) | Epic 1 | 1.2 |
| FR68 | Share aha moments (social) | Epic 5 | 5.6 |
| FR69 | Open Graph tags | Epic 5 | 5.6 |
| FR70 | Refer friends (viral loop) | Epic 5 | 5.7 |
| FR71 | Baseline functionality without AI | Epic 1 | 1.7 |
| FR72 | Rule-based fallback | Epic 3 | 3.8 |
| FR73 | Handle rate limits gracefully | Epic 3 | 3.8 |
| FR74 | Background sync (non-blocking) | Epic 2 | 2.7 |

**Coverage Summary:**
- ✅ All 74 FRs mapped to specific stories
- ✅ No orphaned requirements
- ✅ No duplicate coverage (intentional)
- ✅ Epic 3 largest (13 stories) - reflects <800ms latency complexity
- ✅ Foundation epic (1) acceptable - greenfield project setup

---
