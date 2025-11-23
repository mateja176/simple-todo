# Product Scope

## MVP - Minimum Viable Product

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

## Growth Features (Post-MVP)

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

## Vision (Future)

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
