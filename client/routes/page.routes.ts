export function PageRoutes(roomId = ":id") {
  return {
    HOME: `/`,
    ROOM: `/room/${roomId}`,
  };
}
