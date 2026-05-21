# Bidcom Frontend Challenge

Mini ecommerce construido con Next.js 15, React 19, Clean Architecture y Zustand. Permite buscar productos, agregarlos al carrito, marcarlos como favoritos y simular un flujo de compra completo, consumiendo la API pública de [DummyJSON](https://dummyjson.com).

**Demo en vivo:** [DEPLOY_URL]

---

## Tabla de contenidos

- [Tecnologías](#tecnologías)
- [Cómo correr el proyecto](#cómo-correr-el-proyecto)
- [Tests](#tests)
- [Storybook](#storybook)
- [Arquitectura](#arquitectura)
- [Principios SOLID aplicados](#principios-solid-aplicados)
- [Design System](#design-system)
- [Estrategia de Server Components](#estrategia-de-server-components)
- [Estado del cliente con Zustand](#estado-del-cliente-con-zustand)
- [Flujo de compra](#flujo-de-compra)
- [Estructura de carpetas](#estructura-de-carpetas)
- [Próximos pasos](#próximos-pasos)

---

## Tecnologías

| Nombre | Versión | Propósito |
|---|---|---|
| Next.js | 15.5.18 | Framework principal, App Router, SSR |
| React | 19.1.0 | Librería de UI |
| TypeScript | ^5 | Tipado estático en todas las capas |
| Tailwind CSS | ^4 | Estilos utilitarios con design tokens via `@theme` |
| Zustand | ^5 | Estado global del cliente (carrito, favoritos, auth) |
| Storybook | ^10 | Documentación visual de componentes |
| Vitest | ^2.1.9 | Test runner compatible con el ecosistema Vite |
| Testing Library | ^16.3.2 | Tests de componentes centrados en comportamiento |
| MSW | ^2.14.6 | Mock de APIs HTTP disponible para tests de integración |

---

## Cómo correr el proyecto

### Prerequisitos

- Node.js >= 18
- npm >= 9

### Instalación

```bash
git clone <repo-url>
cd bdcom-challenge
npm install --legacy-peer-deps
```

### Variables de entorno

Crear un archivo `.env.local` en la raíz del proyecto:

```
NEXT_PUBLIC_API_URL=https://dummyjson.com
```

### Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

### Producción

```bash
npm run build
npm run start
```

---

## Tests

```bash
# Correr todos los tests una vez
npm test

# Modo watch durante desarrollo
npm run test:watch
```

### Resultado esperado

```
Test Files  17 passed (17)
Tests       69 passed (69)
```

### Qué se está testeando

- **Use cases** — lógica de negocio aislada de la UI y de la API
- **Componentes** — renderizado correcto, props, interacciones del usuario
- **Utilidades** — funciones puras de `src/lib/utils.ts`

---

## Storybook

```bash
npm run storybook
```

Storybook estará disponible en [http://localhost:6006](http://localhost:6006).

### Stories disponibles

| Componente | Variantes |
|---|---|
| `Button` | Primary, Secondary, Disabled |
| `Badge` | Primary, Secondary, Neutral |
| `Typography` | H1, H2, H3, Body, Caption |
| `EmptyState` | WithCategories, Empty |
| `ProductCard` | Default, WithoutDiscount, LongTitle |

---

## Arquitectura

El proyecto implementa **Clean Architecture** separando el código en capas con dependencias unidireccionales.

```
Dominio → Aplicación → Infraestructura
              ↑
         Presentación
```

### Capas

**`domain/`** — Entidades (`Product`, `Category`) e interfaz de repositorio (`IProductRepository`). No importa nada externo.

**`application/`** — Casos de uso (`SearchProductsUseCase`, `GetProductBySkuUseCase`, `GetCategoriesUseCase`). Orquestan la lógica de negocio usando las interfaces del dominio.

**`infrastructure/`** — `DummyJsonProductRepository` implementa `IProductRepository` con los llamados HTTP a DummyJSON. Un `productRepositoryFactory` centraliza su instanciación.

**`presentation/`** — Componentes React organizados en átomos (`ui/`), componentes de dominio (`product/`, `search/`) y layouts.

**`store/`** — Stores de Zustand para estado del cliente: carrito, favoritos y autenticación.

**`app/`** — Páginas de Next.js. Son el punto de entrada: instancian el repositorio vía factory, lo inyectan en los use cases y pasan el resultado a los componentes.

### Flujo de datos

```
page.tsx
  └── getProductRepository()                  ← factory (infraestructura)
  └── new SearchProductsUseCase(repository)   ← aplicación
  └── await useCase.execute(query)            ← dominio
  └── <ProductGrid products={products} />     ← presentación
```

---

## Principios SOLID aplicados

### S — Single Responsibility

Cada use case tiene exactamente una responsabilidad. `SearchProductsUseCase` solo busca productos. `GetCategoriesUseCase` solo obtiene categorías.

### O — Open/Closed

`IProductRepository` está abierta a extensión pero cerrada a modificación. Para agregar un nuevo proveedor de datos basta con crear una nueva clase que implemente la interfaz.

```typescript
class FirebaseProductRepository implements IProductRepository {
  async search(query: string) { /* implementación propia */ }
}
```

### L — Liskov Substitution

Los tests de use cases pasan un repositorio mock que implementa `IProductRepository`. Los use cases funcionan exactamente igual con el mock que con la implementación real.

### I — Interface Segregation

Los componentes reciben exactamente los datos que necesitan. `ProductCard` recibe un `Product`, no un store global. `EmptyState` recibe `Category[]`, no el objeto de búsqueda completo.

### D — Dependency Inversion

Los use cases dependen de la abstracción `IProductRepository`, no de `DummyJsonProductRepository`. La dependencia concreta se inyecta desde las páginas a través del factory.

```typescript
export class SearchProductsUseCase {
  constructor(private readonly repository: IProductRepository) {}
}
```

---

## Design System

Los estilos están centralizados en `src/app/globals.css` usando la directiva `@theme` de Tailwind CSS v4.

```css
@theme {
  --color-primary:      #0045A5;
  --color-primary-dark: #003080;
  --color-secondary:    #FF6B00;
  --color-neutral-50:   #F9FAFB;
  --color-neutral-100:  #F3F4F6;
  --color-neutral-900:  #111827;
  --font-sans:          'Inter', sans-serif;
  --radius-card:        0.5rem;
  --radius-button:      0.375rem;
}
```

Los componentes usan el componente `Typography` para texto semántico y referencian los tokens por nombre, nunca por valor hardcodeado.

---

## Estrategia de Server Components

### Componentes servidor

| Componente | Motivo |
|---|---|
| `app/page.tsx` | Fetching de productos en servidor |
| `app/search/page.tsx` | Búsqueda SSR con `searchParams` |
| `app/product/[sku]/page.tsx` | Detalle SSR con `params` |
| `Header`, `Container` | Renderizado estructural puro |
| `ProductGrid`, `ProductCard`, `ProductDetail` | Renderizado de datos |
| `EmptyState` | Renderizado de datos |

### Componentes cliente

| Componente | Motivo |
|---|---|
| `SearchBar` | `useState` para el input y `useRouter` para navegar |
| `CartIcon`, `FavoritesIcon` | Lee el store de Zustand |
| `FavoriteButton`, `AddToCartButton` | Escribe en los stores de Zustand |
| `app/cart/page.tsx` | Gestión de estado del carrito |
| `app/favorites/page.tsx` | Lectura del store de favoritos |
| `app/login/page.tsx` | Formulario con estado local |
| `app/checkout/page.tsx` | Lectura de carrito y auth |
| `app/order-success/page.tsx` | Número de orden generado en cliente |

---

## Estado del cliente con Zustand

El estado del cliente se maneja con tres stores de Zustand, todos persistidos en `localStorage` con el middleware `persist`.

### `useCartStore`

Gestiona los items del carrito. Operaciones: `addItem`, `removeItem`, `updateQuantity`, `clearCart`, `totalItems`, `totalPrice`.

### `useFavoritesStore`

Almacena productos completos marcados como favoritos. Operaciones: `toggle`, `isFavorite`.

### `useAuthStore`

Sesión de usuario. Operaciones: `login`, `logout`, `isLoggedIn`.

> Los componentes que leen de Zustand usan el patrón `mounted` para evitar errores de hidratación entre el render del servidor y el estado persistido en `localStorage`.

---

## Flujo de compra

```
/                   → buscar y explorar productos
/search?s=término   → resultados de búsqueda
/product/:sku       → detalle de producto
  └── Agregar al carrito  → useCartStore
  └── ♥ Favorito          → useFavoritesStore
/favorites          → ver productos guardados
/cart               → revisar carrito
  └── Si no logueado → /login
/login              → usuario: usuario@bidcom.com / contraseña: 1234
/checkout           → confirmar compra
/order-success      → confirmación con número de orden
```

---

## Estructura de carpetas

```
src/
├── app/                          # Páginas del App Router de Next.js
│   ├── page.tsx                  # Home — productos destacados
│   ├── search/page.tsx           # Resultados de búsqueda
│   ├── product/[sku]/page.tsx    # Detalle de producto por SKU
│   ├── cart/page.tsx             # Carrito de compras
│   ├── favorites/page.tsx        # Productos favoritos
│   ├── login/page.tsx            # Login (hardcodeado para demo)
│   ├── checkout/page.tsx         # Confirmación de compra
│   ├── order-success/page.tsx    # Pantalla de orden confirmada
│   ├── not-found.tsx             # Página 404 global
│   ├── layout.tsx                # Layout raíz
│   └── globals.css               # Design tokens y estilos base
│
├── domain/
│   ├── entities/                 # Product.ts, Category.ts
│   └── repositories/             # IProductRepository.ts
│
├── application/
│   └── use-cases/                # SearchProducts, GetProductBySku, GetCategories
│
├── infrastructure/
│   └── repositories/             # DummyJsonProductRepository.ts, factory
│
├── presentation/
│   └── components/
│       ├── layout/               # Header, Container
│       ├── product/              # ProductCard, ProductGrid, ProductDetail
│       ├── search/               # SearchBar, EmptyState
│       └── ui/                   # Button, Badge, Typography, BackButton,
│                                 # FavoriteButton, AddToCartButton,
│                                 # CartIcon, FavoritesIcon, ErrorView
│
├── store/                        # Zustand stores
│   ├── useCartStore.ts
│   ├── useFavoritesStore.ts
│   └── useAuthStore.ts
│
└── lib/
    ├── constants.ts              # Variables de entorno y límites
    └── utils.ts                  # formatPrice y helpers
```

---

## Próximos pasos

1. **Paginación** — la API de DummyJSON soporta `limit` y `skip`
2. **Filtros y ordenamiento** — por categoría, rango de precio y rating
3. **Tests de stores** — tests unitarios para los stores de Zustand
4. **Auth real** — reemplazar el login hardcodeado por NextAuth.js
