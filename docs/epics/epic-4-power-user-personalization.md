# Epic 4: Power User & Personalization

**Goal:** Enhance retention through efficient workflows for power users. Desktop keyboard shortcuts for Alex, mobile gestures for Jordan. Optional task metadata for power users who want it.

**User Value:** Power users get optimized workflows. Desktop users control everything via keyboard. Mobile users access via thumb-friendly bottom nav and swipes.

**FRs Covered:** FR15-18 (metadata), FR45-46 (shortcuts/gestures), FR50-53 (desktop/mobile personalization)

---

## Story 4.1: Task Metadata - Importance & Confidence Fields

**As a** power user,
**I want** to add importance and confidence ratings to tasks,
**So that** I track which tasks matter most and where I need help.

**Acceptance Criteria:**

**Given** user creating or editing task
**When** form displayed
**Then** optional metadata fields visible:

**And** importance slider/picker: 1-10 scale (optional, can leave blank)
**And** confidence slider/picker: 1-10 scale (optional, can leave blank)
**And** tooltips explain meaning:

- Importance: "How critical is this task?"
- Confidence: "How confident are you in executing this?"

**And** fields collapsed by default (not intimidating)
**And** "Show advanced" toggle expands metadata section

**Given** user skips metadata
**When** task created without importance/confidence
**Then** task saved successfully (FR18)

**And** no validation errors
**And** fields remain null in database

**Given** user sets metadata
**When** importance and/or confidence provided
**Then** values saved to task record

**And** API accepts partial metadata (importance only, confidence only, or both)

**Prerequisites:** Story 2.1 (task API), Story 2.5 (task creation UI)

**Technical Notes:**

- FR15-18 (optional metadata)
- Database: importance, confidence fields nullable integers (1-10)
- UI: range sliders or picker dropdowns
- Default state: collapsed (don't overwhelm simple users)
- Mobile: bottom sheet with sliders for metadata entry
- Tests: metadata saving, optional behavior, validation

---

## Story 4.2: Task List - Visual Metadata Indicators

**As a** user with metadata enabled,
**I want** to see importance/confidence at a glance,
**So that** I prioritize effectively.

**Acceptance Criteria:**

**Given** task has importance rating
**When** displayed in list
**Then** importance indicator visible (FR17):

**And** visual representation: color-coded dot, badge, or border intensity
**And** high importance (8-10): red/urgent color
**And** medium importance (4-7): yellow/orange
**And** low importance (1-3): blue/calm
**And** no importance: no indicator

**Given** task has confidence rating
**When** displayed in list
**Then** confidence indicator visible:

**And** visual representation: icon or secondary badge
**And** low confidence (1-3): question mark icon or red flag
**And** medium confidence (4-7): neutral indicator
**And** high confidence (8-10): checkmark or green indicator
**And** no confidence: no indicator

**Given** task has both ratings
**When** displayed
**Then** both indicators shown without cluttering UI

**And** indicators small, non-intrusive
**And** accessible via hover tooltip (desktop) or long-press (mobile)

**Prerequisites:** Story 4.1 (metadata fields exist)

**Technical Notes:**

- FR17 (visual indicators)
- Design: subtle, professional (not overwhelming)
- Color-blind accessible: use icons + colors
- Mobile: tap indicator to see details
- Tests: indicator rendering, accessibility, color contrast

---

## Story 4.3: Keyboard Shortcuts - Core Actions

**As a** desktop power user,
**I want** keyboard shortcuts for common actions,
**So that** I work faster without reaching for mouse.

**Acceptance Criteria:**

**Given** user on desktop
**When** keyboard shortcuts pressed
**Then** actions triggered:

**And** `N` or `Cmd/Ctrl+N`: focus quick-add input
**And** `Cmd/Ctrl+K`: open command palette (future: search/navigate)
**And** `Cmd/Ctrl+Enter`: create task from quick-add
**And** `J` / `K`: navigate down/up in task list (Vim-style)
**And** `E`: edit selected task
**And** `D`: delete selected task (with confirmation)
**And** `Space`: toggle task completion
**And** `C`: request coaching on selected task
**And** `?`: show keyboard shortcuts help modal

**Given** shortcuts help modal open
**When** `?` pressed or help icon clicked
**Then** modal displays all shortcuts with descriptions

**And** shortcuts grouped by category (navigation, actions, etc.)
**And** shortcuts display OS-specific notation (Cmd on Mac, Ctrl on Windows)

**Given** user in input field
**When** typing
**Then** shortcuts disabled (prevent interference)

**And** only form-specific shortcuts active (Enter to submit, Esc to cancel)

**Prerequisites:** Story 2.5 (quick-add), Story 2.6 (edit), Story 2.7 (completion), Story 2.8 (delete), Story 3.9 (coaching)

**Technical Notes:**

- FR45, FR53 (keyboard shortcuts, desktop emphasis)
- Library: react-hotkeys-hook or custom implementation
- OS detection: display Cmd (Mac) vs Ctrl (Windows/Linux)
- Selected task state: track active task for J/K navigation
- Accessibility: shortcuts don't break screen reader navigation
- Tests: shortcut triggering, modal display, input field disabling

---

## Story 4.4: Keyboard Shortcuts - Visual Hints

**As a** desktop user,
**I want** keyboard shortcuts visible in UI,
**So that** I discover and remember them.

**Acceptance Criteria:**

**Given** desktop user hovering over actionable element
**When** hover state active
**Then** keyboard shortcut hint displayed:

**And** subtle badge showing shortcut (e.g., "E" for edit, "Space" for complete)
**And** positioned near element (tooltip or inline badge)
**And** non-intrusive (doesn't obscure content)

**Given** user on mobile/tablet
**When** viewing UI
**Then** keyboard shortcut hints hidden (not applicable)

**Given** quick-add input visible
**When** input empty
**Then** placeholder hints: "What needs your focus? (Press N to focus)"

**Prerequisites:** Story 4.3 (keyboard shortcuts exist)

**Technical Notes:**

- FR53 (desktop interface emphasizes shortcuts)
- Empathy map insight: Alex loves keyboard control
- Subtle visual hints: gray badges, tooltips
- Hide on mobile: responsive CSS (display: none below 768px)
- Tests: hint visibility, responsive hiding, tooltip positioning

---

## Story 4.5: Mobile Swipe Gestures - Enhanced Actions

**As a** mobile user,
**I want** swipe gestures for quick task actions,
**So that** I work efficiently on touch devices.

**Acceptance Criteria:**

**Given** user on mobile device
**When** viewing task in list
**Then** swipe gestures enabled:

**And** swipe right: mark complete (reveal green checkmark background)
**And** swipe left: delete (reveal red delete background)
**And** partial swipe shows action preview (background color + icon)
**And** full swipe (past threshold) triggers action
**And** partial swipe releases: snaps back to original position

**Given** user swipes right to complete
**When** swipe threshold crossed
**Then** task marked complete (Story 2.7)

**And** smooth animation (slide + opacity transition)
**And** celebration if milestone (every 5th completion)

**Given** user swipes left to delete
**When** swipe threshold crossed
**Then** confirmation prompt appears (Story 2.8)

**And** prevents accidental deletion

**Given** user on desktop
**When** viewing task list
**Then** swipe gestures disabled (mouse/trackpad not touch)

**Prerequisites:** Story 2.7 (completion), Story 2.8 (deletion), Story 2.9 (responsive layout)

**Technical Notes:**

- FR46 (mobile swipe gestures)
- Empathy map insight: Jordan's mobile-first, thumb-driven behavior
- Library: react-swipeable or custom touch event handlers
- Swipe threshold: ~50% of task width
- Animation: CSS transitions for smoothness
- Haptic feedback (if supported): vibrate on action trigger
- Tests: swipe detection, threshold triggering, animation, desktop disabling

---

## Story 4.6: Mobile Bottom Navigation

**As a** mobile user,
**I want** thumb-friendly bottom navigation,
**So that** I access features comfortably one-handed.

**Acceptance Criteria:**

**Given** user on mobile device (< 768px width)
**When** viewing app
**Then** bottom navigation bar displayed:

**And** fixed position at bottom (thumb-reach zone per FR51)
**And** 3-4 nav items: Tasks, Goals, Settings, (optional: Insights future)
**And** icons with labels
**And** active item highlighted (color + icon fill)
**And** tap target 44×44px minimum per item

**Given** user on tablet/desktop
**When** viewing app
**Then** bottom nav hidden, sidebar navigation shown instead

**Given** user taps nav item
**When** item selected
**Then** navigate to corresponding page

**And** smooth transition (no page flash)
**And** active state updates

**Prerequisites:** Story 2.9 (responsive layout), Story 3.2 (goals page exists)

**Technical Notes:**

- FR51 (mobile bottom nav, thumb reach)
- Empathy map insight: Jordan's thumb-driven navigation
- Fixed bottom position: z-index high, doesn't overlap content
- Responsive breakpoint: show bottom nav < 768px, sidebar ≥ 768px
- Icons: simple, recognizable (home, target/goal, settings)
- Tests: nav rendering, active state, responsive switching

---

## Story 4.7: Desktop Multi-Column Layout

**As a** desktop user with large screen,
**I want** multi-column layout,
**So that** I see more information without scrolling.

**Acceptance Criteria:**

**Given** desktop viewport (≥ 1024px width)
**When** viewing task list
**Then** multi-column layout enabled (FR50):

**And** sidebar navigation (left): 200-250px width
**And** main task list (center): flexible width
**And** optional coaching/insights panel (right): 300px width (future)

**Given** viewport width 1024px-1440px
**When** layout rendered
**Then** 2-column: sidebar + main content

**Given** viewport width > 1440px
**When** layout rendered
**Then** 3-column option: sidebar + main + right panel

**And** right panel shows recent coaching interactions or tips

**Given** viewport < 1024px
**When** layout rendered
**Then** single column, sidebar collapses to hamburger menu

**Prerequisites:** Story 2.9 (responsive layout), Story 4.6 (nav components exist)

**Technical Notes:**

- FR50 (desktop multi-column layout)
- Empathy map insight: Alex's desktop-optimized workflow
- Flexbox or CSS Grid for layout
- Sidebar: navigation links (Tasks, Goals, Settings, Account)
- Right panel: optional, can be hidden by user preference
- Tests: responsive breakpoints, column rendering, sidebar collapse

---

## Story 4.8: Coaching Toggle - Enable/Disable

**As a** user,
**I want** to turn AI coaching on/off globally,
**So that** I control when I see coaching features.

**Acceptance Criteria:**

**Given** user in settings
**When** viewing preferences
**Then** coaching toggle visible:

**And** label: "Enable AI Coaching"
**And** toggle switch (on/off)
**And** description: "Get AI perspective on tasks. Uses LLM API."
**And** current state displayed (enabled/disabled)

**Given** user toggles coaching off
**When** toggle switched
**Then** coaching features hidden throughout app:

**And** coaching buttons removed from task list
**And** coaching nudges disabled
**And** goal capture still accessible (optional context for future)
**And** user preference saved to database (users.coaching_enabled field)

**Given** user toggles coaching on
**When** toggle switched
**Then** coaching features restored

**And** coaching buttons visible on tasks
**And** nudges re-enabled if not dismissed
**And** preference saved

**Prerequisites:** Story 3.9 (coaching UI), Story 1.10 (settings page structure)

**Technical Notes:**

- FR24 (enable/disable coaching anytime)
- Add users.coaching_enabled boolean field to schema
- Default: true (coaching enabled, user opts out if desired)
- Zustand store: cache coaching_enabled state
- Tests: toggle functionality, UI changes, persistence

---

## Story 4.9: Settings Page - Account & Preferences

**As a** user,
**I want** centralized settings page,
**So that** I manage account and preferences in one place.

**Acceptance Criteria:**

**Given** authenticated user
**When** navigating to /settings
**Then** settings page displays:

**And** sections: Account, Preferences, Privacy, About
**And** Account section: email (read-only), change password, delete account (Story 1.10)
**And** Preferences section: coaching toggle (Story 4.8), theme (future: dark mode)
**And** Privacy section: export data (Story 5.x), coaching logging opt-out (Story 5.x)
**And** About section: app version, links to help/privacy policy

**Given** user on mobile
**When** viewing settings
**Then** single-column layout, touch-optimized

**Given** user on desktop
**When** viewing settings
**Then** sidebar + content layout, keyboard navigable

**Prerequisites:** Story 1.10 (account deletion exists), Story 4.8 (coaching toggle)

**Technical Notes:**

- Centralized settings UI
- Form sections: collapsible accordions or tabs
- Change password: same validation as signup (Story 1.8)
- Mobile: bottom sheet for subsections
- Tests: navigation, form submissions, responsive layout

---

**Epic 4 Complete: 9 Stories**

All stories enhance power user workflows. Desktop keyboard shortcuts + multi-column layout. Mobile swipe gestures + bottom nav. Optional metadata for advanced users.

---
