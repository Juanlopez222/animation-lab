# Animation Lab

App móvil con **React Native Reanimated + Expo** que reúne 6 ejercicios de animaciones y gestos, accesibles desde un **Drawer Navigation**.

## Ejercicios

| # | Ejercicio | Estado |
|---|-----------|--------|
| 1 | Drag & Drop con rotación | Módulo 2 ✅ |
| 2 | Loading (spinner + barra de progreso) | Módulo 3 |
| 3 | Gestos multitouch (zoom, mover, rotar) | Módulo 3 |
| 4 | Bounce al presionar | Módulo 2 ✅ |
| 5 | Carrusel animado | Módulo 3 |
| 6 | Animación con acelerómetro (shake) | Módulo 4 |
| 7 | Drawer Navigation | Módulo 1 ✅ |

## Cómo ejecutarlo

```bash
npm install
npx expo start
```

Escanea el QR con **Expo Go** en tu celular (el acelerómetro solo funciona en un dispositivo real).

## Estructura

```
App.tsx                      # raíz: GestureHandlerRootView + Drawer
src/
  navigation/                # Drawer y lista de ejercicios
  screens/                   # una pantalla por ejercicio
  components/                # componentes reutilizables
  theme.ts                   # colores
```
