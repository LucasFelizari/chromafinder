import { useNavigation } from "@react-navigation/native";
import { Box, Button, Center, Heading, HStack, Icon, IconButton, Spinner, Stack, VStack } from "native-base";
import { AppRoutesProps } from "../routes/app.routes";
import { Camera as ExpoCamera, CameraType } from 'expo-camera'
import { useEffect, useRef, useState } from "react";
import { Feather } from "@expo/vector-icons";
import analizarImagem from "../services/analisarImagem";
import converterArquivo from "../services/converterAquivo";
import obterNomeDaCor from "../services/obterNomeDaCor";

export function Camera() {
    const navigation = useNavigation<AppRoutesProps>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [type, setType] = useState(CameraType.back);
    const [hasPermission, setHasPermission] = useState<boolean>();
    const [corObtida, setCorObtida] = useState<string>('');
    const [nomeCor, setNomeCor] = useState<string>('');
    const cameraRef = useRef(null);

    async function handleTakePicture() {
        setIsLoading(true);
        if (cameraRef.current) {
            const { base64 } = await cameraRef.current.takePictureAsync({
                base64: true,
                quality: 0.05,
            });

            const imagemConvertida = await converterArquivo(base64);

            if (imagemConvertida) {
                const returno = await analizarImagem(imagemConvertida);
                if (returno.sucesso && returno.cor) {
                    setCorObtida(returno.cor);
                }
            }
        }
    }

    async function buscarNomeDaCor() {
        if (!corObtida) return;
        const nomeDaCor = await obterNomeDaCor(corObtida);
        if (nomeDaCor) {
            setNomeCor(nomeDaCor);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        buscarNomeDaCor();
    }, [corObtida]);

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
        return <Center><Heading>Sem acesso à câmera</Heading></Center>;
    }

    return (
        <Stack flex={1} >
            <ExpoCamera
                style={{ flex: 1 }}
                type={type}
                ref={cameraRef}
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
                    )
                    }
                    <VStack>
                        {nomeCor && corObtida &&
                            <Center>
                                <Box
                                    minW={40}
                                    minH={10}
                                    backgroundColor={corObtida ? '#' + corObtida : '#818181'}
                                    borderRadius={10}
                                    p={4}
                                >
                                    <Heading color='white' size='md' textAlign='center'>
                                        {nomeCor ? nomeCor : 'Cor não encontrada'}
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