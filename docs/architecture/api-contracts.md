# API Contracts

## Authentication Endpoints

**POST /api/auth/signup**
```typescript
// Request
{
  "email": "alex@example.com",
  "password": "SecurePass123!"
}

// Response (200)
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "alex@example.com",
      "createdAt": 1732186200
    },
    "accessToken": "jwt-token"
  }
}
// Sets httpOnly cookie: refreshToken
```

**POST /api/auth/login**
```typescript
// Request
{
  "email": "alex@example.com",
  "password": "SecurePass123!"
}

// Response (200)
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "alex@example.com"
    },
    "accessToken": "jwt-token"
  }
}
```

**POST /api/auth/refresh**
```typescript
// Request (no body, uses httpOnly cookie)

// Response (200)
{
  "success": true,
  "data": {
    "accessToken": "new-jwt-token"
  }
}
// Sets new httpOnly cookie: refreshToken
```

**POST /api/auth/logout**
```typescript
// Request (no body)

// Response (200)
{
  "success": true,
  "data": null
}
// Clears httpOnly cookie
```

## Task Endpoints

**GET /api/tasks**
```typescript
// Query params: ?completed=false

// Response (200)
{
  "success": true,
  "data": {
    "tasks": [
      {
        "id": "uuid",
        "text": "Prepare pitch deck",
        "importance": 9,
        "confidence": 7,
        "isCompleted": false,
        "createdAt": 1732186200,
        "updatedAt": 1732186200
      }
    ]
  }
}
```

**POST /api/tasks**
```typescript
// Request
{
  "text": "Prepare pitch deck",
  "importance": 9,
  "confidence": 7
}

// Response (201)
{
  "success": true,
  "data": {
    "task": {
      "id": "uuid",
      "text": "Prepare pitch deck",
      "importance": 9,
      "confidence": 7,
      "isCompleted": false,
      "createdAt": 1732186200,
      "updatedAt": 1732186200
    }
  }
}
```

**PATCH /api/tasks/:id**
```typescript
// Request
{
  "isCompleted": true
}

// Response (200)
{
  "success": true,
  "data": {
    "task": {
      "id": "uuid",
      "text": "Prepare pitch deck",
      "importance": 9,
      "confidence": 7,
      "isCompleted": true,
      "completedAt": 1732190000,
      "createdAt": 1732186200,
      "updatedAt": 1732190000
    }
  }
}
```

**DELETE /api/tasks/:id**
```typescript
// Response (200)
{
  "success": true,
  "data": null
}
```

## Coaching Endpoints

**POST /api/coaching**
```typescript
// Request
{
  "taskId": "uuid",
  "taskText": "Prepare pitch deck"
}

// Response (200) - Streaming SSE
// Stream of events:
{
  "type": "thinking"
}
{
  "type": "token",
  "data": { "text": "Have " }
}
{
  "type": "token",
  "data": { "text": "you " }
}
...
{
  "type": "complete",
  "data": {
    "response": "Have you validated your key assumptions with potential customers?",
    "latency": 650,
    "cached": false
  }
}
```

---
