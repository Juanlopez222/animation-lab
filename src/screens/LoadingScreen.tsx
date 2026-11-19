import ScreenPlaceholder from '../components/ScreenPlaceholder';

export default function LoadingScreen() {
  return (
    <ScreenPlaceholder
      module={3}
      title="Animación de carga"
      description="Spinner infinito y barra de progreso animada al montar."
    />
  );
}
