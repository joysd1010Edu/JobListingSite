# QuickHire - Backend API

Express.js REST API with MongoDB, JWT authentication, and input validation. Follows MVC architecture.

## Setup

```bash
npm install
npm run dev
```

`npm run dev` uses `node --watch` for auto-restart on changes.

## Environment Variables (`backend/.env`)

```env
PORT=5000
NODE_ENV=development

MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/quickhire?retryWrites=true&w=majority&appName=Cluster0
DB_PASS=your_database_password

JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

ADMIN_EMAIL=admin@quickhire.com
ADMIN_PASSWORD=admin123
ADMIN_NAME=Admin User

CLIENT_URL=http://localhost:3000
```

The admin account is auto-created on first startup using the `ADMIN_*` values.

## Folder Structure

```
backend/
  config/
    db.js             # MongoDB connection
    seed.js           # Seeds default admin on startup
  controllers/
    authController.js # Signup, login, token verification
    jobController.js  # Job CRUD, apply, admin listing
  middleware/
    auth.js           # JWT verification, role guards
    validate.js       # express-validator rules
  models/
    User.js           # User schema
    Job.js            # Job schema with embedded applications
  routes/
    authRoutes.js     # Auth endpoints
    jobRoutes.js      # Job endpoints
  index.js            # Server entry point
```

## Request Lifecycle

```
Request -> Router -> Middleware (auth, validation) -> Controller -> Model -> Response
```

## Database Models

### User

| Field    | Type   | Notes                              |
|----------|--------|------------------------------------|
| name     | String | 2-50 chars                         |
| email    | String | Unique, lowercase                  |
| password | String | Min 6 chars, bcrypt hashed         |
| role     | String | `"user"` or `"admin"`, default `"user"` |

Password is hashed via `pre("save")` hook. The `toJSON` method strips the password from responses.

### Job

| Field          | Type     | Notes                                              |
|----------------|----------|----------------------------------------------------|
| title          | String   | 3-100 chars                                        |
| company        | String   | 2-100 chars                                        |
| location       | String   | 2-100 chars                                        |
| type           | String   | Full-Time, Part-Time, Contract, Remote, Internship |
| category       | String   | Design, Sales, Marketing, Finance, Technology, Engineering, Business, Human Resource |
| description    | String   | 20-5000 chars                                      |
| requirements   | String   | Optional, max 5000 chars                           |
| skills         | String   | Optional, max 2000 chars                           |
| education      | String   | Optional, max 2000 chars                           |
| benefits       | String   | Optional, max 5000 chars                           |
| companyDetails | String   | Optional, max 5000 chars                           |
| salary         | String   | 3-50 chars                                         |
| tags           | [String] | At least one required                              |
| postedDate     | Date     | Defaults to now                                    |
| postedBy       | ObjectId | Ref to User                                        |
| applicants     | [Object] | Embedded applications (see below)                  |

**Embedded Application:**

| Field       | Type     | Notes                    |
|-------------|----------|--------------------------|
| userId      | ObjectId | Ref to applying User     |
| name        | String   | 2-100 chars              |
| email       | String   | Valid email              |
| resumeLink  | String   | Valid http/https URL     |
| coverNote   | String   | 10-2000 chars            |
| appliedDate | Date     | Defaults to now          |

Virtual field `applicantCount` returns `applicants.length`.

## API Endpoints

### Auth (`/api/auth`)

| Method | Route             | Access  | Description          |
|--------|-------------------|---------|----------------------|
| POST   | `/api/auth/signup` | Public  | Register new user    |
| POST   | `/api/auth/login`  | Public  | Login, get JWT token |
| GET    | `/api/auth/me`     | Private | Get current user     |

**POST /api/auth/signup**

```json
// Request
{ "name": "John Doe", "email": "john@example.com", "password": "mypassword123" }

// Response 201
{
  "success": true,
  "data": {
    "user": { "id": "...", "name": "John Doe", "email": "john@example.com", "role": "user" },
    "token": "eyJhbGci..."
  }
}
```

**POST /api/auth/login**

```json
// Request
{ "email": "john@example.com", "password": "mypassword123" }

// Response 200 (same shape as signup response)
```

**GET /api/auth/me** -- Requires `Authorization: Bearer <token>`

```json
// Response 200
{
  "success": true,
  "data": {
    "user": { "id": "...", "name": "John Doe", "email": "john@example.com", "role": "user" }
  }
}
```

### Jobs (`/api/jobs`)

| Method | Route                 | Access     | Description                        |
|--------|-----------------------|------------|------------------------------------|
| GET    | `/api/jobs`           | Public     | List all jobs (no applicant data)  |
| GET    | `/api/jobs/:id`       | Public     | Get single job                     |
| POST   | `/api/jobs`           | Admin only | Create job listing                 |
| DELETE | `/api/jobs/:id`       | Admin only | Delete job listing                 |
| POST   | `/api/jobs/:id/apply` | User only  | Apply to a job                     |
| GET    | `/api/jobs/admin/all` | Admin only | List jobs with applicant data      |

**GET /api/jobs**

```json
// Response 200
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": "...",
      "title": "Senior Frontend Developer",
      "company": "TechFlow Inc.",
      "location": "Berlin, Germany",
      "type": "Full-Time",
      "category": "Technology",
      "salary": "$75,000 - $95,000",
      "tags": ["Technology", "Developer"],
      "postedDate": "2026-02-28"
    }
  ]
}
```

**POST /api/jobs** (Admin only) -- Requires `Authorization: Bearer <admin_token>`

```json
// Request
{
  "title": "Senior Frontend Developer",
  "company": "TechFlow Inc.",
  "location": "Berlin, Germany",
  "type": "Full-Time",
  "category": "Technology",
  "description": "We are looking for...",
  "salary": "$75,000 - $95,000",
  "tags": ["Technology", "Developer"]
}
```

Optional fields: `requirements`, `skills`, `education`, `benefits`, `companyDetails`.

**POST /api/jobs/:id/apply** (User only) -- Requires `Authorization: Bearer <user_token>`

```json
// Request
{
  "name": "John Doe",
  "email": "john@example.com",
  "resumeLink": "https://resume.io/john-doe",
  "coverNote": "I am excited to apply for this position..."
}

// Response 201
{ "success": true, "message": "Application submitted for Senior Frontend Developer at TechFlow Inc.!" }
```

Duplicate applications from the same user are blocked (returns 400).

**GET /api/jobs/admin/all** -- Same as `GET /api/jobs` but includes `applicants` array and `applicantCount` per job.

## Middleware

### `auth`

Extracts Bearer token from `Authorization` header, verifies JWT, attaches user to `req.user`. Returns 401 if missing/invalid/expired.

### `adminOnly`

Checks `req.user.role === "admin"`. Returns 403 otherwise.

### `userOnly`

Checks `req.user.role === "user"`. Returns 403 otherwise. Prevents admins from applying to jobs.

### Validation (`validate.js`)

All input validation uses express-validator chains:

| Chain                 | Validates                                     |
|-----------------------|-----------------------------------------------|
| `validateSignup`      | name, email, password                         |
| `validateLogin`       | email, password                               |
| `validateJob`         | All job fields with length/enum constraints   |
| `validateApplication` | name, email, resumeLink (URL), coverNote, job ID |
| `validateMongoId`     | Route param is valid MongoDB ObjectId         |

## Error Responses

All errors follow this shape:

```json
{ "success": false, "message": "Error description" }
```

Validation errors include field-level detail:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Please enter a valid email" }
  ]
}
```

Status codes: 200 success, 201 created, 400 bad input, 401 auth failure, 403 forbidden, 404 not found, 500 server error.

## Authentication Flow

1. User signs up or logs in -> server returns JWT token
2. Frontend stores token in `localStorage` as `accessToken`
3. Token sent as `Authorization: Bearer <token>` on every request
4. `auth` middleware verifies token, loads user from DB
5. Role middleware (`adminOnly`/`userOnly`) checks permissions
6. Tokens expire after 7 days (configurable via `JWT_EXPIRES_IN`)
