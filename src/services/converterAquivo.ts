import { toByteArray } from 'base64-js';
import { Buffer } from 'buffer';

export default async function converterArquivo(base64Image: string) {
    if (!base64Image) {
        return;
    }

    const imageBytes = toByteArray(base64Image);
    return Buffer.from(imageBytes);
}