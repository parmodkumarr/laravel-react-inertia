1. Install PHP dependencies:
```bash
composer install
```

2. Install JavaScript dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Generate application key:
```bash
php artisan key:generate
```

5. Configure your database in `.env` file:
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

6. Also configure mailtrap or any smtp in `.env`:

```env
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=5abc751*******
MAIL_PASSWORD=91585d2*******
```

7. Run migrations:
```bash
php artisan migrate --seed
```

9. Build assets:
```bash
npm run dev
```

10. Start the development server:
```bash
php artisan serve
```
