# Animation Lab

App móvil hecha con **React Native**, **Expo** y **React Native Reanimated** que reúne 6 ejercicios de animaciones y gestos en una sola aplicación, accesibles desde un **Drawer Navigation** (menú lateral).

## Ejercicios

| # | Pantalla | Qué hace | Técnica |
|---|----------|----------|---------|
| 1 | Drag & Drop | Una figura se arrastra por la pantalla y rota hacia el lado al que se mueve | `usePanGesture`, `interpolate`, `withSpring` |
| 2 | Loading | Al montar, un spinner gira sin parar junto a una barra de progreso animada | `withRepeat`, `withTiming`, `useAnimatedProps` |
| 3 | Multitouch | Zoom, mover y rotar una imagen con varios dedos | `usePanGesture`, `usePinchGesture`, `useRotationGesture`, `useSimultaneousGestures` |
| 4 | Bounce | La figura se encoge al presionar y vuelve a su tamaño con rebote al soltar | `withTiming`, `withSpring` |
| 5 | Carrusel | Tarjetas horizontales con escala, rotación y opacidad según la posición | `Animated.FlatList`, `useAnimatedScrollHandler`, `interpolate` |
| 6 | Shake | La figura se sacude cuando se agita el celular | `expo-sensors` (acelerómetro), `withSequence` |
| 7 | Drawer | Menú lateral para entrar a cada ejercicio por separado | `@react-navigation/drawer` |

## Requisitos

- Node.js 22.13 o superior
- La app **Expo Go** en el celular, o un emulador Android/iOS

## Cómo ejecutarlo

```bash
npm install
npx expo start
```

Escanea el código QR con Expo Go.

Notas de prueba:
- El ejercicio **Shake** necesita un celular real. En emulador, o si el dispositivo no tiene acelerómetro, usa el botón "Probar sin agitar".
- Los gestos de dos dedos del ejercicio **Multitouch** se prueban mejor en un celular real.

## Estructura

```
App.tsx                      Raíz: GestureHandlerRootView + Drawer
assets/gesture-image.png     Imagen del ejercicio Multitouch
src/
  navigation/                Drawer y lista de ejercicios
  screens/                   Una pantalla por ejercicio
  components/                Componentes reutilizables
  theme.ts                   Paleta de colores
```

## Tecnologías

- Expo SDK 58 y React Native 0.88
- react-native-reanimated 4 y react-native-worklets
- react-native-gesture-handler 3
- @react-navigation/native y @react-navigation/drawer
- expo-sensors y expo-haptics
- TypeScript
