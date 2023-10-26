import { useNavigation } from "@react-navigation/native";
import { Box, Button, Center, Heading, HStack, Icon, IconButton, Spinner, Stack, VStack } from "native-base";
import { AppRoutesProps } from "../routes/app.routes";
import { Camera as ExpoCamera, CameraType } from 'expo-camera'
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import '../utils/i18n';
import { useTranslation } from 'react-i18next';
import speak from "../hooks/speak";
import { useChromaFinderContext } from "../hooks/useChromaFinderContext";

export function Camera() {
    const {corMapeada, corObtida, isLoading, idioma, camRef, analisarImagem} = useChromaFinderContext();
    const navigation = useNavigation<AppRoutesProps>();
   
    const [type, setType] = useState(CameraType.back);
    const [hasPermission, setHasPermission] = useState<boolean>();
    const { t } = useTranslation();

    async function handleTakePicture() {
        try {
            analisarImagem();
        } catch (error) {
            console.log(error);
            speak(t('erro obter os dados'));
        }
    }   

    useEffect(() => {
        (async () => {
            const { status } = await ExpoCamera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <Center><Heading>Carregando...</Heading></Center>;
    }

    if (hasPermission === false) {
        return <Center><Heading>{t('sem acesso camera')}</Heading></Center>;
    }

    return (
        <Stack flex={1} >
            <ExpoCamera
                style={{ flex: 1 }}
                type={type}
                ref={camRef}
            >
                <Box mt={12} flex={1} justifyContent='space-between'>
                    <HStack justifyContent='space-between' px={4}>
                        <IconButton
                            icon={<Feather name="arrow-left" color="#FFFFFF" size={50} />}

                            onPress={() => navigation.goBack()}
                        />
                        <IconButton
                            icon={<Feather name="rotate-cw" color="#FFFFFF" size={40} />}
                            onPress={() => {
                                setType(
                                    type === CameraType.back
                                        ? CameraType.front
                                        : CameraType.back
                                );
                            }}
                        />
                    </HStack>
                    {isLoading && (
                        <Center>
                            <Spinner
                                size='lg'
                                color='green.500'
                                mt={4}
                            />
                        </Center>
                    )}
                    <VStack>
                        {corMapeada && corObtida &&
                            <Center>
                                <Box
                                    minW={40}
                                    minH={10}
                                    backgroundColor={corObtida ? '#' + corObtida : '#818181'}
                                    borderRadius={10}
                                    p={4}
                                >
                                    <Heading color='white' size='md' textAlign='center'>
                                        {corMapeada ? corMapeada[idioma] : 'Cor não encontrada'}
                                    </Heading>
                                </Box>
                            </Center>
                        }
                        <Center mb={16} mt={10} >
                            <Button
                                colorScheme='green'
                                rounded='full'
                                size='lg'
                                onPress={handleTakePicture}
                                p={6}
                                disabled={isLoading}
                            >
                                <Icon as={Feather} name='camera' size={10} color='white' />
                            </Button>
                        </Center>
                    </VStack>
                </Box>
            </ExpoCamera>
        </Stack>
    );
}