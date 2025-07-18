FROM php:8.2-fpm-alpine

RUN apk --no-cache add linux-headers pcre-dev ${PHPIZE_DEPS} \
  && docker-php-ext-install pdo_mysql sockets \
  && pecl install redis \
  && docker-php-ext-enable redis \
  && apk del pcre-dev ${PHPIZE_DEPS}

WORKDIR /app
COPY .env.example /app/.env
COPY . /app
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-interaction --prefer-dist --optimize-autoloader
RUN chown -R www-data:www-data /app/storage
RUN php artisan key:generate

EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]


