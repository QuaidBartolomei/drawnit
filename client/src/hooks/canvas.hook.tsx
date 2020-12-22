import { useRoomState } from 'contexts/room.context';
import { BrushStroke } from 'interfaces/brushStroke.interface';

export function useCanvas() {
  const room = useRoomState();
  const ref = room.canvasRef;
  const canvas = ref.current;
  if (!canvas)
    return {
      drawBrushStroke: () => {},
      getImageString: () => {},
      loadCanvasImage: () => {},
      setCanvasSize: () => {},
    };

  const canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D;

  return {
    drawBrushStroke: (brushStroke: Partial<BrushStroke>) => {
      const positions = brushStroke.positions || [];
      const color = brushStroke.color || 'red';
      const size = brushStroke.size || 3;
      canvasContext.lineJoin = 'round';
      if (positions.length < 1) return;
      canvasContext.beginPath();
      canvasContext.moveTo(positions[0].x, positions[0].y);
      canvasContext.strokeStyle = color;
      canvasContext.lineWidth = size;
      for (let position of positions) {
        canvasContext.lineTo(position.x, position.y);
        canvasContext.moveTo(position.x, position.y);
      }
      canvasContext.closePath();
      canvasContext.stroke();
    },
    getImageString: (): string => {
      let image = canvas.toDataURL();
      return JSON.stringify(image);
    },
    loadCanvasImage: (image: HTMLImageElement) => {
      console.log('loading image');
      
      canvasContext.drawImage(image, 0, 0);
    },
    setCanvasSize: (width: number, height: number) => {
      if (!canvas) return;
      canvas.width = Number(width);
      canvas.height = Number(height);
    },
  };
}
