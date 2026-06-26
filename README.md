# 🕸️ Dhodduraaj S P - Web-Inspired Developer Portfolio

A modern, high-performance, minimal developer portfolio website built for recruiters, hiring managers, and product-based companies. This project features a play on a Spider-Man theme ("Web-Inspired Developer Portfolio") using original SVG illustrations, web node maps, and swinging micro-animations.

It is designed to be fully cloud-native, stateless, and ready for global production deployments.

---

## 🛠️ Technical Stack
* **Backend**: Java Spring Boot, Spring Data JPA, H2 Database (local), PostgreSQL (production)
* **Frontend**: React (Vite), Axios, Tailwind CSS v4, Framer Motion
* **UX & Design**: 
  - Primary Red (`#E63946`) & Deep Blue (`#1D3557`) palette.
  - Concentric SVG spider web background elements.
  - Connected visual **Web Node Skill Layout** with elastic spring highlights.
  - Pendulum swing micro-animations on badges.
  - Console log easter egg: *"With great power comes great responsibility… to write clean code."*

---

## 🔑 Environment Variables & Configurations

### Backend (Production)
Configure the following environment variables on your cloud container:
* `SPRING_PROFILES_ACTIVE`: `prod` (activates PostgreSQL configuration)
* `DB_URL`: The JDBC connection string (e.g. `jdbc:postgresql://<host>:<port>/<dbname>`)
* `DB_USERNAME`: Database username
* `DB_PASSWORD`: Database password

### Frontend
Configure the following variable during compilation:
* `VITE_API_BASE_URL`: The URL of your deployed Spring Boot REST API (e.g., `https://my-backend-api.up.railway.app`). If left unset, it falls back to `http://localhost:8080` for local developer testing.

---

## 🚀 Deployed System Architecture

```mermaid
graph LR
  subgraph Frontend (Vercel / CDN)
    UI[Vite React + Tailwind CSS]
  end
  subgraph Backend (Railway / Render)
    API[Spring Boot REST API]
  end
  subgraph Database (PostgreSQL Cloud)
    DB[(Cloud Postgres DB)]
  end
  UI -- Axios REST --> API
  API -- Spring JPA --> DB
```

---

## 📦 Deployment Instructions

### Option 1: Railway (Unified Monorepo Deployment)
Railway is ideal for single-platform monorepo hosting.

1. **Database Setup**:
   * Create a new project on Railway.
   * Add a **PostgreSQL** database service.
2. **Backend Service Setup**:
   * Add a new service from your GitHub repository.
   * Set Root Directory to `backend`.
   * Bind the following Environment Variables using Railway's connection references:
     * `SPRING_PROFILES_ACTIVE` = `prod`
     * `DB_URL` = `jdbc:postgresql://${{Postgres.PGHOST}}:${{Postgres.PGPORT}}/${{Postgres.PGDATABASE}}`
     * `DB_USERNAME` = `${{Postgres.PGUSER}}`
     * `DB_PASSWORD` = `${{Postgres.PGPASSWORD}}`
   * Build command: Railway will automatically auto-detect Maven and build the jar. (Standard start command: `java -jar target/portfolio-backend-0.0.1-SNAPSHOT.jar`).
   * Expose the backend port (`8080`) to generate a public domain (e.g., `https://portfolio-backend.up.railway.app`).
3. **Frontend Service Setup**:
   * Add a new service from the same GitHub repository.
   * Set Root Directory to `frontend`.
   * Add the Environment Variable:
     * `VITE_API_BASE_URL` = `<your-backend-railway-domain>`
   * Build command: `npm run build`
   * Start command: `npm run preview -- --port 5173 --host` or standard static routing.

---

### Option 2: Vercel (Frontend) + Render (Backend + Database)
This split-hosting architecture maximizes Vercel's global CDN speed while hosting the backend and database on Render.

#### 1. Setup Database & Backend on Render
1. Create a free-tier **PostgreSQL Database** on Render. Copy the Internal Database URL.
2. Create a new **Web Service** on Render linked to your repository.
3. Configure the service settings:
   * **Root Directory**: `backend`
   * **Build Command**: `./mvnw clean package -DskipTests`
   * **Start Command**: `java -jar target/portfolio-backend-0.0.1-SNAPSHOT.jar`
4. Set the following **Environment Variables**:
   * `SPRING_PROFILES_ACTIVE`: `prod`
   * `DB_URL`: The copied connection string (replace `postgres://` with `jdbc:postgresql://`)
   * `DB_USERNAME`: Database username
   * `DB_PASSWORD`: Database password
5. Copy the backend web service domain (e.g. `https://portfolio-backend.onrender.com`).

#### 2. Deploy Frontend on Vercel
1. Create a new project on **Vercel** linked to your repository.
2. In the project settings, configure:
   * **Root Directory**: `frontend`
   * **Framework Preset**: `Vite`
3. Add the **Environment Variable**:
   * `VITE_API_BASE_URL` = `<your-render-backend-domain-url>`
4. Click **Deploy**. Vercel will build the project and serve it via its global Edge CDN.

---

## 💻 Local Setup & Development

### 1. Run the Backend locally (Default Dev Profile - H2)
By default, the backend starts in `dev` profile using H2 database and pre-seeds candidate profile details.

1. Navigate to `backend`:
   ```bash
   cd backend
   ```
2. Build and launch:
   ```bash
   ..\apache-maven-3.9.6\bin\mvn.cmd spring-boot:run
   ```
   * H2 Console: [http://localhost:8080/h2-console](http://localhost:8080/h2-console) (JDBC: `jdbc:h2:mem:portfoliodb`)
   * API endpoints: `/api/projects`, `/api/skills`, `/api/achievements`.

### 2. Run the Frontend locally
1. Navigate to `frontend`:
   ```bash
   cd frontend
   ```
2. Install & Start Vite:
   ```bash
   npm install
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173).
