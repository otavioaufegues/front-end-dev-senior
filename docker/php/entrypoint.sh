#!/usr/bin/env sh
set -e

cd /var/www/html

echo "[entrypoint] waiting for db..."
until php -r 'try { new PDO("pgsql:host=".$_ENV["DB_HOST"].";port=".$_ENV["DB_PORT"].";dbname=".$_ENV["DB_DATABASE"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"]); echo "db ok\n"; } catch (Throwable $e) { exit(1); }'; do
  sleep 2
done

if [ ! -f .env ]; then
  echo "[entrypoint] .env missing, copying from .env.example"
  cp .env.example .env
fi

if [ ! -d vendor ]; then
  echo "[entrypoint] installing composer deps..."
  composer install --no-interaction --prefer-dist
fi

php artisan key:generate --force || true

echo "[entrypoint] migrating..."
php artisan migrate --force
php artisan db:seed --force

echo "[entrypoint] starting php-fpm..."
exec php-fpm
