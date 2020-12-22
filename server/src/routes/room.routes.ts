export function RoomClientRoutes(roomId = ':id') {
  return {
    CREATE_ROOM: '/room/create',
    GET_ROOM: `/room/get/${roomId}`,
    GET_All: '/room/all',
    SET_IMAGE: `/room/setImage/${roomId}`,
    GET_BACKGROUND_IMAGE: `/room/getImage/${roomId}`,
    UPDATE_CANVAS: `/room/update/${roomId}`,
    DELETE_ROOM: `/room/delete/${roomId}`,
    DELETE_ALL: `/room/delete-all`,
    COUNT: `/room/count`,
  };
}

export const RoomRoutes = RoomClientRoutes();
