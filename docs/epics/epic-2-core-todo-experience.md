# Epic 2: Core Todo Experience

**Goal:** Deliver fully functional baseline todo app that works perfectly without AI. Build trust through reliable, responsive UX before introducing AI coaching.

**User Value:** Users get immediate utility. Can adopt as simple todo app with AI coaching 100% optional. Responsive across desktop and mobile.

**FRs Covered:** FR7-14 (task CRUD), FR43-44 (quick-add, optimistic UI), FR47-48 (responsive), FR74 (background sync)

---

## Story 2.1: Task API Endpoints - CRUD Operations

**As a** user,
**I want** backend API to manage my tasks,
**So that** tasks persist across sessions and devices.

**Acceptance Criteria:**

**Given** authenticated user
**When** POST /api/tasks with {text, importance?, confidence?}
**Then** task created in database with userId, timestamps

**And** task object returned with id, text, metadata, isCompleted=false, timestamps
**And** response time <50ms (P95 per NFR-SC2)

**Given** authenticated user
**When** GET /api/tasks
**Then** all user's tasks returned, sorted by createdAt desc

**And** query param ?completed=false filters to active tasks only
**And** query param ?completed=true filters to completed tasks only
**And** response time <50ms (P95)

**Given** authenticated user owns task
**When** PATCH /api/tasks/:id with updates (text, importance, confidence, isCompleted)
**Then** task updated in database, updatedAt timestamp refreshed

**And** if isCompleted=true, completedAt set to current timestamp
**And** if isCompleted=false, completedAt cleared
**And** updated task returned

**Given** authenticated user owns task
**When** DELETE /api/tasks/:id
**Then** task removed from database

**And** 200 success response returned
**And** subsequent GET excludes deleted task

**Given** user attempts to modify another user's task
**When** any task operation with wrong userId
**Then** 403 Forbidden error returned

**Prerequisites:** Story 1.5 (auth middleware exists), Story 1.2 (database schema exists)

**Technical Notes:**
- Endpoints per api-contracts.md
- FR7-14 (task CRUD operations)
- Drizzle queries with userId filter (security)
- Zod validation for request bodies
- Tests: CRUD operations, authorization, validation

---

## Story 2.2: Frontend Task State Management

**As a** developer,
**I want** centralized task state management,
**So that** UI stays synchronized with backend.

**Acceptance Criteria:**

**Given** user authenticated
**When** app loads /tasks page
**Then** TanStack Query fetches tasks from GET /api/tasks

**And** loading skeleton displayed during fetch (FR47)
**And** tasks rendered when fetch completes
**And** error boundary catches fetch failures

**Given** tasks loaded
**When** user creates/updates/deletes task
**Then** optimistic update applied immediately (FR44)

**And** UI reflects change before backend confirmation
**And** background sync queued (FR74)
**And** on success: cache invalidated, task list refreshed
**And** on failure: optimistic update rolled back, error toast shown, retry option

**Given** multiple devices/tabs open
**When** task changes on device A
**Then** device B receives update via TanStack Query refetch (polling or refetchOnFocus)

**Prerequisites:** Story 2.1 (task API exists), Story 1.6 (auth state exists)

**Technical Notes:**
- TanStack Query for server state caching
- Optimistic updates pattern
- Background sync queue (retry logic, exponential backoff)
- Error handling: toast notifications, retry UI
- Tests: optimistic updates, rollback on error, cache invalidation

---

## Story 2.3: Task List UI - Empty State & First Task

**As a** new user,
**I want** clear guidance when task list is empty,
**So that** I know what to do first.

**Acceptance Criteria:**

**Given** user logs in for first time
**When** /tasks page loads with zero tasks
**Then** empty state displays:

**And** illustration or icon (friendly, minimal)
**And** message: "Ready to focus on what matters?"
**And** subtext: "Add your first task to get started"
**And** prominent "Add Task" button or input field visible
**And** optional: example task shown ("Try: Prepare pitch deck")

**Given** user adds first task
**When** task creation succeeds
**Then** empty state disappears

**And** task list displays with single task
**And** celebration micro-animation (subtle, non-intrusive)
**And** quick-add input remains visible (FR43)

**Prerequisites:** Story 2.2 (task state management exists)

**Technical Notes:**
- Empty state design: friendly, encouraging (not guilt-inducing)
- Empathy map insight: tool fatigue - must feel simple and inviting
- Mobile responsive: works at 320px width
- Tests: empty state rendering, first task flow

---

## Story 2.4: Task List UI - Active & Completed Views

**As a** user,
**I want** to see my active and completed tasks separately,
**So that** I focus on what needs doing without clutter.

**Acceptance Criteria:**

**Given** user has active and completed tasks
**When** viewing /tasks page
**Then** active tasks displayed by default at top

**And** completed tasks section below (collapsible or separate tab)
**And** visual distinction between active/completed (FR13):
- Active: normal opacity, checkbox empty
- Completed: reduced opacity or strikethrough, checkbox filled

**Given** user toggles completed section
**When** clicks "Show/Hide Completed" or switches tabs
**Then** completed tasks visibility toggles

**And** preference persisted (Zustand or localStorage)

**Given** many tasks exist (20+)
**When** scrolling task list
**Then** virtual scrolling or pagination for performance

**And** scroll position maintained on task updates

**Prerequisites:** Story 2.2 (task state management exists)

**Technical Notes:**
- FR8, FR13 (view tasks, visual distinction)
- Active tasks priority display
- Completed tasks: strikethrough + reduced opacity
- Consider virtualization for long lists (react-window)
- Mobile: swipe to reveal completed section
- Tests: filtering, visual distinction, toggle persistence

---

## Story 2.5: Quick-Add Task Input (Always Visible)

**As a** user,
**I want** to add tasks instantly from anywhere,
**So that** capturing thoughts requires zero friction.

**Acceptance Criteria:**

**Given** user on any page in app
**When** viewing UI
**Then** quick-add input field always visible (FR43)

**And** input placeholder: "What needs your focus?" or similar
**And** input auto-expands on focus (mobile: keyboard appears)
**And** Enter key or "Add" button submits

**Given** user types task and submits
**When** Enter pressed or Add clicked
**Then** task created via optimistic update (Story 2.2)

**And** input clears immediately
**And** input remains focused for rapid multiple adds
**And** success micro-feedback (checkmark icon flash, subtle animation)

**Given** user submits empty input
**When** Enter pressed with blank field
**Then** no-op (nothing happens, no error)

**And** input remains focused

**Given** mobile device
**When** input focused
**Then** keyboard appears, input accessible without scrolling

**And** tap target 44×44px minimum (FR52)

**Prerequisites:** Story 2.2 (task state management exists)

**Technical Notes:**
- FR43 (quick-add always visible)
- FR7 (create tasks)
- Sticky positioning (top of viewport) or fixed header
- Desktop: keyboard shortcut (e.g., Cmd+K) focuses input (Story 4.x)
- Mobile: bottom-positioned for thumb reach consideration
- Optimistic UI: immediate feedback
- Tests: task creation, empty submission, keyboard interactions

---

## Story 2.6: Task Inline Edit

**As a** user,
**I want** to edit task text directly in the list,
**So that** I can fix typos or refine descriptions quickly.

**Acceptance Criteria:**

**Given** user viewing task
**When** clicks on task text (desktop) or taps and holds (mobile)
**Then** text becomes editable input field

**And** current text pre-filled, cursor at end
**And** input auto-focused, text selectable

**Given** user editing task
**When** changes text and presses Enter or clicks outside
**Then** task updated via API (PATCH /api/tasks/:id)

**And** optimistic update applied immediately
**And** loading indicator during save (subtle spinner)
**And** on success: edit mode exits, new text displays
**And** on failure: rollback to original text, error toast, retry option

**Given** user presses Escape while editing
**When** Escape key pressed
**Then** edit cancelled, original text restored

**And** edit mode exits without saving

**Prerequisites:** Story 2.2 (task state management), Story 2.5 (task display exists)

**Technical Notes:**
- FR9 (edit tasks)
- Inline editing UX: contentEditable or input field replacement
- Desktop: click-to-edit
- Mobile: long-press to edit (avoid conflicts with swipe gestures)
- Validation: max 500 chars (database constraint)
- Tests: edit flow, cancel, validation, optimistic update

---

## Story 2.7: Task Completion Toggle

**As a** user,
**I want** to mark tasks complete with a single click/tap,
**So that** I get satisfaction from progress.

**Acceptance Criteria:**

**Given** user viewing active task
**When** clicks checkbox (desktop) or taps task row (mobile)
**Then** task marked complete (isCompleted=true)

**And** visual change immediate: checkbox fills, strikethrough applied, opacity reduced
**And** optimistic update (FR44)
**And** PATCH /api/tasks/:id {isCompleted: true} sent to backend
**And** completedAt timestamp set

**Given** user viewing completed task
**When** clicks checkbox again
**Then** task marked active (isCompleted=false)

**And** visual change immediate: checkbox clears, strikethrough removed, full opacity
**And** completedAt cleared in database

**Given** task completion triggers milestone
**When** completing 5th, 10th, 15th... task
**Then** celebration animation displays (FR41)

**And** positive message: "5 tasks completed! You're building momentum."
**And** dismissible (click/tap to close)

**Prerequisites:** Story 2.2 (task state management)

**Technical Notes:**
- FR11, FR12 (mark complete, unmark)
- FR41 (milestone celebrations)
- Empathy map insight: celebrate meaningful completion
- Animation: subtle confetti or checkmark burst (not annoying)
- Milestone intervals: every 5 completions
- Desktop: checkbox click
- Mobile: tap entire task row OR dedicated checkbox (44×44px target)
- Tests: toggle completion, milestones, animations

---

## Story 2.8: Task Deletion with Confirmation

**As a** user,
**I want** to delete tasks I no longer need,
**So that** my list stays relevant and actionable.

**Acceptance Criteria:**

**Given** user viewing task
**When** clicks delete icon/button or swipes left (mobile)
**Then** confirmation prompt appears:

**And** message: "Delete this task?"
**And** options: "Delete" (danger color), "Cancel"
**And** brief context shown (first 50 chars of task text)

**Given** user confirms deletion
**When** clicks "Delete"
**Then** task deleted via API (DELETE /api/tasks/:id)

**And** optimistic removal from UI
**And** undo toast appears briefly (3 seconds): "Task deleted. [Undo]"
**And** if undo clicked: task restored

**Given** user cancels deletion
**When** clicks "Cancel" or clicks outside modal
**Then** confirmation closes, no deletion

**Prerequisites:** Story 2.2 (task state management)

**Technical Notes:**
- FR10 (delete tasks)
- Desktop: delete icon/button on hover
- Mobile: swipe left reveals delete action (FR46 - swipe gestures)
- Undo mechanism: temporary local cache (3-5 seconds), restore if needed
- Tests: deletion flow, undo, swipe gestures (mobile)

---

## Story 2.9: Responsive Layout - Mobile & Desktop

**As a** user,
**I want** optimal layout for my device,
**So that** experience feels native whether on phone or computer.

**Acceptance Criteria:**

**Given** mobile device (320px-768px width)
**When** viewing task list
**Then** single-column layout

**And** touch-optimized spacing (tasks vertically stacked)
**And** tap targets 44×44px minimum (FR52)
**And** bottom navigation for future features (FR51)
**And** swipe gestures enabled: swipe right = complete, swipe left = delete (FR46)
**And** quick-add input accessible without scrolling

**Given** tablet device (768px-1024px width)
**When** viewing task list
**Then** adaptive layout: single or dual-column based on content density

**Given** desktop device (1024px+ width)
**When** viewing task list
**Then** multi-column layout if space allows (FR50)

**And** sidebar for navigation/settings
**And** keyboard shortcuts emphasized in UI (FR53)
**And** hover states on interactive elements

**Given** any device
**When** resizing viewport
**Then** layout adapts smoothly without breaking

**And** no horizontal scroll (responsive images, text wrapping)

**Prerequisites:** Story 2.4 (task list UI exists)

**Technical Notes:**
- FR48, FR50-52 (responsive, desktop/mobile optimization)
- Empathy map insight: mobile is NOT smaller desktop - distinct patterns
- Tailwind CSS responsive utilities (sm, md, lg, xl)
- Mobile-first CSS approach
- Test on real devices: iPhone SE (small), Pixel (medium), iPad (tablet), desktop
- Tests: responsive breakpoints, touch targets, swipe gestures

---

## Story 2.10: Skeleton Loading States

**As a** user,
**I want** visual feedback during loading,
**So that** I know the app is working (not frozen).

**Acceptance Criteria:**

**Given** user navigating to /tasks
**When** task list loading from API
**Then** skeleton screens display (FR47)

**And** task row placeholders: gray rectangles with shimmer animation
**And** 5-7 skeleton rows shown (realistic list preview)
**And** quick-add input visible (not skeleton)

**Given** individual task operation (edit, complete, delete)
**When** API request in flight
**Then** subtle loading indicator on affected task

**And** spinner icon or opacity change
**And** user can still interact with other tasks (non-blocking)

**Given** API request fails
**When** error occurs
**Then** error state displays (not blank screen)

**And** error message: "Something went wrong. [Retry]"
**And** retry button functional

**Prerequisites:** Story 2.2 (task state management)

**Technical Notes:**
- FR47 (skeleton screens, no blank screens)
- Skeleton component library or custom CSS
- Shimmer animation for polish
- Error boundaries catch render errors
- Tests: loading states, error states, retry behavior

---

## Story 2.11: Background Sync & Offline Queue

**As a** user,
**I want** task operations to work even with spotty network,
**So that** I'm not blocked by connectivity issues.

**Acceptance Criteria:**

**Given** user performs task operation (create/edit/delete)
**When** network request fails (timeout, offline, 500 error)
**Then** operation queued in local storage (FR74)

**And** UI shows "Syncing..." indicator
**And** retry automatically with exponential backoff (1s, 2s, 4s, 8s...)
**And** max 5 retry attempts

**Given** queued operations exist
**When** network restored
**Then** queue processed in order (FIFO)

**And** successful operations removed from queue
**And** failed operations remain for manual retry
**And** user notified: "Synced X tasks"

**Given** operations conflict (e.g., edited on multiple devices)
**When** sync detects conflict
**Then** last-write-wins strategy applied

**And** user notified of conflict resolution

**Given** user reloads page with pending queue
**When** app initializes
**Then** queue reloaded from localStorage

**And** sync resumes automatically

**Prerequisites:** Story 2.2 (task state management)

**Technical Notes:**
- FR74 (background sync)
- Service blueprint insight: critical for mobile reliability
- localStorage for queue persistence
- Exponential backoff algorithm
- Conflict resolution: simple last-write-wins for MVP
- Future: CRDTs or operational transforms for better conflict handling
- Tests: offline operations, queue processing, retry logic, conflicts

---

## Story 2.12: Task Count & List Stats

**As a** user,
**I want** quick visibility into my progress,
**So that** I see momentum building.

**Acceptance Criteria:**

**Given** user has tasks
**When** viewing task list
**Then** stats displayed at top or sidebar:

**And** "X active tasks"
**And** "Y completed today"
**And** "Z completed this week"

**Given** user completes task
**When** task marked complete
**Then** stats update immediately (optimistic)

**Given** stats shown on mobile
**When** viewing on small screen
**Then** condensed stats format: "3 active • 12 done"

**Prerequisites:** Story 2.7 (task completion exists)

**Technical Notes:**
- Computed from task list state (TanStack Query)
- Today/week calculated from completedAt timestamps
- Empathy map insight: progress visibility reduces anxiety
- Tests: stat calculations, real-time updates

---

**Epic 2 Complete: 12 Stories**

All stories deliver standalone value. Baseline todo app fully functional without AI. Foundation for Epic 3.

---
