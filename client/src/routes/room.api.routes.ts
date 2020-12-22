const apiUrl = ''
export function RoomClientRoutes(roomId = ':id') {
  return {
    CREATE_ROOM: `${apiUrl}/room/create`,
    GET_ROOM: `${apiUrl}/room/get/${roomId}`,
    GET_All: `${apiUrl}/room/all`,
    SET_IMAGE: `${apiUrl}/room/setImage/${roomId}`,
    GET_BACKGROUND_IMAGE: `${apiUrl}/room/getImage/${roomId}`,
    UPDATE_CANVAS: `${apiUrl}/room/update/${roomId}`,
    DELETE_ROOM: `${apiUrl}/room/delete/${roomId}`,
    DELETE_ALL: `${apiUrl}/room/delete-all/`,
    COUNT: `/room/count`,
  };
}

export const RoomRoutes = RoomClientRoutes();
