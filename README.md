# Slide Carousel

SPA с имитацией аутентификации и каруселью слайдов.

React 18+/TypeScript strict, Vite, Mantine, Embla Carousel, Zustand, React Router. Архитектура - Feature-Sliced Design.

## Стек

- React 18+ / TypeScript
- Vite
- Mantine (UI)
- Embla Carousel
- Zustand
- React Router (HashRouter - для совместимости со статическим хостингом GitHub Pages)

## Функциональность

- `/login` - имитация аутентификации: email + пароль (мин. 3 символа), токен в localStorage,
  редиректы для авторизованных/неавторизованных пользователей, выход по кнопке.
- `/` - карусель слайдов (title, annotation, isChecked): навигация стрелками и пагинацией, добавление через 
  модальное окно (title обязателен), удаление через модальное окно подтверждения, персистентность в localStorage.

## Архитектура (FSD)

```
src/
  app/        - провайдеры, роутинг, глобальные стили
  pages/      - LoginPage, HomePage
  widgets/    - Header, SlideCarousel
  features/   - login-form, logout, add-slide, delete-slide
  entities/   - session (токен), slide (модель слайда)
  shared/     - конфиг, утилиты (localStorage)
```

## Запуск

```bash
npm install
npm run dev
```

## Сборка и деплой на GitHub Pages

```bash
npm run build
```

Деплой выполняется автоматически через GitHub Actions (`.github/workflows/deploy.yml`) при пуше в `main`. `base` в `vite.config.ts` должен соответствовать имени репозитория.
