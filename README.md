# TechTicket FP

Aplicación móvil y web reactiva desarrollada con **Ionic Framework** y **Angular Standalone**, implementando arquitectura de estado reactivo mediante **Angular Signals** y despliegue nativo con **Capacitor** para Android.

## Características Técnicas

- **Angular Standalone Components:** Arquitectura moderna y modular sin `NgModules`.
- **Patrón Store / MVVM con Signals:** Gestión centralizada del estado en `TicketService` mediante `signal<TicketState>()` y selectores reactivos `computed()`.
- **Estrategia OnPush:** Optimización de renderizado granular (Zoneless) en `TicketDashboardComponent`.
- **Nuevo Control Flow de Angular:** Uso nativo de `@if`, `@else if`, `@else`, `@for (track ticket.id)` y `@empty`.
- **Integración Nativa Android:** Empaquetado multiplataforma mediante **Capacitor 8**.

## Pila Tecnológica

- **Ionic Framework:** v9 (Componentes UI táctiles y adaptativos)
- **Angular:** v22 Standalone
- **TypeScript:** v5.9+ / v6.0
- **Capacitor:** v8 (Runtime nativo Android)
- **API Externa:** JSONPlaceholder (`https://jsonplaceholder.typicode.com/todos?_limit=15`)

## Instalación y Ejecución

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en entorno de desarrollo:**
   ```bash
   ionic serve
   ```
   *(o `npm start`)*

3. **Compilar para producción:**
   ```bash
   ionic build --prod
   ```

4. **Sincronizar y ejecutar en Android (Capacitor):**
   ```bash
   npx cap sync android
   npx cap open android
   ```
