# Architecture de Mini Cloud Frontend

Ce projet est conçu comme un **monorepo robuste** utilisant [Turborepo](https://turbo.build/) pour gérer l'application principale et les bibliothèques partagées. Cette architecture permet une réutilisation maximale du code et une scalabilité optimale.

## 🏗️ Structure Globale

Le projet est divisé en deux répertoires principaux :

- **`apps/`** : Contient les applications prêtes à être déployées.
    - **`web/`** : L'application principale sous Next.js 16.2 (App Router). C'est ici que se trouve toute l'interface utilisateur et la logique métier frontend.
- **`packages/`** : Contient les bibliothèques partagées entre les applications.
    - `ui/` : Bibliothèque de composants UI partagés.
    - `shared-types/` : Types TypeScript globaux.
    - `api-client/` : SDK pour communiquer avec l'API backend.
    - `auth-sdk/` : Logique d'authentification réutilisable.
    - `eslint-config/`, `typescript-config/` : Configurations de développement partagées.

---

## 🚀 Stack Technique

- **Framework** : [Next.js 16.2](https://nextjs.org/) (App Router, Turbopack).
- **Styling** : [Tailwind CSS v4](https://tailwindcss.com/) (Configuration via CSS pur, pas de `tailwind.config.js`).
- **UI Components** : [shadcn/ui](https://ui.shadcn.com/) (basé sur Radix UI).
- **Gestion de projet** : Turborepo.
- **Langage** : TypeScript (Stricte).

---

## 📂 Organisation de `apps/web`

L'application suit une organisation par **Domaines Métier** (Screaming Architecture) :

### 1. `src/app/` (Next.js App Router)
- Segmente les routes par groupes de parenthèses (ex: `(marketing)`, `(auth)`) pour une meilleure organisation visuelle sans affecter l'URL.
- Domaines principaux : `infra`, `labs`, `deploy`, `account`, `admin`.

### 2. `src/modules/`
C'est le cœur métier. Chaque domaine (ex: `infra`, `labs`) a son propre module contenant :
- `components/` : Composants spécifiques à ce domaine.
- `hooks/`, `services/`, `store/` : Logique d'état et appels API propres au domaine.
- `types/`, `validators/` : Définitions et validations Zod.

### 3. `src/shared/`
Contient tout ce qui est transversal à l'application `web` :
- `components/ui/` : Atomes UI (boutons, inputs) basés sur shadcn.
- `lib/`, `utils/`, `hooks/` : Utilitaires globaux.

### 4. `src/providers/`
Tous les contextes React (Auth, Thème, React Query).

---

## 🎨 Design System & Styling

Nous utilisons **Tailwind CSS v4**. La configuration se fait principalement dans `src/styles/globals.css` :
- Les variables de thèmes sont définies en **OKLCH** pour un rendu de couleur supérieur.
- Les animations personnalisées (`reveal`, `pulse-glow`, etc.) y sont également définies.
- **Convention** : Prioriser l'utilisation des variables de thème (`bg-primary`, `text-foreground`, etc.) plutôt que des couleurs brutes pour supporter le mode sombre nativement.

---

## 📂 Lexique des Répertoires & Fichiers

### 📦 Racine du Projet
- `apps/` : Les applications finales (sites web, tableaux de bord).
- `packages/` : Les bibliothèques partagées (code réutilisable).
- `turbo.json` : Configuration de Turborepo (gestion du cache et des pipelines).
- `package.json` : Dépendances globales et scripts du monorepo.
- `ARCHITECTURE.md` : (Ce fichier) Guide technique de référence.

### 🌐 Application Principale (`apps/web/`)
- `src/app/` : Les routes de l'application (Next.js App Router).
    - `(marketing)/` : Pages publiques (Accueil, Tarifs, etc.).
    - `(auth)/` : Logique de connexion et inscription.
    - `layout.tsx` : Structure globale (Header/Footer).
- `src/modules/` : Logique métier organisée par fonctionnalité.
    - `infra/`, `labs/`, `deploy/` : Dossiers dédiés à chaque univers Mini Cloud.
- `src/shared/` : Code partagé uniquement au sein de l'app `web`.
    - `components/ui/` : Tes composants de base (Boutons, Inputs).
- `src/styles/` : Fichiers CSS.
    - `globals.css` : Le cœur du design (Tailwind v4, variables de thème).
- `src/middleware.ts` : Gestion des redirections et de la sécurité des routes.

### 🧩 Bibliothèques Partagées (`packages/`)
- `ui/` : Un "Storybook-like" contenant les composants graphiques purs.
- `api-client/` : Le seul endroit où l'on définit comment parler au backend.
- `shared-types/` : Tes interfaces TypeScript pour éviter les erreurs de typage entre apps.

---

## 🛠️ Guide du Développeur (Où aller ?)

- **Je veux changer une couleur ou une police** ➔ `apps/web/src/styles/globals.css`
- **Je veux modifier la page d'accueil** ➔ `apps/web/src/app/(marketing)/page.tsx`
- **Je veux créer un nouveau composant réutilisable** ➔ `apps/web/src/shared/components/ui/`
- **Je veux ajouter une nouvelle route/page** ➔ `apps/web/src/app/`
- **Je veux modifier le menu de navigation** ➔ `apps/web/src/app/(marketing)/page.tsx` (Composant `MiniCloudPage`)

---

*Document mis à jour le 10 Mai 2026.*
