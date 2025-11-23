# Novel Architectural Patterns

## Pattern 1: AI Coaching with <800ms Latency Guarantee

**Challenge:** Real-time AI coaching without typical 2-5s LLM latency.

**Solution Components:**

1. Multi-tier caching system
2. Streaming responses (progressive UI)
3. Rule-based fallback
4. Pre-generation engine

**Data Flow:**

```
User triggers coaching
    ↓
Frontend → Hono /api/coaching endpoint
    ↓
Check Tier 1 (node-cache) - <1ms
    ├─ HIT → Return immediately
    └─ MISS ↓
Check Tier 2 (Redis, optional) - ~3ms
    ├─ HIT → Return + update Tier 1
    └─ MISS ↓
Parallel execution:
    ├─ Call Claude Sonnet 4.5 with streaming
    │   ├─ First token <500ms → start streaming
    │   └─ Complete <800ms target
    └─ If >600ms elapsed → Activate fallback
        └─ Return pre-generated coaching
    ↓
Cache successful responses (both tiers)
```

**Cache Keys:** `coaching:${userId}:${taskHash}`

**Rule-Based Fallback Patterns:**

```typescript
const fallbackPatterns = {
  work_task: "Does this align with your business goals?",
  learning_task: "Will this matter in 5 years?",
  urgent_task: "Is the urgency real or perceived?",
  low_confidence: "What info do you need to feel confident?",
};
```

**Streaming Implementation:**

- Use Server-Sent Events (SSE)
- Frontend shows "thinking..." → progressive text
- Perceived latency <300ms even if total 800ms

**Affects:** FR24-37 (all AI coaching)

---

## Pattern 2: Persona-Adaptive UI Without Explicit Configuration

**Challenge:** Detect persona (founder vs student) from behavior, adapt tone without asking.

**Solution Components:**

1. Persona Signal Collector
2. Inference Engine
3. Adaptive Rendering System
4. Tone Adapter (backend coaching prompts)

**Signal Collection:**

```typescript
interface PersonaSignals {
  deviceType: "desktop" | "mobile"; // Alex=desktop, Jordan=mobile
  taskComplexity: number; // Alex=higher
  timeOfDay: "work_hours" | "evening"; // Alex=work, Jordan=evening
  taskKeywords: string[]; // 'fundraise'=Alex, 'exam'=Jordan
  sessionLength: number; // Alex=longer
}
```

**Inference Scoring:**

```typescript
function inferPersona(signals: PersonaSignals): PersonaType {
  let score = 0;
  if (signals.deviceType === "desktop") score += 2;
  if (signals.taskComplexity > 7) score += 2;
  if (
    signals.taskKeywords.some((k) =>
      ["business", "customer", "revenue"].includes(k)
    )
  )
    score += 3;
  // score > 5 = founder, score < -5 = student, else neutral
  return score > 5 ? "founder" : score < -5 ? "student" : "neutral";
}
```

**Adaptive Components:**

```typescript
// Frontend
const persona = usePersona();
<CoachingPanel
  tone={persona === 'founder' ? 'challenging' : 'supportive'}
  language={persona === 'founder' ? 'opportunity cost' : 'future value'}
/>

// Backend
function buildCoachingPrompt(task: Task, persona: PersonaType, goals: Goal[]) {
  const toneInstruction = persona === 'founder'
    ? "Use direct, business-focused language. Frame as opportunity cost."
    : "Use supportive, permission-granting language. Frame as long-term value.";
  return `${toneInstruction}\n\nTask: ${task.text}\nGoals: ${goals}...`;
}
```

**Graceful Degradation:**

- Start neutral, adapt after 5 tasks or 1 week
- Never wrong—both tones helpful
- Manual override in settings

**Affects:** FR29-31, FR49-54

---

## Pattern 3: Freemium Usage Limiting Without Breaking Flow

**Challenge:** Limit free tier (10 coaching/month) without nagging.

**Solution:**

**Usage Tracking:**

```typescript
async function trackCoachingUsage(userId: string): Promise<number> {
  const month = new Date().toISOString().slice(0, 7); // "2025-11"
  const key = `coaching:count:${userId}:${month}`;
  const count = await cache.incr(key);
  await cache.expire(key, 30 * 24 * 60 * 60); // 30 days
  return count;
}
```

**Soft Limit UX:**

- 0-6 uses: No indication
- 7 uses (70%): Badge "3 free coaching left this month"
- 9 uses (90%): Gentle "1 left—upgrade for unlimited"
- 10 uses (100%): Button shows "Upgrade for coaching" but tasks work perfectly
- Never: Block task creation, nag popups, guilt language

**Contextual Upgrade Prompts:**

- After successful coaching → "Want this every time? Upgrade"
- 5 tasks completed → "Loving this? Get unlimited coaching"
- Never on errors or blocking core features

**Affects:** FR55-60

---
