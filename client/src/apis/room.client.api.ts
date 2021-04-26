import { StatusCodes } from 'http-status-codes';
import Room from 'interfaces/room.interface';
import { RoomClientRoutes, RoomRoutes } from 'routes/room.api.routes';
import { base64toBlob } from 'utils/blob.utils';
import { fetchData, postAndGet, postData, uploadFile } from 'utils/fetch.utils';

// CREATE_ROOM: '/room/create',
export async function createRoom(roomData: Partial<Room> = {}) {
  const room = {
    _id: '',
    backgroundImageId: '',
    canvasImage: '',
    height: 1,
    width: 1,
    ...roomData,
  };
  return postAndGet<Room, Room>(RoomRoutes.CREATE_ROOM, room);
}

// GET_ROOM: `/room/get/${roomId}`,
export async function getRoom(id: string): Promise<Room | undefined> {
  console.log('getting room data');
  const room = await fetchData<Room>(RoomClientRoutes(id).GET_ROOM);
  console.log('room', room);
  return room;
}

// GET_All: '/room/all',
export async function getAllRooms(): Promise<Room[] | undefined> {
  return fetchData<Room[]>(RoomClientRoutes().GET_All);
}

// SET_IMAGE: `/room/setImage/${roomId}`,
export async function setImage(
  id: string,
  imageFile: File
): Promise<Room | undefined> {
  const res = await uploadFile(RoomClientRoutes(id).SET_IMAGE, imageFile);
  if (res.status !== StatusCodes.OK) return undefined;
  return getRoom(id);
}

// DELETE_ALL: `/room/delete-all/`,
export async function deleteAllRooms() {
  let res = await fetch(RoomRoutes.DELETE_ALL);
  return res.status === 200;
}

// DELETE_ROOM: `/room/delete/${roomId}`,
export async function deleteRoom(id: string) {
  let res = await fetch(RoomClientRoutes(id).DELETE_ROOM);
  return res.status === 200;
}

// UPDATE_CANVAS: `/room/update/${roomId}`,
export async function saveCanvasToDb(
  id: string,
  canvasString: string
): Promise<boolean> {
  const res = await postData(RoomClientRoutes(id).UPDATE_CANVAS, {
    canvasImage: canvasString,
  } as Partial<Room>);
  return res.status === StatusCodes.OK;
}

// GET_BACKGROUND_IMAGE: `/room/getImage/${roomId}`,
export async function getBackgroundImage(id: string) {
  let res = await fetch(RoomClientRoutes(id).GET_BACKGROUND_IMAGE);
  if (res.status !== StatusCodes.OK) return undefined;
  const encodedImage = await res.text();
  const blob = base64toBlob(encodedImage, 'image/jpeg');
  return URL.createObjectURL(blob)
}

//  COUNT
export async function countRooms() {
  return fetchData<number>(RoomRoutes.COUNT);
}
