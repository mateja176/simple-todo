# PRD Summary

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
