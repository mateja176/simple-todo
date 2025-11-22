# FR to Architecture Mapping

| FR Category | Frontend Location | Backend Location | Database Tables | Key Technologies |
|-------------|-------------------|------------------|-----------------|------------------|
| User Account & Auth (FR1-6) | `app/(auth)/`, `middleware.ts` | `routes/auth.ts`, `services/authService.ts` | `users`, `refresh_tokens` | JWT, bcrypt, httpOnly cookies |
| Task Management (FR7-14) | `app/(dashboard)/tasks/`, `components/tasks/` | `routes/tasks.ts`, `services/taskService.ts` | `tasks` | TanStack Query, optimistic updates |
| Optional Metadata (FR15-18) | `components/tasks/TaskForm.tsx` | (embedded in tasks) | `tasks.importance`, `tasks.confidence` | React Hook Form, Zod |
| Goal Management (FR19-23) | `app/(dashboard)/goals/` | `routes/goals.ts` | `goals` | Optional flow, async |
| AI Coaching (FR24-37) | `components/coaching/`, `hooks/useCoaching.ts` | `routes/coaching.ts`, `services/coachingService.ts`, `services/llmService.ts` | `coaching_interactions`, `coaching_cache` | Claude Sonnet 4.5, streaming, multi-tier cache |
| Smart Suggestions (FR38-42) | `components/coaching/Nudges.tsx` | `services/coachingService.ts` | (state-based, usage patterns) | Pattern recognition |
| UX & Interface (FR43-48) | `components/ui/`, `components/layout/` | N/A | N/A | Tailwind, responsive design |
| Persona Adaptation (FR49-54) | `hooks/usePersona.ts`, adaptive components | `services/coachingService.ts` (tone) | `users.persona_signals` | Inference engine, adaptive prompts |
| Freemium (FR55-60) | `components/UpgradePrompt.tsx` | `middleware/usageLimit.ts` | `users.coaching_count` | Soft limits, contextual prompts |
| Privacy & Export (FR61-65) | `app/(dashboard)/settings/` | `routes/data.ts` | (all tables) | GDPR compliance, data export |
| Marketing & Viral (FR66-70) | `app/page.tsx` (landing), `components/Share.tsx` | N/A | N/A | Next.js SSR, social sharing |
| System Reliability (FR71-74) | TanStack Query retries | `middleware/errorHandler.ts`, `services/cacheService.ts` | N/A | Error boundaries, fallback cache |
