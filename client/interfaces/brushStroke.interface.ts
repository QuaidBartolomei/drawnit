import { Vector2 } from "@graph-ts/vector2";

export interface BrushStroke {
  color: string;
  size: number;
  positions: Vector2[];
}
