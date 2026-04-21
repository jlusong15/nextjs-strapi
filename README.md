Link to live demo: https://nextjs-strapi-sepia.vercel.app/

# 🚀 Next.js + Strapi (SSR Hydration Setup)

A modern full-stack setup using:
- ⚡ Next.js (App Router)
- 🔥 Strapi (Headless CMS)
- 🧠 Redux Toolkit + RTK Query
- ⚛️ Server-side rendering (SSR)
- 🎯 Client-side hydration (RTK Query cache)
- 🎨 TailwindCSS
- 🧩 Zustand-ready structure (optional UI state)

---

# 📁 Project Structure
```txt
my-app/
├── frontend/ # Next.js app
│ ├── app/
│ ├── api/
│ ├── store/
│ │ ├── slices/
│ │ ├── hooks.ts # Redux Hooks
│ │ ├── index.ts # Redux Store
│ │ ├── tagType.ts # Redux Store
│ ├── components/
│ ├── lib/
│ ├── services/
│ ├── types/
│ └── providers.tsx
│
├── backend/ # Strapi CMS
│ ├── src/
│ ├── config/
│ └── api/
```
---

# ⚙️ Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- TailwindCSS
- Redux Toolkit
- RTK Query
- Shadcn UI

### Backend
- Strapi v4+
- REST API

---

# 🔌 Backend Setup (Strapi)

## Run Strapi Project

```bash
cd backend
npm run develop
