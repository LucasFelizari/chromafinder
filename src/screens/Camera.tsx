import { useNavigation } from "@react-navigation/native";
import { Box, Button, Center, Heading, HStack, Icon, IconButton, Spinner, Stack, VStack } from "native-base";
import { AppRoutesProps } from "../routes/app.routes";
import { Camera as ExpoCamera, CameraType } from 'expo-camera'
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

import converterArquivo from "../services/converterAquivo";

import obterCorImagem from "../services/obterCorImagem";
import obterDescricaoImagem from "../services/obterDescricaoImagem";
import '../utils/i18n';
import { useTranslation } from 'react-i18next';
import speak from "../hooks/speak";
import { IMapeamentoCores } from "../utils/mapeamentoCores";
import obterMapeamentoCor from "../services/obterNomeCorSemelhante";

export function Camera() {
    const navigation = useNavigation<AppRoutesProps>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [type, setType] = useState(CameraType.back);
    const [hasPermission, setHasPermission] = useState<boolean>();
    const [corObtida, setCorObtida] = useState<string>('');
    const [descricaoImagem, setDescricaoImagem] = useState<string>('');
    const [corMapeada, setCorMapeada] = useState<IMapeamentoCores>({} as IMapeamentoCores);

    let camera: ExpoCamera | null;
    const { t, i18n } = useTranslation();

    async function handleTakePicture() {
        setIsLoading(true);
        resetarValores();
        try {
            const imagem = await tirarFoto();
            imagem && await obterDadosDaImagem(imagem);
        } catch (error) {
            console.log(error);
            speak(t('erro obter os dados'));
        }
    }

    async function obterDadosDaImagem(imagem: Buffer) {
        try {
            Promise.all([
                obterCorImagem(imagem),
                obterDescricaoImagem(imagem)
            ]).then((values) => {
                const corImagemHex = values[0];
                const descricaoImagem = values[1];
                    setCorObtida(corImagemHex);
                    setDescricaoImagem(descricaoImagem);
                    buscarNomeDaCor(corImagemHex);
            });
        } catch (error) {
            throw new Error('Erro ao obter dados da imagem');
        }
    }

    function resetarValores() {
        setCorObtida('');
        setCorMapeada({} as IMapeamentoCores);
    }

    async function tirarFoto() {
        if (camera) {
            const { base64 } = await camera.takePictureAsync({
                base64: true,
                quality: 0.8,
            });
            const imagemConvertida = base64 && await converterArquivo(base64);
            return imagemConvertida;
        }
        throw new Error('Camera não encontrada');
    }

    async function buscarNomeDaCor(corHex: string) {
        const cor = await obterMapeamentoCor(corHex);
        if (cor) {
            setCorMapeada(cor);
        }
        setIsLoading(false);
        speak(descricaoImagem + ", a cor predominante é " + cor[i18n.language]);
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
                ref={(r) => {
                    camera = r
                }}
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
                                        {corMapeada ? corMapeada[i18n.language] : 'Cor não encontrada'}
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