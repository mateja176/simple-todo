# Project Initialization

**Monorepo Setup:**

```bash
# Create monorepo root
mkdir simple-todo && cd simple-todo
pnpm init

# Install monorepo tools
pnpm add -D turbo @typescript/native-preview

# Create workspace structure
lint-configkdir -p apps/web apps/api packages/types packages/validation packages/typescript-config packages/lint-config
```

**Frontend (Next.js 16.0.3 App Router):**

```bash
cd apps
npx create-next-app@latest web --typescript --tailwind --app --src-dir --import-alias "@/*"
# Replace typescript with native preview
cd web
pnpm remove typescript
pnpm add -D @typescript/native-preview
```

**Backend (Hono):**

```bash
cd apps/api
pnpm init
pnpm add hono @hono/node-server zod
pnpm add -D @typescript/native-preview @types/node tsx nodemon drizzle-orm drizzle-kit postgres
pnpm add -D @anthropic-ai/sdk node-cache pino bcrypt jsonwebtoken
```

**Shared Packages:**

```bash
# Types package
cd packages/types
pnpm init
pnpm add -D @typescript/native-preview

# Validation package
cd packages/validation
pnpm init
pnpm add zod
pnpm add -D @typescript/native-preview
```

**Configuration Files:**

`pnpm-workspace.yaml`:

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

`turbo.json`:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["^build"]
    },
    "lint": {}
  }
}
```
