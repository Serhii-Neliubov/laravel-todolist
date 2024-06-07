
# Project Setup:
## 1. Clone project from github

## 2. Run backend:
```
cd .\backend\
composer install
php artisan key:generate
php artisan serve
```

## 3. Run frontend:
```
cd .\frontend\
yarn
yarn dev
```

## Notes:
- The backend is running on port 8000.
- The frontend is running on port 5173.
- Usually .env file can't be stored in repository. Since this project is for demonstration purposes, I included it.