# Livres Gourmands - Guide de lancement

Ce dépôt contient un frontend React (Vite) et un backend Node/Express. Suivez les étapes ci-dessous pour installer les dépendances, configurer l'environnement et lancer l'application complète.

## 1. Prérequis généraux
- Node.js 18 ou version ultérieure (npm est inclus)
- PowerShell (inclus avec Windows)
- Optionnel pour le backend : serveur MySQL local opérationnel

## 2. Récupération du code
Clonez ou téléchargez ce dépôt, puis ouvrez un terminal PowerShell et placez-vous à la racine du projet :

```powershell
cd C:\Users\<votre_nom>\Desktop\livre_Gourmands.net```

Adaptez le chemin si vous avez stocké le projet ailleurs.

## 3. Lancer uniquement le frontend (mode développement)
1. Ouvrez un premier terminal PowerShell.
2. Installez les dépendances puis lancez Vite :

```powershell
cd frontend
npm install
npm run dev
```

3. Vite affichera une URL locale (par défaut `http://localhost:5173`). Ouvrez-la dans votre navigateur. Si vous souhaitez pointer vers un backend différent, créez `frontend/.env` et définissez `VITE_API_URL` (voir section 5).

## 4. Lancer le backend Node/Express
1. Ouvrez un second terminal PowerShell.
2. Placez-vous dans le dossier backend :

```powershell
cd backend
npm install
```

3. Copiez `backend/.env.example` vers `backend/.env` et mettez à jour les paramètres MySQL :
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=votre_mot_de_passe
DB_NAME=livresgourmands
PORT=3001
```
4. Vérifiez que la base `livresgourmands` existe. Exemple de commande MySQL :

```sql
CREATE DATABASE IF NOT EXISTS livresgourmands CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

5. Lancez le serveur backend :

```powershell
npm run dev
```

Le backend démarre sur `http://localhost:3001`. Il expose notamment `GET /api/ouvrages`.

## 5. Relier le frontend au backend
Le frontend utilise les variables d'environnement Vite commençant par `VITE_`. Pour pointer vers le backend local :

```
# frontend/.env
VITE_API_URL=http://localhost:3001
```

Redémarrez le serveur Vite après toute modification de `.env`.

## 6. Utiliser l'API mock (optionnel)
Si vous ne pouvez pas lancer MySQL, vous pouvez utiliser `json-server` :

1. Ouvrez un terminal dans `frontend` :

```powershell
cd frontend
npx json-server --watch mock/db.json --port 3000
```

2. Dans un autre terminal frontend, définissez `VITE_API_URL` sur `http://localhost:3000` puis relancez `npm run dev`.

## 7. Arrêt et tâches courantes
- Pour stopper un serveur lancé avec `npm run dev`, revenez sur le terminal correspondant et pressez `Ctrl+C`.
- Pour installer de nouvelles dépendances : `npm install <package>` dans le dossier concerné.
- Pour vérifier les vulnérabilités npm : `npm audit`.

## 8. Dépannage rapide
- **Erreur `ENOENT` concernant `package.json`** : assurez-vous d'être dans le bon dossier (`frontend` ou `backend`) avant d'exécuter `npm run ...`.
- **Backend inaccessible** : vérifiez MySQL, le contenu de `backend/.env` et les logs du terminal.
- **Frontend ne trouve pas l'API** : contrôlez `VITE_API_URL` et redémarrez Vite.

Vous devriez maintenant pouvoir lancer l'application complète en démarrant le backend puis le frontend et en ouvrant `http://localhost:5173` dans votre navigateur.
