import {extendTheme, NativeBaseProvider } from 'native-base';
import { useFonts } from 'expo-font';
import { Main } from './src/screens/Main';
import * as Font from 'expo-font';
import { useEffect } from 'react';

async function loadFonts() {
  await Font.loadAsync({
    'ChangaOne-Regular': require('./assets/fonts/ChangaOne-Regular.ttf'),
  });
}

export default function App() {
  useEffect(() => {
    loadFonts();
  }, []);
 
  return (
    <NativeBaseProvider >
     <Main />
    </NativeBaseProvider>
  );
}


const theme = extendTheme({
  fonts: {
    heading: 'ChangaOne-Regular',
    body: "ChangaOne",
    mono: "ChangaOne",
  }
});


