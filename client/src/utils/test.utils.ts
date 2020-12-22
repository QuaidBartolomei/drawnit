import { readFileSync } from 'fs';

export const imageBuffer = readFileSync(__dirname + '/image.jpg');
export const imageBlob = new Blob([imageBuffer as BlobPart], {
  type: 'image/jpeg',
});
export const imageFile = imageBlob as File;
