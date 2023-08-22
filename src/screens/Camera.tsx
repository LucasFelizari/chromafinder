import { useNavigation } from "@react-navigation/native";
import { Button, Center, Heading, Stack} from "native-base";
import { AppRoutesProps } from "../routes/app.routes";
import {Camera as ExpoCamera} from 'expo-camera'
import { useEffect, useState } from "react";
 
export function Camera() {
    const navigation = useNavigation<AppRoutesProps>();
    const [type, setType] = useState(ExpoCamera.Constants.Type.back);
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        (async () => {
          const { status } = await ExpoCamera.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <Center><Heading>Carregando...</Heading></Center>;
    }

    if (hasPermission === false) {
        return <Center><Heading>Sem acesso à câmera</Heading></Center>;
    }


    return (
       <Stack flex={1}>
            <ExpoCamera 
            style={{flex: 1}}
             type={type}
             >
                
             </ExpoCamera>
       </Stack>
    );
}