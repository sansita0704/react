# Foodify

![React](https://img.shields.io/badge/React-4FB3D9?style=for-the-badge&logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-BE3A3F?style=for-the-badge&logo=reactrouter&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-6D4AA2?style=for-the-badge&logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-2FA8C7?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-A33A46?style=for-the-badge&logo=jest&logoColor=white)

A React based food-ordering app (Swiggy-style) that uses live restaurant/menu APIs, client-side routing, Redux Toolkit cart state, and Jest tests.

## Features

- Browse restaurant cards with **live search** (filters as you type), a **top-rated** toggle, and **sorting** by rating, delivery time, or cost
- **Offer badges** on restaurant cards (e.g. "50% OFF", "ITEMS AT ₹99")
- View restaurant menu categories with an accordion layout
- **Veg / Non-veg filter** and per-dish veg indicators on the menu
- **Quantity-based cart** — adding a dish again bumps its quantity; adjust with +/- steppers
- **Cart persists across page reloads** (localStorage)
- **Bill details** (item total, delivery fee, GST) with a place-order flow
- Online/offline status indicator with auto-retry when the connection returns
- Lazy-loaded grocery route and a dedicated **404 Not Found** page
- Unit and integration tests with Jest and React Testing Library

## Tech Stack

- React
- Parcel
- React Router
- Redux Toolkit
- Tailwind CSS
- Jest and React Testing Library

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Build for production:

```bash
npm run build
```

Run tests:

```bash
npm test
```

##

> Made with ❤️ by [Sansita Jain](mailto:sansita7406@gmail.com)
