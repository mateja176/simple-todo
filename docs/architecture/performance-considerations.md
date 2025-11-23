# Performance Considerations

## Caching Strategy

**Tier 1: In-Memory (node-cache)**

- Coaching responses: 1 hour TTL
- User goals: 5 min TTL
- Persona signals: 10 min TTL
- Hit rate target: 60%

**Tier 2: Redis (Optional)**

- Shared cache across backend instances
- Same data as Tier 1
- Longer TTLs (24 hours)
- Scaling beyond single instance

## Query Optimization

- Indexed foreign keys
- Composite indexes for common filters
- Pagination for large result sets
- Connection pooling (Drizzle)

## Bundle Optimization

- Code splitting (Next.js automatic)
- Tree-shaking (Vite/Next.js)
- Image optimization (Next.js Image)
- Font optimization (Next.js Font)
- RSC reduces client bundle

## Latency Targets

- Task CRUD: <100ms perceived (optimistic UI)
- AI Coaching: <800ms hard limit (caching + streaming)
- Page load TTI: <3s on 3G
- FCP: <1.5s

---
