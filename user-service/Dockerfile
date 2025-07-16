FROM php:8.2-fpm-alpine

# Instala dependências do sistema, incluindo linux-headers para sockets
RUN apk --no-cache add linux-headers pcre-dev ${PHPIZE_DEPS} \
  && docker-php-ext-install pdo_mysql sockets \
  && pecl install redis \
  && docker-php-ext-enable redis \
  && apk del pcre-dev ${PHPIZE_DEPS}

WORKDIR /app

# Copia apenas os arquivos do composer para instalar dependências
COPY . /app


# Instala o Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instala as dependências do Laravel
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Agora copia o restante do código

RUN chown -R www-data:www-data /app/storage
# Gera a application key do Laravel
RUN php artisan key:generate

EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]


