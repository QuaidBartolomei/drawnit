export function RoomClientRoutes(roomId = ':id') {
  const apiBase = '/api/room';
  return {
    CREATE_ROOM: `${apiBase}/create`,
    GET_ROOM: `${apiBase}/get/${roomId}`,
    GET_All: `${apiBase}/all`,
    SET_IMAGE: `${apiBase}/setImage/${roomId}`,
    GET_BACKGROUND_IMAGE: `${apiBase}/getImage/${roomId}`,
    UPDATE_CANVAS: `${apiBase}/update/${roomId}`,
    DELETE_ROOM: `${apiBase}/delete/${roomId}`,
    DELETE_ALL: `${apiBase}/delete-all/`,
    COUNT: `${apiBase}/count`,
  };
}

export const RoomRoutes = RoomClientRoutes();
