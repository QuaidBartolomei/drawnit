export function RoomClientRoutes(roomId = ':id') {
  const base = '/api/room'
  return {
    CREATE_ROOM: `${base}/create`,
    GET_ROOM: `${base}/get/${roomId}`,
    GET_All: `${base}/all`,
    SET_IMAGE: `${base}/setImage/${roomId}`,
    GET_BACKGROUND_IMAGE: `${base}/getImage/${roomId}`,
    DELETE_BACKGROUND_IMAGE: `${base}/deleteImage/${roomId}`,
    UPDATE_CANVAS: `${base}/update/${roomId}`,
    DELETE_ROOM: `${base}/delete/${roomId}`,
    DELETE_ALL: `${base}/delete-all/`,
    COUNT: `${base}/count`,
  }
}

export const RoomRoutes = RoomClientRoutes()
