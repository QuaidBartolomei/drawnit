import { readFileSync } from 'fs';

export const imageFile: {
  encodedFile: string;
  mimeType: string;
} = {
  encodedFile: readFileSync(__dirname + '/image.jpg', 'base64'),
  mimeType: '/image/jpeg',
};
