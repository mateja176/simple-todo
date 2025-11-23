# Epic 5: Growth, Analytics & Monetization

**Goal:** Sustainable business model through freemium. BMAD validation metrics tracked. Viral features enable organic growth. Privacy compliance (GDPR).

**User Value:** Free tier provides value indefinitely. Paid tier unlocks unlimited coaching. Data export + privacy controls build trust. Viral sharing drives growth.

**FRs Covered:** FR55-65 (freemium, privacy, export), FR68-70 (viral features), BMAD metrics (not FRs)

**Stakeholder Mapping Insight:** Dual success criteria - product metrics AND BMAD methodology validation.

---

## Story 5.1: Freemium Usage Tracking

**As a** system,
**I want** to track coaching usage per user per month,
**So that** free tier limits are enforced accurately.

**Acceptance Criteria:**

**Given** user makes coaching request
**When** POST /api/coaching called
**Then** users.coachingCount incremented

**And** if coachingResetAt is null or >30 days ago: reset count to 1, set coachingResetAt to now
**And** if coachingResetAt <30 days ago: increment count

**Given** user on free tier
**When** coachingCount checked
**Then** limit enforced: max 10 per month (FR56)

**And** if count ≥10: coaching request blocked, upgrade prompt shown

**Given** user on paid tier
**When** coachingCount checked
**Then** unlimited coaching allowed (FR57)

**And** count still tracked for analytics (not for limiting)

**Given** month rolls over (30 days since coachingResetAt)
**When** next coaching request made
**Then** count resets to 1, coachingResetAt updated

**Prerequisites:** Story 3.5 (coaching API), Story 1.2 (database schema)

**Technical Notes:**

- FR56-58 (free tier limit, paid unlimited, tracking)
- Database fields: users.coachingCount, users.coachingResetAt, users.tier (enum: 'free', 'paid')
- Reset logic: 30-day rolling window (not calendar month)
- Paid tier check: users.tier === 'paid'
- Tests: count increment, reset logic, limit enforcement, paid tier bypass

---

## Story 5.2: Freemium Limit Notification

**As a** free tier user,
**I want** notification when approaching coaching limit,
**So that** I'm not surprised when limit reached.

**Acceptance Criteria:**

**Given** free tier user at 7/10 coaching uses
**When** coaching response displayed
**Then** subtle reminder shown (FR59):

**And** message: "3 coaching interactions left this month"
**And** link: "Upgrade for unlimited"
**And** dismissible (non-intrusive)

**Given** free tier user at 9/10 coaching uses
**When** coaching response displayed
**Then** stronger notification:

**And** message: "1 coaching interaction left. Resets in X days."
**And** upgrade CTA more prominent

**Given** free tier user at 10/10 limit reached
**When** attempting coaching request
**Then** limit modal displays:

**And** message: "You've reached your free coaching limit (10/month)"
**And** options: "Upgrade to Pro" (primary), "Wait X days for reset" (secondary)
**And** coaching request blocked until upgrade or reset

**Prerequisites:** Story 5.1 (usage tracking), Story 3.10 (coaching UI)

**Technical Notes:**

- FR59 (approaching limit notification)
- Notification thresholds: 7, 9, 10 uses
- Calculate days until reset: (coachingResetAt + 30 days) - now
- Non-intrusive: banner or toast, not blocking modal (until limit reached)
- Tests: notification triggers, messaging, limit enforcement

---

## Story 5.3: Upgrade Flow - Payment Integration

**As a** user,
**I want** to upgrade to paid tier easily,
**So that** I get unlimited coaching.

**Acceptance Criteria:**

**Given** user clicks "Upgrade" CTA
**When** upgrade flow initiated
**Then** payment modal displays:

**And** pricing: $X/month (or annual option)
**And** benefits listed: "Unlimited AI coaching", "Priority support", "Future premium features"
**And** payment form: Stripe Checkout or embedded form
**And** secure payment processing (PCI compliant via Stripe)

**Given** payment succeeds
**When** Stripe webhook received
**Then** users.tier updated to 'paid'

**And** users.paidAt timestamp set
**And** coaching limit immediately removed
**And** success message: "Welcome to Pro! Enjoy unlimited coaching."
**And** email confirmation sent (future: email service integration)

**Given** payment fails
**When** Stripe error returned
**Then** user-friendly error displayed

**And** retry option available
**And** support contact provided

**Prerequisites:** Story 5.1 (tier tracking), Story 5.2 (upgrade CTAs exist)

**Technical Notes:**

- FR60 (upgrade anytime)
- Stripe integration: Stripe Checkout (simplest) or Stripe Elements
- Webhook handling: POST /api/webhooks/stripe
- Verify webhook signature (security)
- Database: users.tier, users.paidAt, subscriptions table (optional: track subscription ID, status)
- Handle subscription states: active, canceled, past_due
- Tests: payment success flow, webhook handling, error scenarios

---

## Story 5.4: Data Export - JSON Format

**As a** user,
**I want** to export all my data,
**So that** I have backup and portability.

**Acceptance Criteria:**

**Given** authenticated user
**When** navigates to settings → privacy → export data
**Then** export button visible: "Download My Data"

**Given** user clicks export button
**When** export initiated
**Then** backend generates JSON file containing:

**And** user account info (email, createdAt, but NOT passwordHash)
**And** all tasks (text, importance, confidence, isCompleted, timestamps)
**And** goals (whatMatters, biggestWin, worstOutcome)
**And** coaching interactions (task, response, latency, timestamp, but NOT userId for privacy)
**And** persona signals (device, usage patterns)

**And** file downloaded: simple-todo-export-YYYY-MM-DD.json
**And** file size displayed before download
**And** export completes in <5 seconds for typical user (<1000 tasks)

**Given** user has opted out of coaching logging
**When** export generated
**Then** coaching interactions excluded (respects opt-out)

**Prerequisites:** Story 1.10 (settings page), Story 5.5 (privacy opt-outs)

**Technical Notes:**

- FR61 (data export)
- Export format: JSON (machine-readable, standard)
- Exclude sensitive fields: passwordHash, internal IDs (use text labels)
- Future: CSV option for spreadsheet import
- Rate limiting: 1 export per hour per user (prevent abuse)
- Tests: export generation, data completeness, privacy opt-out respect

---

## Story 5.5: Privacy Controls - Coaching Logging Opt-Out

**As a** privacy-conscious user,
**I want** to opt out of coaching interaction logging,
**So that** my coaching history isn't permanently stored.

**Acceptance Criteria:**

**Given** user in settings → privacy
**When** privacy controls displayed
**Then** coaching logging toggle visible:

**And** label: "Log AI Coaching Interactions"
**And** description: "Store coaching history for quality improvements. Disable to prevent logging."
**And** default: enabled (opt-out model)
**And** current state displayed

**Given** user toggles logging off
**When** toggle switched
**Then** users.coaching_logging_enabled set to false

**And** future coaching interactions NOT saved to coaching_interactions table
**And** coaching still works (responses generated, just not logged)
**And** warning shown: "Disabling logging means we can't improve coaching quality based on your feedback"

**Given** user with logging disabled requests coaching
**When** coaching response generated
**Then** response displayed normally

**And** NO record created in coaching_interactions table
**And** usage count still incremented (for freemium limit)

**Prerequisites:** Story 3.5 (coaching API), Story 4.9 (settings page)

**Technical Notes:**

- FR62 (opt out of coaching logging)
- Database: users.coaching_logging_enabled boolean (default true)
- Coaching still functional when disabled (only logging affected)
- Usage tracking separate from interaction logging (freemium still works)
- Tests: opt-out functionality, logging behavior, coaching still works

---

## Story 5.6: Privacy Policy & GDPR Compliance

**As a** user,
**I want** clear privacy policy and GDPR compliance,
**So that** I trust the app with my data.

**Acceptance Criteria:**

**Given** user on landing page or in app
**When** footer displayed
**Then** privacy policy link visible

**And** link navigates to /privacy-policy page
**And** policy clearly states:

- Data collected: email, tasks, goals, coaching interactions (if opted in)
- Data usage: app functionality, coaching quality improvement
- Data sharing: NOT shared with third parties (FR65)
- Data retention: deleted on account deletion (FR64)
- User rights: export, delete, opt-out

**Given** EU user
**When** signing up
**Then** GDPR-compliant consent shown:

**And** checkbox: "I agree to the privacy policy and terms of service"
**And** links to both documents
**And** cannot proceed without consent

**Given** user deletes account (Story 1.10)
**When** deletion confirmed
**Then** ALL data permanently deleted (FR64):

**And** user record, tasks, goals, coaching interactions, refresh tokens
**And** cascade deletes work correctly
**And** no soft delete (hard delete for GDPR)
**And** confirmation email sent: "Your data has been permanently deleted"

**Prerequisites:** Story 1.10 (account deletion), Story 5.5 (privacy controls)

**Technical Notes:**

- FR63-65 (privacy policy, GDPR deletion, no third-party sharing)
- Privacy policy: Markdown document, versioned
- GDPR compliance: consent checkbox on signup, data deletion on account delete
- Tests: privacy policy accessible, deletion completeness, consent required

---

## Story 5.7: Social Sharing - Aha Moment Posts

**As a** user who had positive coaching experience,
**I want** to share on social media,
**So that** I spread the word and invite friends.

**Acceptance Criteria:**

**Given** user receives helpful coaching
**When** coaching response displayed
**Then** share button visible (FR68):

**And** icon: share/export symbol
**And** label: "Share this insight"
**And** positioned near feedback buttons (thumbs up/down)

**Given** user clicks share button
**When** share modal opens
**Then** pre-populated social post shown:

**And** text: "Just got great perspective from @SimpleToDoAI: '[coaching excerpt]'. Helps me focus on what actually matters. 🎯"
**And** editable (user can customize)
**And** share options: Twitter/X, LinkedIn, copy link
**And** Open Graph preview shown (image + description)

**Given** user shares on Twitter
**When** share clicked
**Then** Twitter intent URL opened with pre-filled text

**And** opens in new tab/window
**And** tracking pixel (optional): utm_source=twitter&utm_campaign=aha_share

**Prerequisites:** Story 3.10 (coaching UI), Story 1.7 (Open Graph tags exist)

**Technical Notes:**

- FR68-69 (share aha moments, Open Graph tags)
- Share button: optional, not pushy
- Social platforms: Twitter/X, LinkedIn (professional contexts)
- Open Graph tags: already implemented in Story 1.7, enhance for coaching shares
- Privacy: don't share task text without permission, only coaching insight
- Tests: share button visibility, modal display, social intent URLs

---

## Story 5.8: Referral Program - Invite Friends

**As a** satisfied user,
**I want** to invite friends and get rewards,
**So that** I benefit from spreading the word.

**Acceptance Criteria:**

**Given** authenticated user
**When** navigates to settings → referrals (or dedicated /refer page)
**Then** referral interface displays:

**And** unique referral link: https://simple-todo.app/r/[userCode]
**And** copy link button (clipboard API)
**And** referral count: "X friends joined"
**And** reward status: "Earn 1 month Pro for every 3 referrals" (example)

**Given** user copies referral link
**When** copy button clicked
**Then** link copied to clipboard

**And** toast notification: "Link copied!"

**Given** new user visits referral link
**When** /r/[userCode] accessed
**Then** referrer tracked in signup flow

**And** cookie set: referred_by=[userCode] (7-day expiry)
**And** redirect to signup page

**Given** referred user signs up
**When** account created
**Then** referral recorded in database:

**And** referrals table: referrer_id, referred_user_id, createdAt
**And** referrer's referral count incremented
**And** reward eligibility checked (e.g., every 3 referrals = 1 month Pro)

**Prerequisites:** Story 1.3 (signup), Story 5.3 (paid tier mechanics)

**Technical Notes:**

- FR70 (referral/viral loop)
- Referral code: short alphanumeric (6-8 chars), unique per user
- Generate on user creation: base64(userId) or random string
- Track referrals: separate table or users.referred_by foreign key
- Reward mechanics: configurable (1 month free per N referrals)
- Fraud prevention: validate referred user is active (e.g., completed 5 tasks)
- Tests: link generation, referral tracking, reward calculation

---

## Story 5.9: Analytics - BMAD Validation Metrics

**As a** project owner,
**I want** BMAD methodology validation metrics tracked,
**So that** I measure iteration velocity and pattern reusability.

**Acceptance Criteria:**

**Given** application running in production
**When** key events occur
**Then** metrics logged for BMAD validation:

**And** **Iteration Velocity:**

- Story completion time (from started to deployed)
- Epic completion time
- Deployment frequency (commits/deploys per week)
- Bug/rework rate (issues created post-deployment)

**And** **User Metrics (validate product, not just methodology):**

- 2-week retention rate
- Coaching try rate (% of users who try coaching at least once)
- Time-to-first-value (signup to first task created)
- Free-to-paid conversion rate

**And** **Cost Metrics:**

- LLM API cost per user per month (target <$2 per FR/NFR)
- Cache hit rate (% of coaching requests served from cache)
- Average coaching latency (P50, P95, P99)

**Given** viewing admin dashboard (/admin/metrics)
**When** authenticated as project owner
**Then** BMAD metrics displayed:

**And** charts: velocity trends, retention curves, cost per user
**And** exportable as CSV for case study documentation
**And** real-time data (refreshed hourly)

**Prerequisites:** Story 1.12 (observability foundation), Story 3.5 (coaching metrics logged)

**Technical Notes:**

- Stakeholder mapping insight: dual success criteria (BMAD + product)
- Metrics storage: dedicated analytics_events table or external service (Plausible, PostHog)
- BMAD-specific metrics: track story/epic completion via git commits or manual logging
- Admin dashboard: protected route, simple charts (Chart.js or Recharts)
- Privacy: aggregate only, no individual user tracking without consent
- Tests: metric logging, dashboard rendering, CSV export

---

## Story 5.10: User Feedback Mechanism

**As a** user,
**I want** easy way to provide feedback or report bugs,
**So that** I help improve the product.

**Acceptance Criteria:**

**Given** user in app
**When** viewing any page
**Then** feedback button accessible:

**And** positioned in footer or floating button (non-intrusive)
**And** icon: message or feedback symbol
**And** label: "Feedback" or "Help"

**Given** user clicks feedback button
**When** feedback modal opens
**Then** simple form displayed:

**And** feedback type dropdown: Bug Report, Feature Request, General Feedback
**And** message textarea (required, max 500 chars)
**And** email optional (pre-filled if authenticated)
**And** screenshot option: "Include screenshot" checkbox (captures current page)
**And** submit button

**Given** user submits feedback
**When** form submitted
**Then** feedback saved to database (feedback table)

**And** email notification to team (optional)
**And** success message: "Thanks! We'll review your feedback."
**And** user can continue using app (modal closes)

**Prerequisites:** Story 4.9 (settings/UI framework)

**Technical Notes:**

- Stakeholder mapping insight: early adopter feedback loop critical
- Feedback table: type, message, email, screenshot_url, user_id, createdAt
- Screenshot: browser screenshot API (if supported) or skip
- Email notification: placeholder for MVP (console.log), real email post-MVP
- Alternative: integrate with existing tools (Canny, GitHub Issues)
- Tests: form submission, feedback storage, modal behavior

---

**Epic 5 Complete: 10 Stories**

All stories deliver sustainable business model + BMAD validation + viral growth. Freemium limits enforced. Data export + privacy controls. Referral program. BMAD metrics tracked.

---
