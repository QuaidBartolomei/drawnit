import axios, { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import Room from 'interfaces/room.interface';
import { RoomClientRoutes } from 'routes/room.api.routes';
import { base64toBlob } from 'utils/blob.utils';
import { uploadFile } from 'utils/fetch.utils';

// CREATE_ROOM: '/room/create',
export async function createRoom(roomData: Partial<Room> = {}) {
  try {
    const response = await axios.post(RoomClientRoutes().CREATE_ROOM, {
      _id: '',
      backgroundImageId: '',
      canvasImage: '',
      height: 1,
      width: 1,
      ...roomData,
    });
    return response.data as Room;
  } catch (error) {
    console.error(error);
  }
}

// GET_ROOM: `/room/get/${roomId}`,
export async function getRoom(id: string): Promise<Room | undefined> {
  try {
    console.log('getting room data...');
    const route = RoomClientRoutes(id).GET_ROOM;
    const response: AxiosResponse<Room> = await axios.get(route);
    if (response.status !== 200) throw new Error('room not found');
    const room = response.data as Room;
    const backgroundImageUrl = await getBackgroundImageUrl(room);
    return { ...room, backgroundImageUrl };
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

// SET_IMAGE: `/room/setImage/${roomId}`,
export async function setImage(
  id: string,
  imageFile: File
): Promise<Room | undefined> {
  try {
    console.log('setting image...');
    const res = await uploadFile(RoomClientRoutes(id).SET_IMAGE, imageFile);
    if (res.status !== StatusCodes.OK) return undefined;
    return getRoom(id);
  } catch (error) {
    console.error(error);
  }
}

// UPDATE_CANVAS: `/room/update/${roomId}`,
export async function saveCanvasToDb(
  id: string,
  canvasString: string
): Promise<boolean> {
  try {
    const res = await axios.post(RoomClientRoutes(id).UPDATE_CANVAS, {
      canvasImage: canvasString,
    } as Partial<Room>);
    return res.status === StatusCodes.OK;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// GET_BACKGROUND_IMAGE: `/room/getImage/${roomId}`,
export async function getBackgroundImageUrl({
  _id,
  backgroundImageId,
}: Partial<Room>): Promise<string | undefined> {
  try {
    if (!backgroundImageId) return '';
    const res = await axios.get(RoomClientRoutes(_id).GET_BACKGROUND_IMAGE);
    if (res.status !== StatusCodes.OK) return '';
    const encodedImage = (await res.data) as string;
    const blob = base64toBlob(encodedImage, 'image/jpeg');
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error(error);
  }
}

// DELETE_BACKGROUND_IMAGE: `/room/deleteImage/${roomId}`,
export async function deleteBackgroundImage({
  id,
}: {
  id: string;
}): Promise<boolean> {
  const res = await axios.get(RoomClientRoutes(id).DELETE_BACKGROUND_IMAGE);
  if (res.status !== StatusCodes.OK) return true;
  return false;
}
