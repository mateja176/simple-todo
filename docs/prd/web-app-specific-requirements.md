# Web App Specific Requirements

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
