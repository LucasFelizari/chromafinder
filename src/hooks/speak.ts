import * as Speech from 'expo-speech';

export default function speak(texto: string) {

    Speech.speak(texto, { language: 'pt-BR' });
}