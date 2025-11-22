# Non-Functional Requirements

## Performance

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

## Security

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

## Scalability

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

## Accessibility

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

## Integration

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

## Reliability & Availability

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

## Browser & Platform Support

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
