import type { ComponentType } from 'react';
import DragDropScreen from '../screens/DragDropScreen';
import LoadingScreen from '../screens/LoadingScreen';
import MultitouchScreen from '../screens/MultitouchScreen';
import BounceScreen from '../screens/BounceScreen';
import CarouselScreen from '../screens/CarouselScreen';
import ShakeScreen from '../screens/ShakeScreen';

export type Exercise = {
  name: string;
  label: string;
  icon: string;
  description: string;
  component: ComponentType;
};

export const exercises: Exercise[] = [
  {
    name: 'DragDrop',
    label: 'Drag & Drop',
    icon: '',
    description: 'Arrastra una figura; rota hacia el lado al que la mueves.',
    component: DragDropScreen,
  },
  {
    name: 'Loading',
    label: 'Loading',
    icon: '',
    description: 'Spinner infinito con barra de progreso animada.',
    component: LoadingScreen,
  },
  {
    name: 'Multitouch',
    label: 'Multitouch',
    icon: '',
    description: 'Zoom, mover y rotar una imagen con los dedos.',
    component: MultitouchScreen,
  },
  {
    name: 'Bounce',
    label: 'Bounce',
    icon: '',
    description: 'Se encoge al presionar y rebota al soltar.',
    component: BounceScreen,
  },
  {
    name: 'Carousel',
    label: 'Carrusel',
    icon: '',
    description: 'Tarjetas con escala, rotación y transiciones animadas.',
    component: CarouselScreen,
  },
  {
    name: 'Shake',
    label: 'Shake',
    icon: '',
    description: 'Agita el celular y la figura se sacude (acelerómetro).',
    component: ShakeScreen,
  },
];
