# Consistency Rules

## State Management

**Zustand Stores:**

- One store per domain (`useTaskStore`, `useAuthStore`)
- Flat structure (no nesting)
- Actions return promises

**TanStack Query:**

- Query keys: array format `['tasks', userId]`
- Mutations invalidate related queries
- Optimistic updates for instant feedback

## Component Patterns

**Page Components:**

```typescript
// app/(dashboard)/tasks/page.tsx
export default function TasksPage() {
  // Server Component by default
}
```

**Client Components:**

```typescript
"use client";

export function TaskCard({ task }: { task: Task }) {
  // Interactive component
}
```

**Async Data Loading:**

```typescript
// Use TanStack Query, not useEffect
const { data, isLoading } = useQuery({
  queryKey: ["tasks", userId],
  queryFn: fetchTasks,
});
```

---
