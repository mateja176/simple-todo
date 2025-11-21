# simple-todo - Product Requirements Document

**Author:** BMad
**Date:** 2025-11-21
**Version:** 1.0

---

## Executive Summary

**Vision Alignment:**

This is a dual-purpose project. The user-facing product is an AI-coached todo application that prevents regret by helping users focus on tasks aligned with their goals. The strategic purpose is validating BMAD methodology - the most advanced spec-driven AI-assisted development framework - before applying it to high-stakes fintech projects.

**The User Product:** AI coaching that catches users before they waste time on wrong priorities. Works immediately as baseline todo app; AI coaching 100% optional. Target users are overwhelmed founders (Alex) and overwhelmed students (Jordan) suffering from "everything is urgent" paralysis.

**The Real Product:** BMAD methodology validation. Success = proving BMAD's standardized processes accelerate AI-integrated product development + documenting reusable patterns (latency optimization, coaching interaction design, anti-guilt UX). App can "fail" while methodology succeeds (fast pivots, quick hypothesis invalidation, proven patterns).

**Strategic Motivation:** Leverage BMAD's power and validate its standardized processes work in real-world constraints before committing to fintech projects with higher stakes.

**Validation Requirements:** While methodology learnings are primary goal, achieving genuine user adoption is necessary to fully validate BMAD. Shipping features without user traction = incomplete validation (doesn't test BMAD's ability to achieve PMF). Success requires both: (1) faster iteration than traditional approach AND (2) evidence users find value.

**BMAD Validation Metrics (Primary Success Criteria):**
- Iteration velocity: MVP shipped in <6 weeks vs traditional 3-6 months
- Pivot speed: Weekly iteration cycles based on feedback
- Pattern reusability: Latency/caching/coaching patterns documented for fintech transfer
- Documentation quality: Fintech team can replicate approach from artifacts
- Confidence gain: Team trusts BMAD for next high-stakes project

**Documentation Strategy:** Learnings documented publicly as BMAD case study for methodology credibility and future adoption.

**Critical Risk Mitigation:**
- **User Adoption Risk:** Pre-MVP validation mandatory (20 interviews + Wizard of Oz prototype). Track: 2-week retention >30%, coaching try rate >20%, time-to-first-value <45sec.
- **Cold Start Risk:** Quick goal capture (30-60sec), show example interactions, pre-generated coaching patterns for common scenarios.
- **Methodology Validation Risk:** Separate BMAD metrics from product metrics. Weekly retrospectives capture BMAD-specific learnings in real-time. Isolate what's being tested.
- **Latency Risk:** Technical spike validates <800ms achievable before MVP build. Design caching strategy + rule-based fallback.

### What Makes This Special

**User-Facing Differentiator:** Regret prevention over productivity optimization. The AI coach provides objective outside perspective to validate whether tasks align with bigger picture goals - catching wasted effort before months are lost. Unlike traditional todo apps that optimize execution, this prevents wrong work from happening.

**Strategic Differentiator:** Low-stakes learning laboratory for BMAD methodology. Testing AI cost/privacy trade-offs, latency optimization patterns, and spec-driven development velocity in safe environment before high-stakes fintech application.

---

## Project Classification

**Technical Type:** web_app
**Domain:** general
**Complexity:** Domain = low (general productivity, no regulations) | Technical = medium (<800ms AI latency is hard constraint requiring caching, fallback, optimization patterns)

**Project Classification:**

Based on product brief signals (browser-based, responsive design, SPA characteristics, desktop + mobile support), this is classified as a **web application**. The domain is **general productivity** with low complexity - standard web app requirements without regulated industry concerns.

**Detection Rationale:**

- Brief specifies: "web-first," "responsive design," "desktop-optimized (Alex) + mobile-first (Jordan)"
- No specialized domain signals (healthcare, fintech, govtech, etc.)
- Standard CRUD operations + LLM API integration
- General software practices sufficient (no regulatory constraints)

**Product Brief Reference:** docs/product-brief-simple-todo-2025-11-21.md

**Domain Research Documents:** None

**Research Documents:** docs/brainstorming-session-results-2025-11-21.md

---

## Success Criteria

**What Winning Looks Like:**

This project has dual success definitions - methodology validation AND user value delivery.

**Methodology Success (Primary):**
- **Iteration Velocity:** MVP shipped in <6 weeks (vs traditional 3-6 months)
- **Pattern Documentation:** Latency optimization, caching strategies, coaching interaction patterns documented and reusable for fintech
- **Pivot Capability:** Weekly iteration cycles based on user feedback demonstrate agility
- **Confidence Gain:** Team trusts BMAD for next high-stakes fintech project
- **Public Case Study:** Learnings documented publicly, establishing BMAD credibility

**User Value Success (Validation Requirement):**
- **Adoption Beyond Novelty:** 2-week retention >30% (users keep it past abandonment threshold)
- **AI Coaching Acceptance:** >20% try coaching in first session, >70% complete interaction (not abandoned mid-flow)
- **Time to Value:** <45 seconds from sign-up to first task created (immediate utility)
- **Behavioral Change:** Users report clearer prioritization, evidence of questioning tasks before completion
- **Aha Moments:** Users share stories of AI catching wasted effort ("saved me 3 days on wrong feature")

**Technical Success (Enabler):**
- **Response Latency:** <800ms AI coaching response (99th percentile) - flow not broken
- **Cost Sustainability:** LLM API costs manageable at 100 users × 50 interactions/day
- **Graceful Degradation:** App remains usable when LLM unavailable (rule-based fallback working)
- **No Support Fires:** NOT hearing "how do I disable AI?" or "too slow to use"

**What Failure Looks Like (Learn Fast):**
- Users sign up but don't return after 2 weeks (adoption problem)
- Coaching enabled then immediately disabled (friction problem)
- Time-to-first-value >45 seconds (cold start unsolved)
- Latency >800ms consistently (technical constraint unmet)
- Can't explain why something worked/failed (contaminated learnings)

**Success Hierarchy:**
1. **Must Have:** BMAD validation metrics achieved (iteration speed, documented patterns, confidence gained)
2. **Required for Complete Validation:** User adoption beyond novelty (proves BMAD can achieve PMF, not just ship features)
3. **Nice to Have:** Viral growth, significant revenue (out of scope for learning laboratory)

---

## Product Scope

### MVP - Minimum Viable Product

**Core Philosophy:** Works immediately as excellent baseline todo app. AI coaching 100% optional enhancement, never friction.

**Critical Constraint:** <800ms AI response time (hard requirement - latency kills flow)

**MVP Features:**

1. **Baseline Todo App (Zero AI Dependency)**
   - Create, read, update, delete todos
   - Clean, minimal interface - immediate value
   - Email authentication (simple, no OAuth complexity)
   - Responsive design: desktop-optimized (Alex) + mobile-first (Jordan)
   - Zero mandatory fields, zero forced interactions
   - Works perfectly without ever touching AI

2. **Quick Goal Capture (30-60 seconds, Optional)**
   - Conversational flow capturing top 3 life/work goals
   - Context-aware prompting by persona detection:
     - Alex (founder): "Business goals? (e.g., raise funding, ship MVP, retain customers)"
     - Jordan (student): "What matters? (e.g., good grades, get job, build skills)"
   - Plain language, no complex forms
   - Enables AI to reference user's context in coaching
   - Can skip entirely, enable later
   - Solves cold-start problem without passive learning complexity

3. **AI Coaching (100% Optional, Persona-Adapted)**
   - Toggle enable/disable anytime - no pressure
   - "Try Coach Mode" gentle suggestion, never mandatory
   - Mix directive advice + Socratic questions (test user preference in prototype)
   - **Tone adaptation:**
     - Alex: "Co-founder questioning" ("Let me challenge that assumption")
     - Jordan: "Permission granting" ("It's okay to skip this, here's why")
   - **Framing adaptation:**
     - Alex: Opportunity cost ("This costs 3 days you can't get back")
     - Jordan: Future value ("Will this matter in 5 years?")
   - LLM API integration (OpenAI/Anthropic)
   - Aggressive caching for common patterns
   - Pre-generated coaching questions for typical tasks
   - Rule-based fallback when LLM slow/unavailable

4. **Optional Task Metadata (Never Required)**
   - Importance rating (optional)
   - Confidence rating (optional, clear tooltip explaining)
   - Can complete tasks without any metadata
   - Visual indicators non-intrusive

5. **Journey Optimization & Value Communication**
   - Show real examples on landing (5-second value prop):
     - Alex: "AI caught me spending week on 0-user-wanted feature"
     - Jordan: "AI saved me from all-nighter on low-value assignment"
   - 15-second demo video: discovery → aha moment arc
   - Example AI interaction shown BEFORE first use (reduce uncertainty)
   - Thinking indicator during <800ms response (feels responsive)
   - Post-coaching feedback: "Was this helpful?" (tune approach)
   - Celebrate wins: "You saved [time] on lower-priority work!"
   - Built-in viral loop: "Share this aha moment?"

6. **Smart Nudges (Non-Intrusive)**
   - Detect 5+ tasks added → gentle coaching invitation (not forced)
   - If user hesitates >10sec in first coaching → offer directive option
   - Never nag, never guilt, never mandatory

7. **Freemium Model (Jordan-Essential)**
   - **Free tier:** Unlimited tasks, 10 AI coaching interactions/month
   - **Paid tier:** Unlimited coaching, advanced features
   - Alex likely converts paid, Jordan stays free (both get value)

**MVP Scope Boundaries (What's OUT):**
- Voice/dictation input (V2+)
- Automatic impact quantification (V2+)
- Life goals tracking system beyond one-time capture (V2+)
- Wasted effort scoring (V2+)
- 50% confidence threshold rule (V2+)
- Native mobile apps (web-first, responsive)
- Team collaboration (single-user only)
- Advanced analytics/reporting (basic metrics only)
- Zero-onboarding passive learning (requires behavioral tracking - V2+)

### Growth Features (Post-MVP)

**V2 Enhancements (If MVP Validates Core Hypothesis):**

1. **Advanced Coaching Mechanics**
   - 50% confidence threshold rule (can't complete until confidence raised or importance lowered)
   - Mini-coaching sessions triggered for low-confidence high-importance tasks
   - Deeper Socratic questioning flows

2. **Passive Intelligence (Zero Onboarding)**
   - AI learns user values through usage patterns
   - No explicit goal capture needed
   - Coaching improves over time automatically

3. **Richer Input Methods**
   - Voice/dictation for task capture
   - Natural language parsing ("remind me to call mom tomorrow")

4. **Impact Analysis**
   - Automatic impact quantification with real cost calculations
   - Wasted effort scoring (tasks completed that didn't advance goals)
   - Decision augmentation with AI-provided reasoning

5. **Enhanced Privacy**
   - Private mode for sensitive tasks (AI-inaccessible)
   - Local-first architecture option

6. **Mobile Native**
   - iOS/Android apps (after web validation)

### Vision (Future)

**Transformative Direction (If Market Validates):**

1. **Agentic AI Execution**
   - AI doesn't just coach - performs tasks autonomously
   - Transform from task management to task orchestration
   - Delegate execution to autonomous agents

2. **Team/Organization Features**
   - Multi-user collaboration
   - Shared goal alignment
   - Team decision coaching

3. **Platform Expansion**
   - API for third-party integrations
   - Browser extensions
   - Calendar/email integration

4. **Advanced Analytics**
   - Life goals progress tracking
   - Bigger picture alignment dashboard
   - Long-term impact analysis

**Strategic Pivot Options (If Core Hypothesis Fails):**
- B2B team decision-making coaching
- Fintech decision coaching directly
- Methodology consulting (sell BMAD, use app as demo)
- AI tooling for low-latency coaching integration

---


---

## Innovation & Novel Patterns

**Core Innovation: Regret Prevention Over Productivity Optimization**

Traditional todo apps optimize execution (task completion speed, organization efficiency). This product prevents wrong work from happening - catching wasted effort before months are lost.

**What Makes This Novel:**

1. **AI as Objective Co-Thinker (Not Task Manager)**
   - Existing: AI organizes tasks, suggests times, predicts durations
   - Novel: AI questions whether tasks are worth doing at all
   - Challenge: Does external questioning actually change behavior? Must validate with Wizard of Oz prototype.

2. **Anti-Guilt Design Philosophy**
   - Existing: Productivity apps add features (tags, filters, reminders) increasing cognitive load
   - Novel: Reduce features, reduce pressure, reduce guilt - clarity over completionism
   - Challenge: Can "less" compete in market trained to expect "more features = better"?

3. **Optional AI with Immediate Baseline Value**
   - Existing: AI products require engagement with AI to get value
   - Novel: Works perfectly without AI, coaching is pure enhancement
   - Challenge: If baseline is excellent, why add AI complexity? Must prove coaching creates aha moments.

4. **Context-Aware Tone Adaptation (Persona-Specific)**
   - Existing: One-size-fits-all productivity advice
   - Novel: "Co-founder questioning" (Alex) vs "Permission granting" (Jordan) - same logic, different framing
   - Challenge: Can detect persona from usage patterns? Requires testing.

5. **Aggressive Latency Optimization for AI Coaching**
   - Existing: AI tools tolerate 2-5 second responses
   - Novel: <800ms hard requirement with caching + pre-generation + rule-based fallback
   - Challenge: Unproven. Technical spike required to validate achievability.

**Innovation Signals from Product Brief:**
- "Nothing like this exists" - AI coaching for priorities, not organization
- "Rethinking how productivity works" - prevention vs optimization
- "Novel approach" - Socratic questioning for task validation
- "No one has done" - Sub-second AI coaching with graceful degradation

### Validation Approach

**Pre-MVP Validation (MANDATORY - 2 weeks):**

1. **User Interviews (20 total: 10 Alex, 10 Jordan)**
   - Do they want AI coaching for priorities vs organization?
   - Socratic questioning vs directive suggestions - which resonates?
   - "Objective co-founder" (Alex) vs "permission to say no" (Jordan) - test language
   - Will they invest 30-60 seconds for goal capture when overwhelmed?
   - What's minimum aha moment frequency to justify continued usage?

2. **Wizard of Oz Prototype (5 users each persona)**
   - Manual AI coaching (human plays AI role)
   - Test tone, question style, response speed expectations
   - **Critical measure:** Does coaching help or add friction?
   - Document patterns for pre-generation

3. **Technical Spike (<800ms latency)**
   - Validate AI response <800ms with caching strategy
   - Test rule-based fallback quality
   - Measure cost per interaction at scale (100 users × 50/day)

**Kill Criteria (Stop Before Building):**
- <60% positive on AI coaching concept in interviews
- Wizard of Oz testing shows coaching adds friction
- Cannot achieve <800ms in technical spike
- Cost modeling shows unsustainable economics

**MVP Testing (4 weeks):**
- Deploy to 20-50 early users
- Track: time-to-first-value, coaching try rate, completion rate, 2-week retention
- Weekly retrospectives: What's working? What transfers to fintech?

**Pivot Triggers:**
- Time-to-first-value >45 seconds after 2 weeks optimization
- Coaching try rate <20% after 1 month
- Retention <30% at 2 weeks despite iterations

---

## Web App Specific Requirements

**Browser Compatibility:**
- Modern browsers: Chrome, Firefox, Safari, Edge (latest 2 versions)
- Progressive enhancement approach (core functionality works everywhere, AI coaching requires modern JS)
- Responsive breakpoints: Mobile (<768px), Tablet (768-1024px), Desktop (>1024px)

**Performance Targets:**
- Time to Interactive (TTI): <3 seconds on 3G connection
- First Contentful Paint (FCP): <1.5 seconds
- AI coaching response: <800ms (99th percentile) - critical requirement
- Task CRUD operations: <100ms perceived latency

**Responsive Design Requirements:**
- **Mobile-first (Jordan):**
  - Touch-optimized tap targets (44×44px minimum)
  - Swipe gestures for task actions
  - Single-column layout
  - Bottom navigation for thumbs
  - Minimize typing (quick buttons, autocomplete)
- **Desktop-optimized (Alex):**
  - Keyboard shortcuts (Cmd+N new task, Cmd+K search, etc.)
  - Multi-column layout when space allows
  - Hover states for discoverability
  - Quick add always visible

**SEO Strategy (Acquisition Critical):**
- Server-side rendering (SSR) or static generation for landing/marketing pages
- Semantic HTML for content pages
- Open Graph tags for social sharing (viral loop support)
- Structured data for rich results
- Target keywords: "AI todo app," "regret prevention," "decision coaching," "overwhelmed founder productivity"

**Accessibility Requirements:**
- WCAG 2.1 Level AA compliance minimum
- Keyboard navigation for all features
- Screen reader support (ARIA labels)
- Color contrast ratios meet standards
- Focus indicators visible
- No information conveyed by color alone

**Web-Specific User Flows:**
- **Cold Start (New User):**
  1. Land on marketing page (5-sec value prop)
  2. Sign up with email (no friction)
  3. Add first task <45 seconds
  4. See coaching invitation (optional)
  5. Try coaching or continue baseline use

- **Returning User:**
  1. Login (session maintained)
  2. See task list immediately
  3. Quick add new task
  4. Optionally trigger coaching on specific task

**API Architecture (Internal):**
- RESTful endpoints for CRUD operations
- WebSocket or SSE for real-time AI coaching responses (reduce latency)
- Caching layer for pre-generated coaching patterns
- Rate limiting per user (prevent abuse)

**Authentication & Authorization:**
- Email/password authentication (simple MVP)
- JWT tokens for session management
- Secure password storage (bcrypt/argon2)
- Password reset via email
- No OAuth/social login in MVP (reduces complexity)
- Single-user accounts (no team features MVP)

**Data Privacy:**
- User todo data private by default
- AI coaching interactions logged for improvement (opt-out available)
- No third-party analytics tracking user content
- Clear privacy policy on data usage
- GDPR-compliant data export (user can download all data)
- Account deletion removes all user data

---

## User Experience Principles

**Design Philosophy: Anti-Guilt, Maximum Clarity**

This isn't another feature-packed productivity app. Design reduces friction, reduces guilt, reduces cognitive load. Clarity over completionism.

**Core UX Principles:**

1. **Immediate Value Without Investment**
   - Works perfectly from first interaction
   - No tutorials, no onboarding screens, no setup wizards
   - Clean interface communicates purpose instantly
   - Add task = see value in <10 seconds

2. **Optional Everything**
   - Never force AI coaching
   - Never require metadata (importance, confidence)
   - Never demand goal capture
   - Every feature is enhancement, nothing is gatekeeper

3. **Anti-Guilt Design**
   - No red badges screaming overdue tasks
   - No nagging notifications
   - No shame language ("You haven't completed..." ❌)
   - Encouraging language ("Ready to tackle something?" ✅)
   - Celebrate progress, don't punish incompletion

4. **Invisible Complexity**
   - AI coaching feels magical but requires zero understanding
   - Caching/fallback invisible to user
   - Technical sophistication hidden behind simple interface
   - Advanced users discover power, casual users get simplicity

5. **Speed as Feature**
   - <800ms AI responses feel instant
   - Optimistic UI updates (task appears immediately, syncs background)
   - Skeleton screens during load (never blank white)
   - Keyboard shortcuts for power users (Alex)
   - Touch gestures for speed (Jordan)

6. **Persona-Adaptive Without Configuration**
   - Detect context from usage (desktop vs mobile, task complexity, response patterns)
   - Adapt tone automatically (co-founder vs permission-granter)
   - Never ask "Are you a founder or student?" - infer and adapt

### Key Interactions

**Creating a Task (Core Flow):**
- **Entry Point:** Always-visible quick add (desktop header, mobile bottom bar)
- **Input:** Plain text field, no required fields
- **Optional:** Click "Coach Me" icon to get AI guidance BEFORE creating
- **Feedback:** Task appears immediately, gentle animation
- **Enhancement:** If 5+ tasks added, soft invitation: "Feeling overwhelmed? Try coaching"

**AI Coaching Interaction (Optional Flow):**
- **Trigger:** User clicks coach icon on task OR uses quick-coach on new task
- **Experience:**
  1. Thinking indicator appears (<300ms)
  2. AI question or advice appears (<800ms total)
  3. User reads, reflects
  4. Options: "Keep task," "Revise task," "Delete task," "Tell me more"
  5. Post-interaction: "Was this helpful? 👍 👎"
- **Tone:** Conversational, non-judgmental, curious
- **Length:** 2-3 sentences max, scannable
- **Exit:** Always easy - close button, or just navigate away

**Goal Capture (One-Time Setup, Optional):**
- **When:** Offered after 3-5 tasks added, or user clicks "Improve coaching"
- **Experience:**
  1. "Want better coaching? Share your top goals (30 sec)"
  2. Conversational prompts: "What matters most right now?"
  3. 3 goal inputs, plain language
  4. Examples shown based on persona detection
  5. "Save" or "Skip for now"
- **Result:** AI references goals in future coaching

**Task Completion:**
- **Action:** Tap/click checkbox or swipe (mobile)
- **Feedback:** Satisfying animation (subtle, not distracting)
- **Celebration:** Every 5 completed: "Nice momentum!" (positive, not guilt)
- **No Penalties:** No tracking of incomplete tasks, no overdue shame

**Persona-Specific Adaptations:**

**Alex (Founder - Desktop):**
- Keyboard shortcuts prominent (Cmd+K command palette)
- Multi-column layout shows more context
- Coaching uses business framing: "opportunity cost," "customer impact"
- Language: Direct, strategic, "Let me challenge that assumption"
- Quick add always visible at top

**Jordan (Student - Mobile):**
- Bottom navigation for thumb reach
- Swipe gestures for quick actions
- Coaching uses future framing: "Will this matter in 5 years?"
- Language: Supportive, permission-granting, "It's okay to skip this"
- Large tap targets, minimal typing

### Visual Design Direction

**Tone:** Calm, confident, capable - not anxious or overwhelming

**Color Palette:**
- Primary: Calming blues/teals (clarity, trust)
- Accent: Warm amber for coaching moments (curiosity, guidance)
- Background: Soft whites/light grays (breathable space)
- Avoid: Aggressive reds (guilt), neon brightness (stress)

**Typography:**
- Clean sans-serif (Inter, System UI)
- Readable sizes (16px minimum body text)
- Clear hierarchy (task text prominent)

**Space:**
- Generous whitespace (reduce claustrophobia)
- Comfortable line heights
- Breathing room between tasks

**Animation:**
- Subtle, purposeful (feedback, not decoration)
- Fast transitions (120-200ms)
- Smooth, natural easing
- Never blocking or slow

---

## Functional Requirements

**Purpose:** Complete inventory of user-facing and system capabilities that deliver product vision. These FRs define WHAT the product must do (not HOW to implement).

**Coverage:** Every capability from MVP scope, innovation patterns, and web app requirements.

**Organization:** Grouped by capability area, numbered sequentially (FR1, FR2...).

---

### User Account & Authentication

**FR1:** Users can create accounts with email and password
**FR2:** Users can log in securely with email/password credentials
**FR3:** Users can reset forgotten passwords via email verification
**FR4:** Users can remain logged in across sessions (session persistence)
**FR5:** Users can log out of their account
**FR6:** Users can delete their account and all associated data

### Task Management (Baseline Functionality)

**FR7:** Users can create new tasks with plain text descriptions
**FR8:** Users can view all their tasks in a list
**FR9:** Users can edit task descriptions
**FR10:** Users can delete tasks
**FR11:** Users can mark tasks as complete
**FR12:** Users can unmark completed tasks (return to active)
**FR13:** Users can see visual distinction between active and completed tasks
**FR14:** Task operations (create/edit/delete/complete) work without AI coaching enabled

### Optional Task Metadata

**FR15:** Users can optionally assign importance rating to tasks (not required for task creation)
**FR16:** Users can optionally assign confidence rating to tasks (not required for task creation)
**FR17:** Users can view visual indicators of importance/confidence when assigned
**FR18:** Users can skip all metadata and use app as simple todo list

### Goal Management (Optional)

**FR19:** Users can capture their top goals through conversational prompts (optional setup)
**FR20:** Users can skip goal capture entirely and use app without goals
**FR21:** Users can edit or update their goals at any time
**FR22:** Users can view their saved goals
**FR23:** System stores user goals to provide context for AI coaching

### AI Coaching (Optional Enhancement)

**FR24:** Users can enable/disable AI coaching at any time via toggle
**FR25:** Users can request AI coaching on specific tasks
**FR26:** Users can request AI coaching before creating a new task
**FR27:** System provides AI coaching responses in <800ms (99th percentile)
**FR28:** AI coaching references user's goals when providing guidance (if goals captured)
**FR29:** AI coaching adapts tone based on detected persona (founder vs student context)
**FR30:** AI coaching uses opportunity cost framing for business-context users
**FR31:** AI coaching uses future-value framing for student-context users
**FR32:** Users receive coaching in conversational, non-judgmental tone (2-3 sentences)
**FR33:** Users can respond to coaching with actions: keep task, revise task, delete task, or ask follow-up
**FR34:** Users can provide thumbs up/down feedback on coaching quality
**FR35:** System functions with rule-based fallback when LLM unavailable (graceful degradation)
**FR36:** System uses pre-generated coaching patterns for common scenarios (reduce latency)
**FR37:** System caches coaching responses for similar tasks (reduce API calls)

### Smart Suggestions & Nudges (Non-Intrusive)

**FR38:** System detects when user has added 5+ tasks and offers gentle coaching invitation
**FR39:** System shows example AI interaction before user's first coaching attempt
**FR40:** System displays thinking indicator during AI response generation
**FR41:** System celebrates progress milestones (every 5 completions) with positive messages
**FR42:** All suggestions are dismissible and never block core functionality

### User Experience & Interface

**FR43:** Users can access quick-add task entry from any screen (always visible)
**FR44:** Users receive immediate visual feedback when creating/completing tasks (optimistic UI)
**FR45:** Desktop users can use keyboard shortcuts for common actions (new task, search, etc.)
**FR46:** Mobile users can use swipe gestures for task actions
**FR47:** Users see skeleton screens during loading (never blank screens)
**FR48:** Interface adapts layout based on screen size (mobile, tablet, desktop)

### Persona-Specific Adaptations

**FR49:** System detects usage context (desktop vs mobile, task complexity patterns)
**FR50:** Desktop interface shows multi-column layout when space allows
**FR51:** Mobile interface uses bottom navigation optimized for thumb reach
**FR52:** Mobile interface uses touch-optimized tap targets (44×44px minimum)
**FR53:** Desktop interface emphasizes keyboard shortcuts in UI
**FR54:** System adapts coaching language without requiring user to select persona

### Freemium & Usage Limits

**FR55:** Free tier users can create unlimited tasks
**FR56:** Free tier users can use 10 AI coaching interactions per month
**FR57:** Paid tier users can use unlimited AI coaching interactions
**FR58:** System tracks coaching usage count per user per month
**FR59:** System notifies users when approaching free tier coaching limit
**FR60:** Users can upgrade to paid tier at any time

### Data Privacy & Export

**FR61:** Users can export all their data (tasks, goals, interactions) in standard format
**FR62:** Users can opt out of AI coaching interaction logging
**FR63:** System provides clear privacy policy on data usage
**FR64:** System deletes all user data when account deleted (GDPR compliance)
**FR65:** User todo data remains private (not shared with third parties)

### Marketing & Viral Features

**FR66:** Landing page shows 5-second value proposition with real examples
**FR67:** Landing page includes 15-second demo video showing user journey
**FR68:** Users can share aha moments (coaching wins) on social media
**FR69:** System generates Open Graph tags for shared content
**FR70:** Users can refer friends (viral loop support)

### System Reliability

**FR71:** System remains fully functional for baseline todo operations even when AI unavailable
**FR72:** System provides rule-based coaching fallback when LLM API fails
**FR73:** System handles API rate limits gracefully without blocking users
**FR74:** System syncs task changes to backend without blocking UI (background sync)

---

**Total Functional Requirements: 74**

**Coverage Verification:**
✅ Baseline todo app (FR7-14, 71)
✅ Optional AI coaching (FR24-37, 72-73)
✅ Goal capture (FR19-23)
✅ Persona adaptation (FR29-31, 49-54)
✅ UX principles (FR42-48, 66-67)
✅ Web app specifics (FR43-48, 51-53)
✅ Freemium model (FR55-60)
✅ Privacy/GDPR (FR61-65)
✅ Journey optimization (FR38-42, 66-70)
✅ Technical requirements (FR27, 35-37, 71-74)

---

## Non-Functional Requirements

### Performance

**Critical Performance Requirements:**

**NFR-P1: AI Coaching Response Time (CRITICAL)**
- **Requirement:** AI coaching responses delivered in <800ms at 99th percentile
- **Why Critical:** Latency >800ms breaks flow, makes coaching feel slow and annoying
- **Measurement:** Response time from user trigger to AI text displayed
- **Validation:** Load testing with 100 users × 50 interactions/day before MVP launch
- **Mitigation:** Aggressive caching, pre-generated patterns, rule-based fallback

**NFR-P2: Time to Interactive**
- **Requirement:** <3 seconds on 3G connection
- **Why:** Users must see value quickly, especially mobile users (Jordan)
- **Measurement:** Lighthouse TTI metric
- **Target:** 95th percentile <3s

**NFR-P3: First Contentful Paint**
- **Requirement:** <1.5 seconds
- **Why:** Perceived performance matters, blank screens kill trust
- **Measurement:** Lighthouse FCP metric
- **Target:** 95th percentile <1.5s

**NFR-P4: Task CRUD Operations**
- **Requirement:** <100ms perceived latency (optimistic UI)
- **Why:** Core functionality must feel instant
- **Measurement:** Time from user action to visual feedback
- **Implementation:** Optimistic updates, background sync

**NFR-P5: Background Sync**
- **Requirement:** Changes sync to backend without blocking UI
- **Why:** Network latency shouldn't impact user experience
- **Implementation:** Queue operations, retry on failure

### Security

**NFR-S1: Password Security**
- **Requirement:** Passwords hashed with bcrypt or argon2 (cost factor ≥12)
- **Why:** Protect user credentials if database compromised
- **Validation:** Security audit before launch

**NFR-S2: JWT Token Security**
- **Requirement:** JWT tokens signed with strong secret, short expiration (24 hours max)
- **Why:** Session hijacking prevention
- **Implementation:** Secure cookie storage, httpOnly flag, refresh token rotation

**NFR-S3: HTTPS Everywhere**
- **Requirement:** All traffic over HTTPS, enforce TLS 1.2+
- **Why:** Protect data in transit
- **Implementation:** Force HTTPS redirect, HSTS headers

**NFR-S4: Input Validation**
- **Requirement:** Sanitize all user inputs server-side
- **Why:** Prevent XSS, SQL injection
- **Implementation:** Parameterized queries, HTML escaping, input length limits

**NFR-S5: Rate Limiting**
- **Requirement:** Rate limit per user (prevent abuse)
- **Why:** Protect API costs, prevent DoS
- **Implementation:** 100 requests/minute per user, 10 coaching requests/minute

**NFR-S6: Data Privacy**
- **Requirement:** User data encrypted at rest
- **Why:** GDPR compliance, user trust
- **Implementation:** Database encryption, secure backups

### Scalability

**NFR-SC1: MVP Target Load**
- **Requirement:** Support 100 concurrent users comfortably
- **Why:** MVP validation scope
- **Capacity Planning:** 100 users × 50 tasks × 10 coaching/month = manageable load

**NFR-SC2: Database Performance**
- **Requirement:** Query response <50ms for 95th percentile
- **Why:** Backend shouldn't be bottleneck
- **Implementation:** Indexed queries, connection pooling

**NFR-SC3: LLM API Cost Management**
- **Requirement:** Cost per user <$2/month for active users
- **Why:** Sustainable economics at scale
- **Implementation:** Aggressive caching, short prompts, freemium limits

**NFR-SC4: Growth Headroom**
- **Requirement:** Architecture supports 10x growth without major redesign
- **Why:** Success shouldn't require rewrite
- **Implementation:** Stateless app servers, database can scale vertically initially

### Accessibility

**NFR-A1: WCAG 2.1 Level AA Compliance**
- **Requirement:** Meet WCAG 2.1 AA standards minimum
- **Why:** Inclusive design, legal compliance
- **Testing:** Automated tools + manual testing with screen readers

**NFR-A2: Keyboard Navigation**
- **Requirement:** All functionality accessible via keyboard only
- **Why:** Power users (Alex) + accessibility requirement
- **Implementation:** Tab order logical, shortcuts documented, focus indicators visible

**NFR-A3: Screen Reader Support**
- **Requirement:** Semantic HTML, ARIA labels where needed
- **Why:** Visually impaired users
- **Testing:** Test with NVDA/JAWS/VoiceOver

**NFR-A4: Color Contrast**
- **Requirement:** 4.5:1 minimum contrast ratio for body text, 3:1 for large text
- **Why:** Readability for low vision users
- **Validation:** Automated contrast checkers

**NFR-A5: No Color-Only Information**
- **Requirement:** Information conveyed with color must have alternative (icon, text, pattern)
- **Why:** Color-blind users
- **Example:** Task states use icons + color

### Integration

**NFR-I1: LLM API Integration**
- **Requirement:** Support OpenAI and Anthropic APIs (provider flexibility)
- **Why:** Cost optimization, fallback options
- **Implementation:** Provider abstraction layer

**NFR-I2: Graceful Degradation**
- **Requirement:** App fully functional when LLM API unavailable
- **Why:** Single point of failure unacceptable for core functionality
- **Implementation:** Rule-based coaching fallback, baseline app independent

**NFR-I3: Email Service Integration**
- **Requirement:** Reliable email delivery for password resets
- **Why:** Account recovery critical path
- **Implementation:** Transactional email service (SendGrid, Postmark)

**NFR-I4: Analytics Integration**
- **Requirement:** Track key metrics without compromising privacy
- **Why:** Validate hypotheses, measure success criteria
- **Implementation:** Privacy-first analytics (Plausible, Simple Analytics), no tracking of task content

### Reliability & Availability

**NFR-R1: Uptime Target**
- **Requirement:** 99% uptime for MVP (allows ~7 hours downtime/month)
- **Why:** Realistic for MVP, not mission-critical
- **Future:** 99.9% for post-MVP

**NFR-R2: Data Durability**
- **Requirement:** Zero data loss for committed writes
- **Why:** User trust depends on data reliability
- **Implementation:** Database backups daily, replicated storage

**NFR-R3: Error Handling**
- **Requirement:** User-friendly error messages, no technical stack traces
- **Why:** Professional UX, security (don't leak implementation details)
- **Implementation:** Error boundary components, generic user messages, detailed logs server-side

**NFR-R4: Monitoring & Alerting**
- **Requirement:** Real-time monitoring of critical metrics (<800ms latency, error rates, API costs)
- **Why:** Catch issues before users complain
- **Implementation:** Application performance monitoring (APM), alerting on thresholds

### Browser & Platform Support

**NFR-B1: Browser Compatibility**
- **Requirement:** Modern browsers (Chrome, Firefox, Safari, Edge) - latest 2 versions
- **Why:** 95%+ user coverage, avoid legacy browser support burden
- **Testing:** Cross-browser testing in CI/CD

**NFR-B2: Mobile Responsiveness**
- **Requirement:** Full functionality on mobile (320px width minimum)
- **Why:** Jordan persona is mobile-first
- **Testing:** Responsive design testing, real device testing

**NFR-B3: Progressive Enhancement**
- **Requirement:** Core task management works with JavaScript disabled
- **Why:** Resilience, accessibility edge cases
- **Implementation:** Server-rendered fallback for critical paths

---

**NFR Summary:**
- **Performance:** <800ms AI (critical), <3s TTI, <1.5s FCP, <100ms CRUD
- **Security:** bcrypt passwords, JWT auth, HTTPS, input validation, rate limiting, encryption at rest
- **Scalability:** 100 users MVP target, <$2/month per user, 10x growth headroom
- **Accessibility:** WCAG 2.1 AA, keyboard nav, screen reader support, color contrast
- **Integration:** Multi-provider LLM, graceful degradation, email service, privacy-first analytics
- **Reliability:** 99% uptime, zero data loss, friendly errors, real-time monitoring
- **Platform:** Modern browsers (latest 2), mobile responsive (320px+), progressive enhancement

---

---

## PRD Summary

**Project:** simple-todo - AI-coached todo app for regret prevention

**Core Innovation:** Prevents wrong work from happening through AI coaching that questions whether tasks align with user goals. Unlike traditional productivity apps that optimize execution, this prevents wasted effort.

**Dual Purpose:**
1. **User Product:** Baseline todo app that works perfectly without AI + optional coaching for decision paralysis
2. **Strategic Product:** BMAD methodology validation before high-stakes fintech projects

**Key Numbers:**
- **74 Functional Requirements** covering baseline app, optional AI coaching, persona adaptation, freemium model
- **27 Non-Functional Requirements** emphasizing <800ms AI latency, security, accessibility, scalability
- **2 Target Personas:** Alex (overwhelmed founder, desktop, business framing) + Jordan (overwhelmed student, mobile, future framing)
- **MVP Timeline:** <6 weeks with mandatory pre-MVP validation (20 interviews + Wizard of Oz + technical spike)

**Critical Constraints:**
- <800ms AI coaching response (hard requirement - latency kills flow)
- Time-to-first-value <45 seconds (immediate baseline value)
- Works perfectly without AI (coaching is pure enhancement, never friction)
- Pre-MVP validation mandatory (kill criteria: <60% positive, can't achieve <800ms, unsustainable costs)

**Success Criteria:**
- **Methodology (Primary):** <6 week MVP, documented patterns, weekly pivots, confidence gained
- **User Value (Required):** 2-week retention >30%, coaching try >20%, behavioral change evidence
- **Technical:** <800ms latency, <$2/user/month, graceful degradation

**Next Steps:**
1. Pre-MVP validation (2 weeks): 20 interviews, Wizard of Oz prototype, technical spike
2. MVP build (4 weeks): Baseline app + AI coaching with caching/fallback
3. Beta testing: 20-50 users, track metrics, weekly retrospectives
4. Decision: Continue/pivot/kill based on validation criteria

**Product Value:**

This PRD transforms the product brief's vision into implementable requirements. It captures a learning laboratory for BMAD methodology validation - testing spec-driven AI-assisted development in low-stakes environment before high-stakes fintech application. The todo app serves dual purpose: delivering genuine user value (regret prevention through AI coaching) while validating BMAD's standardized processes accelerate development, enable fast pivots, and produce reusable patterns.

Success requires both methodology validation (BMAD enables faster iteration) AND user adoption (proves BMAD can achieve product-market fit, not just ship features). Complete validation means: iteration velocity demonstrated, patterns documented for fintech transfer, users retain beyond 2-week threshold, and team gains confidence for next project.

---

_This PRD was created through collaborative discovery between BMad and AI Product Manager using BMAD methodology workflows._

_Document Version: 1.0 | Created: 2025-11-21 | Output: /home/mateja/Projects/Public/simple-todo/docs/prd.md_
