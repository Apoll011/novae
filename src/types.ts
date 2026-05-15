export type DeskObjectConfig = {
  id: string;
  src: string;
  alt: string;

  initialX: number;
  initialY: number;
  initialRotation: number;

  repulsionRadius: number;
  repulsionStrength: number;

  mass: number;
  friction: number;

  zIndex?: number;
};