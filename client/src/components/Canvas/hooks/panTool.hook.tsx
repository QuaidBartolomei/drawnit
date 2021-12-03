export function usePanTool(): React.HTMLProps<HTMLCanvasElement> {
  return {
    style: {
      cursor: 'grab',
      touchAction: 'auto',
    },
  }
}
