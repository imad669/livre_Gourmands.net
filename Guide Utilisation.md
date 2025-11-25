# Guide d'utilisation

Ce guide résume les étapes indispensables pour lancer **Livres Gourmands** en local sans rencontrer de problème d'ouvrages vides.

## 1. Prérequis
- Node.js 18 ou supérieur
- MySQL Server en cours d'exécution
- PowerShell (inclus avec Windows)

## 2. Préparer la base de données
1. Se connecter à MySQL et créer la base :

   ```sql
   CREATE DATABASE IF NOT EXISTS livresgourmands CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. Vérifier ou ajuster le fichier `backend/.env` :

   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASS=VotreMotDePasse
   DB_NAME=livresgourmands
   PORT=3000
   ```

3. Lors du premier démarrage, le backend crée automatiquement la table `ouvrages` et la remplit à partir de `frontend/mock/db.json` si elle est vide. Si vous changez ces données, relancez le backend pour recharger le contenu.

## 3. Installer les dépendances
Dans PowerShell, exécuter :

```powershell
cd c:\Users\abahm\Desktop\TP_Web_GatsroLivres\projet_web\projet_web\backend
npm install

cd ..\frontend
npm install
```

## 4. Lancer le backend
Toujours depuis PowerShell :

```powershell
npm --prefix "c:\Users\abahm\Desktop\TP_Web_GatsroLivres\projet_web\projet_web\backend" run dev
```

- Le serveur doit afficher `Backend listening on http://localhost:3000`.
- Pour vérifier que les ouvrages sont chargés, exécuter :

  ```powershell
  Invoke-RestMethod -Uri "http://localhost:3000/api/ouvrages"
  ```

  Vous devez obtenir une liste JSON d'ouvrages. Si le résultat est vide, vérifiez que la table `ouvrages` n'est pas déjà remplie avec de mauvaises données et que le fichier `frontend/mock/db.json` contient bien une propriété `ouvrages`.

## 5. Lancer le frontend
Dans un nouveau terminal PowerShell :

```powershell
npm --prefix "c:\Users\abahm\Desktop\TP_Web_GatsroLivres\projet_web\projet_web\frontend" run dev -- --host
```

- L'application Vite est disponible sur `http://localhost:5173/`.
- Assurez-vous que `frontend/.env` contient :

  ```env
  VITE_API_URL=http://localhost:3000/api
  ```

## 6. Résolution des problèmes courants
- **Aucun ouvrage dans l'interface** :
  - Vérifiez l'API avec `Invoke-RestMethod` pour confirmer que le backend renvoie des données.
  - Si la table `ouvrages` est vide, supprimez-la ou videz-la puis redémarrez le backend afin qu'il recharge les données de `frontend/mock/db.json`.
- **Erreur de connexion MySQL** :
  - Confirmez les identifiants dans `backend/.env` et que le serveur MySQL est démarré.
- **Ports occupés** :
  - Assurez-vous qu'aucune autre application n'utilise les ports `3000` (backend) ou `5173` (frontend).

## 7. Arrêter les serveurs
Dans chaque terminal, pressez `Ctrl+C`. Relancez les commandes `npm run dev` (backend) et `npm run dev -- --host` (frontend) pour redémarrer.

---
Ce guide couvre la procédure complète pour démarrer l'application et vérifier que les ouvrages sont bien disponibles côté frontend.
auteur: Imad Abahmane
         Hicham el Mallouki
         