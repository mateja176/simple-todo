# Functional Requirements

**Purpose:** Complete inventory of user-facing and system capabilities that deliver product vision. These FRs define WHAT the product must do (not HOW to implement).

**Coverage:** Every capability from MVP scope, innovation patterns, and web app requirements.

**Organization:** Grouped by capability area, numbered sequentially (FR1, FR2...).

---

## User Account & Authentication

**FR1:** Users can create accounts with email and password
**FR2:** Users can log in securely with email/password credentials
**FR3:** Users can reset forgotten passwords via email verification
**FR4:** Users can remain logged in across sessions (session persistence)
**FR5:** Users can log out of their account
**FR6:** Users can delete their account and all associated data

## Task Management (Baseline Functionality)

**FR7:** Users can create new tasks with plain text descriptions
**FR8:** Users can view all their tasks in a list
**FR9:** Users can edit task descriptions
**FR10:** Users can delete tasks
**FR11:** Users can mark tasks as complete
**FR12:** Users can unmark completed tasks (return to active)
**FR13:** Users can see visual distinction between active and completed tasks
**FR14:** Task operations (create/edit/delete/complete) work without AI coaching enabled

## Optional Task Metadata

**FR15:** Users can optionally assign importance rating to tasks (not required for task creation)
**FR16:** Users can optionally assign confidence rating to tasks (not required for task creation)
**FR17:** Users can view visual indicators of importance/confidence when assigned
**FR18:** Users can skip all metadata and use app as simple todo list

## Goal Management (Optional)

**FR19:** Users can capture their top goals through conversational prompts (optional setup)
**FR20:** Users can skip goal capture entirely and use app without goals
**FR21:** Users can edit or update their goals at any time
**FR22:** Users can view their saved goals
**FR23:** System stores user goals to provide context for AI coaching

## AI Coaching (Optional Enhancement)

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

## Smart Suggestions & Nudges (Non-Intrusive)

**FR38:** System detects when user has added 5+ tasks and offers gentle coaching invitation
**FR39:** System shows example AI interaction before user's first coaching attempt
**FR40:** System displays thinking indicator during AI response generation
**FR41:** System celebrates progress milestones (every 5 completions) with positive messages
**FR42:** All suggestions are dismissible and never block core functionality

## User Experience & Interface

**FR43:** Users can access quick-add task entry from any screen (always visible)
**FR44:** Users receive immediate visual feedback when creating/completing tasks (optimistic UI)
**FR45:** Desktop users can use keyboard shortcuts for common actions (new task, search, etc.)
**FR46:** Mobile users can use swipe gestures for task actions
**FR47:** Users see skeleton screens during loading (never blank screens)
**FR48:** Interface adapts layout based on screen size (mobile, tablet, desktop)

## Persona-Specific Adaptations

**FR49:** System detects usage context (desktop vs mobile, task complexity patterns)
**FR50:** Desktop interface shows multi-column layout when space allows
**FR51:** Mobile interface uses bottom navigation optimized for thumb reach
**FR52:** Mobile interface uses touch-optimized tap targets (44×44px minimum)
**FR53:** Desktop interface emphasizes keyboard shortcuts in UI
**FR54:** System adapts coaching language without requiring user to select persona

## Freemium & Usage Limits

**FR55:** Free tier users can create unlimited tasks
**FR56:** Free tier users can use 10 AI coaching interactions per month
**FR57:** Paid tier users can use unlimited AI coaching interactions
**FR58:** System tracks coaching usage count per user per month
**FR59:** System notifies users when approaching free tier coaching limit
**FR60:** Users can upgrade to paid tier at any time

## Data Privacy & Export

**FR61:** Users can export all their data (tasks, goals, interactions) in standard format
**FR62:** Users can opt out of AI coaching interaction logging
**FR63:** System provides clear privacy policy on data usage
**FR64:** System deletes all user data when account deleted (GDPR compliance)
**FR65:** User todo data remains private (not shared with third parties)

## Marketing & Viral Features

**FR66:** Landing page shows 5-second value proposition with real examples
**FR67:** Landing page includes 15-second demo video showing user journey
**FR68:** Users can share aha moments (coaching wins) on social media
**FR69:** System generates Open Graph tags for shared content
**FR70:** Users can refer friends (viral loop support)

## System Reliability

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
