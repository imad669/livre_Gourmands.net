# Backend (Node + Express) pour Livres Gourmands

Ce backend utilise MySQL. Il crée une table `ouvrages` et l'alimente à partir du fichier JSON de la maquette front-end si la table est vide.

Prérequis
- Node.js 18+
- Serveur MySQL installé et en cours d'exécution

Installation
1. Copier `.env.example` vers `.env` dans le dossier `backend` et mettre à jour les identifiants de la base de données :

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=your_password
DB_NAME=livresgourmands
PORT=3001
```

2. Créer la base de données (si elle n'existe pas) depuis un client MySQL :

```sql
CREATE DATABASE IF NOT EXISTS livresgourmands CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

3. Installer les dépendances et démarrer le serveur :

```powershell
cd backend
npm install
npm run start
# mode développement avec rechargement automatique
npm run dev
```

Fonctionnalités
- Au démarrage, `src/db.js` vérifie l'existence de la table `ouvrages`.
- Si la table est vide, le script lit `../frontend/mock/db.json` et insère les ouvrages de démonstration.
- Endpoints disponibles :
  - `GET /api/ouvrages` — liste de tous les ouvrages
  - `GET /api/ouvrages/:id` — détail d'un ouvrage

Connexion avec le frontend
- Définir `VITE_API_URL` dans `frontend/.env` pour pointer vers le backend, par exemple :

```
VITE_API_URL=http://localhost:3001
```

- Relancer Vite si nécessaire afin que le frontend utilise l'API MySQL.

Notes
- Vérifier que les identifiants MySQL dans `.env` sont corrects et que la base existe. Si MySQL n'est pas installé, installez-le ou choisissez SQLite.
- L'initialisation des données utilise `frontend/mock/db.json`. Mettez à jour ce fichier pour modifier les données d'exemple.
