# AI Rules & Coding Standards

## Tech Stack

- **Frontend Core**: React 18, TypeScript, Vite.
- **Styling**: Tailwind CSS (with `tailwindcss-animate`), CSS Modules (only for complex animations).
- **UI Components**: shadcn/ui (Radix UI primitives), generic Tailwind components.
- **Backend/Database**: Supabase (PostgreSQL, Auth, Edge Functions, Database Functions/RPCs).
- **State Management**: TanStack Query (React Query) for server state; React Context for global app state (Auth, Sound, Language).
- **Routing**: React Router DOM v6.
- **Forms**: React Hook Form + Zod validation.
- **Data Visualization**: Recharts.
- **Utilities**: date-fns (dates), lucide-react (icons), sonner/toast (notifications).

## Library Usage & Coding Rules

### 1. UI & Styling
- **Tailwind First**: Always use Tailwind CSS utility classes for styling. Avoid creating new `.css` files unless strictly necessary for complex animations (like `src/index.css`).
- **shadcn/ui**: Use pre-existing components in `@/components/ui/` whenever possible. Do not install new UI libraries if a shadcn primitive can solve the problem.
- **Responsiveness**: Always build mobile-first. Use `md:`, `lg:`, `xl:` prefixes for larger screens.
- **Icons**: Use `lucide-react` for all icons.

### 2. State Management & Data Fetching
- **Server State**: Use **TanStack Query** (`useQuery`, `useMutation`) for all database interactions.
  - Utilize `queryKey` factories or consistent naming (e.g., `['user-rentals', userId]`) to ensure proper cache invalidation.
- **Global State**: Use specific contexts provided in the codebase:
  - `useAuth()` for user session and profile data.
  - `usePlatformConfig()` for system-wide settings (fees, feature flags).
  - `useLanguage()` for i18n.
  - `useSound()` for audio effects.

### 3. Database & Backend Interactions
- **Supabase Client**: Import the typed client from `@/integrations/supabase/client`.
- **RPCs over Raw Queries**: For complex operations, financial transactions, or logic requiring atomicity (e.g., purchasing a robot, processing withdrawals), **ALWAYS** use Supabase RPCs (Database Functions). Do not write complex transaction logic in the frontend.
  - Example: Use `rpc('purchase_robot_safe')` instead of chaining multiple `insert/update` calls.
- **Single Source of Truth**: When reading critical user data (balances, team structure), rely on specialized hooks like `useTeamSnapshot`, `useWalletBalance`, or `useConsistentMiningPower` which fetch authoritative data from the backend.

### 4. Authentication & Permissions
- **Auth Hook**: Access user data exclusively through `useAuth()`.
- **Observer Mode**: Always check `useObserver()` before allowing write actions (POST/PUT/DELETE). If `isObserver` is true, disable action buttons and show a tooltip.
- **Profile Linking**: Ensure `profile.user_id` matches `auth.user.id`.

### 5. Internationalization (i18n)
- **Translations**: Use the `useTranslation()` hook. Avoid hardcoding text strings in the UI.
- **Keys**: Add new keys to `src/i18n/it.json` and `src/i18n/en.json`.

### 6. Project Structure
- **Pages**: `src/pages/` (Route components).
- **Components**: `src/components/` (Reusable UI parts).
- **Hooks**: `src/hooks/` (Custom logic and data fetching).
- **Lib**: `src/lib/` (Utilities, helper functions).
- **Supabase Types**: `src/integrations/supabase/types.ts` (Auto-generated, do not edit manually).

### 7. Form Handling
- Use `react-hook-form` for form state management.
- Use `zod` for schema validation.