export function RoomClientRoutes(roomId: string) {
  const base = '/api/rooms';
  return {
    POST_ROOM: `${base}`,
    GET_ROOM: `${base}/${roomId}`,
    DELETE_ROOM: `${base}/${roomId}`,
    DELETE_ALL_ROOMS: `${base}`,
    GET_All_ROOMS: `${base}`,
    POST_ROOM_IMAGE: `${base}/${roomId}/image`,
    GET_ROOM_IMAGE: `${base}/${roomId}/image`,
    DELETE_ROOM_IMAGE: `${base}/${roomId}/image`,
    UPDATE_CANVAS: `${base}/${roomId}/update`,
    COUNT: `${base}/count`,
  };
}

export const RoomRoutes = RoomClientRoutes(':id');
