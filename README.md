Link to live demo: https://nextjs-strapi-sepia.vercel.app/

# 🚀 Next.js + Strapi (SSR Hydration Setup)

A modern full-stack setup using:
- ⚡ **Next.js** for full-stack React development
- 🔥 **Strapi** for content and API management
- ⚛️ **Server-side rendering (SSR)** for better SEO and performance
- 🎨 **Tailwind CSS** for modern and responsive UI styling
- 🧠 **TanStack Query** for server state management and API caching
- 🚀 **TanStack Virtualizer** for efficient rendering of large lists and improved scrolling performance
- 🔄 **Server-Sent Events (SSE)** to handle real-time updates and live data streaming
- ✍️ **Tiptap** for customizable rich text editing and content creation
- 💰 **Stripe** for secure online payment processing

---

# 📁 Project Structure
```txt
my-app/
├── frontend/ # Next.js app
│ ├── app/
│ ├── api/
│ ├── components/
│ ├── features/
│ ├── lib/
│ ├── services/
│ ├── types/
│ └── providers/
│
├── backend/ # Strapi CMS
│ ├── src/
│ ├── config/
│ └── api/
```
---

# ⚙️ Tech Stack

## Frontend
- Next.js (App Router)
- TypeScript
- TailwindCSS
- TanStack Query
- TanStack Virtualizer
- Shadcn UI
- TipTap
- Stripe

### Run React Project

```bash
cd frontend
npm run dev
```

## Backend
- Strapi v4+ (on Railway; Migrated from Render)
- PostgreSQL (on Supabase)
- REST API

### Run Strapi Project

```bash
cd backend
npm run dev
```
