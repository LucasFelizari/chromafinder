import { useNavigation } from "@react-navigation/native";
import { Box, Button, Center, Heading, HStack, Icon, IconButton, Stack } from "native-base";
import { AppRoutesProps } from "../routes/app.routes";
import { Camera as ExpoCamera } from 'expo-camera'
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

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

    function handleTakePicture() {
        console.log('tirou foto')
    }

    return (
        <Stack flex={1} >
            <ExpoCamera
                style={{ flex: 1 }}
                type={type}
            >
                <Box mt={12} flex={1} justifyContent='space-between'>
                    <HStack justifyContent='space-between' px={4}>
                        <IconButton
                            icon={<Feather name="arrow-left" color="#FFFFFF" size={50} />}
                            // size={6}
                            onPress={() => navigation.goBack()}
                        />
                        <IconButton
                            icon={<Feather name="rotate-cw" color="#FFFFFF" size={40} />}
                            onPress={() => {
                                setType(
                                    type === ExpoCamera.Constants.Type.back
                                        ? ExpoCamera.Constants.Type.front
                                        : ExpoCamera.Constants.Type.back
                                );
                            }}
                        />
                    </HStack>
                    <Center mb={16} >
                        <Button 
                        colorScheme='green'
                            rounded='full'
                            size='lg'
                            onPress={handleTakePicture}
                            p={6}
                        >
                            <Icon as={Feather} name='camera' size={10} color='white' />
                        </Button>
                    </Center>
                </Box>
            </ExpoCamera>
        </Stack>
    );
}