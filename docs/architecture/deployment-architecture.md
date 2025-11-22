# Deployment Architecture

## Frontend (Vercel)

- Deploy from `apps/web`
- Environment variables via Vercel dashboard
- Edge CDN globally
- Automatic HTTPS
- Preview deployments per PR
- Production: simple-todo.vercel.app

## Backend (Railway)

- Deploy from `apps/api`
- PostgreSQL addon (same project)
- Environment variables via Railway dashboard
- Automatic TLS
- Usage-based pricing
- Production: api.simple-todo.railway.app

## Database (Railway PostgreSQL)

- Managed PostgreSQL 17
- Automatic backups
- Connection pooling
- Monitoring included

## Environment Variables

**Frontend (.env.local):**
```bash
NEXT_PUBLIC_API_URL=https://api.simple-todo.railway.app
```

**Backend (.env):**
```bash
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=random-secret-key
JWT_REFRESH_SECRET=random-refresh-secret
ANTHROPIC_API_KEY=sk-ant-...
NODE_ENV=production
```

---
