# Epic 3: AI Coaching with Context

**Goal:** Deliver <800ms AI coaching that prevents regret by catching wasted effort before it happens. CRITICAL conversion moment - makes or breaks retention.

**User Value:** Objective sounding board that references user goals and adapts tone to persona (anxiety-framing for founders, hope-framing for students). Regret prevention over productivity optimization.

**FRs Covered:** FR19-37 (goals + coaching), FR38-42 (nudges), FR49, FR54 (persona detection), FR72-73 (fallback/reliability)

**Journey Mapping Insight:** This is the aha moment. If latency >800ms or tone judgmental, user disables coaching permanently.

---

## Story 3.1: Goals API - Capture & Storage

**As a** user,
**I want** to capture my top goals once,
**So that** AI coaching has context about what matters to me.

**Acceptance Criteria:**

**Given** authenticated user
**When** POST /api/goals with {whatMatters, biggestWin, worstOutcome}
**Then** goals created in database with userId, timestamps

**And** single goals record per user (upsert on re-submission)
**And** response time <50ms (P95)

**Given** authenticated user
**When** GET /api/goals
**Then** user's goals returned (or null if never set)

**Given** authenticated user
**When** PATCH /api/goals to update
**Then** goals updated, updatedAt refreshed

**Prerequisites:** Story 1.5 (auth middleware), Story 1.2 (database schema)

**Technical Notes:**
- FR19-23 (goal management)
- Schema: goals table per data-architecture.md
- Upsert pattern: one goals record per user
- Goals optional (can skip entirely per FR20)
- Validation: each field max 500 chars
- Tests: CRUD operations, upsert behavior

---

## Story 3.2: Goals Capture UI - Conversational Flow

**As a** new user,
**I want** quick, conversational goal capture,
**So that** I provide coaching context without tedious forms.

**Acceptance Criteria:**

**Given** user completes first task (or after 5 tasks added)
**When** goal invitation triggered
**Then** modal displays: "Help me understand what matters to you" (dismissible, not forced)

**And** 3 conversational prompts displayed:
1. "What matters most to you right now?" (whatMatters)
2. "What would be your biggest win in the next 3-6 months?" (biggestWin)
3. "What outcome would you most want to avoid?" (worstOutcome)

**And** text areas for each (not intimidating essay boxes)
**And** placeholder examples based on detected context:
- Desktop user: business examples ("raise funding", "ship MVP", "avoid runway burn")
- Mobile user: student/career examples ("land internship", "build portfolio", "avoid wasted effort")

**And** "Skip for now" always visible (FR20)
**And** "Save & Continue" submits to POST /api/goals

**Given** user skips goal capture
**When** clicks "Skip for now"
**Then** modal closes, flag set (don't re-prompt for 7 days)

**And** coaching still works (generic fallback without goal context)

**Given** user saved goals previously
**When** navigates to settings → goals
**Then** can view and edit goals anytime (FR21-22)

**Prerequisites:** Story 3.1 (goals API), Story 2.7 (milestone trigger exists)

**Technical Notes:**
- FR19-23 (goal capture, optional, editable)
- Trigger: after completing first task OR after 5 tasks added (FR38)
- Conversational prompts: non-judgmental, encouraging
- Character count hints (e.g., "30-60 seconds to answer")
- Mobile: bottom sheet instead of modal
- Tests: goal capture flow, skip behavior, edit existing goals

---

## Story 3.3: Persona Detection - Context Signals

**As a** system,
**I want** to detect user persona passively,
**So that** coaching adapts tone without forcing user to self-identify.

**Acceptance Criteria:**

**Given** user using application
**When** user interacts over time
**Then** persona signals collected in users.persona_signals (JSONB):

**And** device type tracked: desktop vs mobile (primary usage pattern)
**And** task complexity tracked: word count, business terms, technical jargon
**And** time-of-day usage tracked: business hours vs evenings/weekends
**And** goal language analyzed: "customers", "revenue", "funding" vs "grades", "internship", "portfolio"

**Given** sufficient signals collected (5+ tasks + goals)
**When** coaching request made
**Then** persona inferred: "founder" or "student" or "general"

**And** confidence score calculated (0.0-1.0)
**And** fallback to "general" if confidence <0.6

**Prerequisites:** Story 3.2 (goals captured), Story 2.1 (tasks exist)

**Technical Notes:**
- FR49, FR54 (persona detection, no explicit selection)
- Passive collection: no user-visible persona picker
- Signals stored in persona_signals JSONB field
- Simple heuristics for MVP:
  - Desktop + business terms in goals = founder
  - Mobile + "internship"/"grades" in goals = student
  - Otherwise = general
- Future: ML model for better detection
- Tests: signal collection, persona inference, confidence scoring

---

## Story 3.4: LLM Integration - Anthropic SDK Setup

**As a** backend developer,
**I want** Anthropic API integrated,
**So that** coaching requests can be sent to Claude.

**Acceptance Criteria:**

**Given** backend application running
**When** coaching request made
**Then** Anthropic SDK initialized with API key from environment

**And** Claude Sonnet 4.5 model selected (per ADR-005)
**And** streaming enabled for progressive response display
**And** prompt caching configured (90% cost savings per novel-architectural-patterns.md)

**Given** LLM API call made
**When** request sent to Anthropic
**Then** request includes:
- System prompt with persona adaptation instructions
- User goals as context (if available)
- Task text being evaluated
- Max tokens: 150 (2-3 sentences per FR32)
- Temperature: 0.7 (conversational, not robotic)

**And** streaming response chunks received
**And** complete response assembled
**And** latency tracked (for P99 <800ms target)

**Given** API call fails
**When** timeout, 500 error, or rate limit hit
**Then** error logged with details (no PII)

**And** fallback mechanism triggered (Story 3.8)

**Prerequisites:** Story 1.2 (database), Story 3.1 (goals API)

**Technical Notes:**
- @anthropic-ai/sdk package
- Environment variable: ANTHROPIC_API_KEY
- Claude Sonnet 4.5: fast, high-quality, cost-effective
- Streaming via Server-Sent Events (SSE)
- Error handling: timeout (5s), retry logic (exponential backoff)
- Cost tracking: log token counts, calculate per interaction
- Tests: API integration, streaming, error handling

---

## Story 3.5: Coaching API - Request & Response

**As a** user,
**I want** to request AI coaching on a task,
**So that** I get objective perspective on whether it's worth doing.

**Acceptance Criteria:**

**Given** authenticated user
**When** POST /api/coaching with {taskId, taskText}
**Then** coaching response generated

**And** user goals loaded from database (if exist)
**And** persona detected from signals (Story 3.3)
**And** LLM prompt constructed with context
**And** streaming response returned via SSE
**And** events: {type: "thinking"}, {type: "token", data: {text}}, {type: "complete", data: {response, latency, cached}}
**And** P99 latency <800ms (CRITICAL per NFR-P1, FR27)

**Given** coaching request for task
**When** generating response
**Then** prompt includes:
- Persona-specific tone: anxiety-framing (founder) vs hope-framing (student)
- User goals as context: "User's goals: [whatMatters, biggestWin, worstOutcome]"
- Task text: "User wants to: [taskText]"
- Instructions: "2-3 sentences, conversational, non-judgmental, ask Socratic questions"

**Given** coaching completes
**When** response generated
**Then** coaching_interactions record created:
- userId, taskId, questionHash (SHA-256 of taskText), response, latency, tokenCount, cost, cacheHit

**And** user.coachingCount incremented
**And** freemium limit checked (Story 5.x)

**Prerequisites:** Story 3.4 (LLM integration), Story 3.3 (persona detection), Story 3.1 (goals API)

**Technical Notes:**
- Endpoint per api-contracts.md
- FR25-37 (coaching mechanics)
- FR29-31 (persona-adapted framing)
- Streaming SSE for progressive display
- questionHash enables caching (Story 3.6)
- Cost calculation: input tokens + output tokens × pricing
- Tests: coaching flow, persona adaptation, streaming, metrics

---

## Story 3.6: Multi-Tier Caching - Memory & Database

**As a** system,
**I want** aggressive caching of coaching responses,
**So that** latency <800ms is achievable and API costs controlled.

**Acceptance Criteria:**

**Given** coaching request for task text
**When** questionHash calculated (SHA-256 of normalized taskText)
**Then** check Tier 1 cache (node-cache in-memory):

**And** if hit: return cached response immediately (<1ms)
**And** if miss: check Tier 2 cache (database coaching_cache table)

**Given** Tier 2 cache check
**When** query coaching_cache by questionHash
**Then** if hit: response returned (~5-10ms)

**And** response stored in Tier 1 (memory)
**And** hitCount incremented in Tier 2
**And** if miss: proceed to Tier 3 (LLM API call)

**Given** Tier 3 LLM call
**When** response generated
**Then** response stored in both caches:
- Tier 1 (node-cache): TTL 1 hour, auto-cleanup
- Tier 2 (database): expiresAt 30 days, hitCount = 1

**Given** popular coaching patterns
**When** hitCount >10 for cached response
**Then** expiresAt extended by 30 days (keep frequently used responses)

**Prerequisites:** Story 3.5 (coaching API)

**Technical Notes:**
- Service blueprint insight: 3-tier caching CRITICAL for <800ms
- FR36-37 (pre-generated patterns, caching)
- Tier 1: node-cache (1 hour TTL, 500 entry limit)
- Tier 2: PostgreSQL coaching_cache table
- Tier 3: Anthropic API (fallback)
- questionHash: SHA-256 of lowercased, trimmed taskText (normalization)
- Cache invalidation: manual purge option for admin
- Cost savings: cache hits reduce API calls dramatically
- Tests: cache hit/miss, TTL expiration, multi-tier flow

---

## Story 3.7: Pre-Generated Coaching Patterns

**As a** system,
**I want** pre-generated responses for common task patterns,
**So that** first-time coaching requests are fast and cost-effective.

**Acceptance Criteria:**

**Given** application initialization
**When** backend starts
**Then** seed coaching_cache with common patterns:

**And** ~20-30 common task patterns seeded (e.g., "prepare presentation", "review code", "respond to emails")
**And** responses pre-generated for both personas (founder + student variations)
**And** expiresAt set to 90 days (longer for seeded patterns)

**Given** user submits task matching common pattern
**When** questionHash matches seeded entry
**Then** cached response returned immediately

**And** latency <10ms (Tier 2 cache hit)
**And** cacheHit=true logged

**Prerequisites:** Story 3.6 (caching infrastructure)

**Technical Notes:**
- FR36 (pre-generated patterns)
- Seed script: generate patterns during deployment
- Common patterns identified from competitor analysis, user research
- Both persona variations: anxiety-framing + hope-framing
- Fuzzy matching consideration: exact match only for MVP (future: semantic similarity)
- Tests: seeded cache, pattern matching

---

## Story 3.8: Rule-Based Coaching Fallback

**As a** user,
**I want** coaching to work even when LLM API fails,
**So that** core functionality isn't blocked by external dependency.

**Acceptance Criteria:**

**Given** LLM API unavailable (timeout, error, rate limit)
**When** coaching request fails after retries
**Then** rule-based fallback activated (FR35, FR72)

**And** generic coaching response generated:
- "Consider: Is this aligned with your goals?"
- "Ask yourself: Will this matter in 3 months?"
- "What would happen if you skipped this?"

**And** persona-adapted if signals available:
- Founder: "What's the opportunity cost of spending time on this?"
- Student: "Will this help you 6 months from now?"

**And** response marked as fallback (not logged as LLM interaction)
**And** user sees subtle indicator: "Quick coaching" (not full AI)

**Given** API rate limit hit
**When** 429 error returned
**Then** fallback used gracefully (FR73)

**And** user not blocked from using app
**And** error logged for monitoring

**Prerequisites:** Story 3.5 (coaching API)

**Technical Notes:**
- FR35, FR72-73 (graceful degradation, fallback, rate limits)
- Rule-based templates: 5-10 generic questions
- Persona detection still used (if available)
- No coaching_interactions record created (not LLM interaction)
- User messaging: "Quick coaching" or "Suggested questions"
- Tests: LLM failure scenarios, fallback activation, rate limit handling

---

## Story 3.9: Coaching UI - Request Button & Thinking State

**As a** user,
**I want** to request coaching on a task easily,
**So that** I get perspective before committing effort.

**Acceptance Criteria:**

**Given** user viewing task in list
**When** hovering (desktop) or tapping task (mobile)
**Then** coaching button appears:

**And** icon: lightbulb or thinking face
**And** label: "Get Coaching" or "Ask AI"
**And** accessible: 44×44px tap target (mobile)

**Given** user clicks coaching button
**When** request initiated
**Then** thinking indicator displays (FR40):

**And** animated spinner or pulsing icon
**And** text: "Thinking..." or "Considering..."
**And** displayed immediately (<100ms)
**And** coaching button disabled (prevent duplicate requests)

**Given** coaching response streaming
**When** SSE events received
**Then** thinking indicator updates to show progress

**And** "token" events render progressively (typewriter effect optional)

**Prerequisites:** Story 3.5 (coaching API), Story 2.4 (task list UI)

**Technical Notes:**
- FR25, FR40 (request coaching, thinking indicator)
- Desktop: coaching button on task hover
- Mobile: tap task → action sheet with coaching option
- Thinking indicator: optimistic UI, shows <100ms
- Streaming display: progressive text reveal for engagement
- Tests: button visibility, thinking state, streaming display

---

## Story 3.10: Coaching UI - Response Display & Actions

**As a** user,
**I want** to see coaching response clearly and take action,
**So that** I decide what to do with the task.

**Acceptance Criteria:**

**Given** coaching response received
**When** streaming completes
**Then** coaching card displays:

**And** response text (2-3 sentences, conversational per FR32)
**And** action buttons: "Keep Task", "Revise", "Delete", "Ask More" (FR33)
**And** thumbs up/down feedback buttons (FR34)
**And** latency indicator if >500ms: "Answered in Xms"

**Given** user clicks "Keep Task"
**When** action selected
**Then** coaching card dismisses

**And** task remains unchanged
**And** no further action

**Given** user clicks "Revise"
**When** action selected
**Then** task enters edit mode (Story 2.6)

**And** coaching card remains visible for reference

**Given** user clicks "Delete"
**When** action selected
**Then** task deletion flow triggered (Story 2.8)

**And** coaching card dismisses

**Given** user clicks "Ask More"
**When** follow-up requested
**Then** input field appears for follow-up question

**And** previous response remains visible for context
**And** new coaching request sent with conversation history

**Given** user clicks thumbs up/down
**When** feedback submitted
**Then** coaching_interactions record updated with feedback

**And** icon changes to indicate feedback received
**And** used for future coaching quality improvements

**Prerequisites:** Story 3.9 (coaching UI request), Story 3.5 (coaching API)

**Technical Notes:**
- FR32-34 (tone, actions, feedback)
- Coaching card: modal or inline below task (mobile: bottom sheet)
- Action buttons: clear affordances, color coding
- Follow-up: maintains conversation context (future: multi-turn)
- Feedback: stored for analytics, future model fine-tuning
- Tests: action flows, feedback submission, follow-up requests

---

## Story 3.11: Coaching Example - First-Time User Education

**As a** new user,
**I want** to see coaching example before trying,
**So that** I understand what to expect and reduce uncertainty.

**Acceptance Criteria:**

**Given** user never used coaching before
**When** first coaching button clicked
**Then** example modal displays first (FR39):

**And** title: "Here's how coaching works"
**And** example task shown: "Prepare comprehensive documentation for entire codebase"
**And** example coaching response shown: "Have you validated whether users actually need comprehensive docs? Consider starting with the 20% that covers 80% of questions."
**And** explanation: "AI coaching asks questions to help you focus on what matters"
**And** button: "Try coaching on this task"

**Given** user clicks "Try coaching"
**When** modal dismissed
**Then** actual coaching request proceeds

**And** flag set: user has seen example (don't show again)

**Given** user has used coaching 3+ times
**When** coaching button clicked
**Then** example modal skipped, direct to coaching request

**Prerequisites:** Story 3.9 (coaching UI)

**Technical Notes:**
- FR39 (show example before first use)
- Empathy map insight: uncertainty about AI must be addressed
- Example carefully chosen: shows value without overpromising
- Example demonstrates non-judgmental tone
- Flag stored in user preferences (Zustand or database)
- Tests: first-time flow, example display, flag persistence

---

## Story 3.12: Gentle Coaching Invitation After 5 Tasks

**As a** user who hasn't tried coaching,
**I want** subtle prompts to discover the feature,
**So that** I don't miss the core value proposition.

**Acceptance Criteria:**

**Given** user added 5+ tasks without using coaching
**When** completing task or viewing list
**Then** gentle nudge displays (FR38):

**And** message: "Want to make sure you're working on the right things?"
**And** subtext: "Try AI coaching on one of your tasks"
**And** button: "Show me how"
**And** dismiss option: "Maybe later" (not pushy)

**Given** user clicks "Show me how"
**When** nudge accepted
**Then** coaching example modal displays (Story 3.11)

**And** then prompts to select task for coaching

**Given** user dismisses nudge
**When** "Maybe later" clicked
**Then** nudge hidden for 7 days

**And** can re-trigger if still no coaching usage

**Given** user tries coaching once
**When** coaching used
**Then** nudge never shown again (feature discovered)

**Prerequisites:** Story 3.11 (coaching example), Story 2.5 (task count tracking)

**Technical Notes:**
- FR38, FR42 (detect 5+ tasks, gentle invitation, dismissible)
- Trigger: after 5 tasks added + 0 coaching requests
- Nudge placement: banner at top of task list (non-intrusive)
- Re-prompt logic: 7-day cooldown if dismissed
- Journey mapping insight: prompt at right moment (after baseline trust built)
- Tests: trigger conditions, dismissal, cooldown, feature discovery

---

## Story 3.13: Persona-Adaptive Coaching Prompts

**As a** user,
**I want** coaching tone that resonates with my context,
**So that** advice feels relevant and actionable (not generic).

**Acceptance Criteria:**

**Given** founder persona detected (Story 3.3)
**When** coaching prompt constructed
**Then** anxiety-framing applied (FR30):

**And** opportunity cost language: "What could you accomplish instead with this time?"
**And** runway awareness: "With limited runway, is this the highest-impact use of a week?"
**And** customer focus: "Have you validated this with users?"
**And** business context: "How does this move revenue/fundraising/traction forward?"

**Given** student persona detected
**When** coaching prompt constructed
**Then** hope-framing applied (FR31):

**And** future-value language: "Will this matter for your career in 6 months?"
**And** skill-building focus: "Does this teach you valuable skills?"
**And** FOMO mitigation: "Is this aligned with your long-term goals?"
**And** permission-granting: "It's okay to skip low-value work"

**Given** general persona (insufficient signals)
**When** coaching prompt constructed
**Then** balanced neutral tone:

**And** generic questions: "Is this aligned with your goals?"
**And** Socratic approach: "What would success look like?"

**Prerequisites:** Story 3.3 (persona detection), Story 3.5 (coaching API)

**Technical Notes:**
- FR29-31 (persona adaptation, framing)
- Empathy map insight: Alex = anxiety-driven, Jordan = hope-driven
- Prompt templates: separate system prompts per persona
- A/B testing consideration: measure response quality by persona
- Tests: prompt generation by persona, tone validation

---

**Epic 3 Complete: 13 Stories**

All stories deliver <800ms coaching with context. Aha moment optimized. Persona adaptation, caching, fallback all covered.

---
