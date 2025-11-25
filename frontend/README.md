
# Livres Gourmands - Frontend

Frontend minimal React (Vite) pour le TP.

## Prérequis
- Node.js 18+ et npm

## Installation & lancement

Ouvrez un terminal PowerShell et tapez :

```powershell
cd chemin/vers/projet_web/frontend
npm install
npm run dev
```

## Notes
- L’URL de base Axios est `/api`. Assurez-vous que l’API backend est disponible au même endroit ou modifiez `src/services/api.js`.
- Le panier est stocké dans le `localStorage` sous la clé `lg_cart`.

## Environnement
Pour utiliser un backend sur une autre adresse, créez un fichier `.env` dans le dossier `frontend` et ajoutez :

```
VITE_API_URL=http://localhost:3000/api
```

Remplacez l’URL par celle de votre backend. Vite expose les variables d’environnement commençant par `VITE_`.

## API mock (sans backend)
Si vous n’avez pas de backend, vous pouvez lancer l’API mock incluse avec `json-server`.

Dans un terminal PowerShell :

```powershell
cd chemin/vers/projet_web/frontend
npx json-server --watch mock/db.json --port 3000
```

Cela démarre un serveur mock sur `http://localhost:3000` exposant `http://localhost:3000/ouvrages`.

Dans un autre terminal, lancez le serveur de développement :

```powershell
cd chemin/vers/projet_web/frontend
npm run dev
```

Le frontend utilise `VITE_API_URL` ou `/api` par défaut. Pour utiliser le mock, mettez `VITE_API_URL=http://localhost:3000` dans `.env` ou modifiez `src/services/api.js` si besoin.

Auteur: Imad Abahmane
        Hicham EL Mallouki