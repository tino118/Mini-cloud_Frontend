# Mini Cloud - Frontend Infrastructure

Bienvenue sur le dépôt du frontend de **Mini Cloud**, une plateforme cloud innovante permettant d'héberger des infrastructures, d'accéder à des laboratoires virtuels (EVE-NG, GNS3) et de déployer des solutions expertes.

## 🌟 Points Forts
- **Architecture Monorepo** : Gestion simplifiée du code partagé.
- **Next.js 16.2** : Performance optimale avec le App Router et Turbopack.
- **Tailwind CSS v4** : Un design moderne, fluide et hautement personnalisable.
- **Accessibilité** : Composants basés sur Radix UI.

## 🏗️ Architecture du Projet
Le projet utilise Turborepo pour gérer ses espaces de travail. Pour une compréhension approfondie de l'organisation du code et des choix techniques, veuillez consulter notre documentation dédiée :

👉 **[Consulter ARCHITECTURE.md](./ARCHITECTURE.md)**

## 🚀 Démarrage Rapide

### Prérequis
- Node.js (Version LTS recommandée)
- npm ou pnpm

### Installation
```bash
# Cloner le dépôt
git clone <url-du-depot>

# Installer les dépendances
npm install
```

### Développement
```bash
# Lancer l'environnement de développement
npm run dev
```
L'application sera disponible sur `http://localhost:3000`.

## 📦 Structure du Repo
- `apps/web` : Application Next.js principale.
- `packages/ui` : Bibliothèque de composants partagés.
- `packages/api-client` : Client API TypeScript.
- `packages/shared-types` : Types et interfaces communs.

## 🛠️ Scripts Utiles
- `npm run build` : Compilation pour la production.
- `npm run lint` : Vérification du linting.
- `npm run clean` : Nettoyage des caches Turborepo et Node modules.

---

Développé avec ❤️ par l'équipe Mini Cloud.
