# Этап 1: Сборка проекта с использованием Node.js
FROM node:18 AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN yarn

# Копируем остальные файлы проекта и выполняем сборку
COPY . .
RUN yarn build

# Этап 2: Сервер для раздачи готовых файлов с использованием Nginx
FROM nginx:alpine

# Удаляем стандартную конфигурацию Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Копируем собранные файлы из предыдущего этапа в папку Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Настраиваем конфигурацию Nginx
COPY config/nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]