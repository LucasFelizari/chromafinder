import { Box, Button, Center, Heading, Icon, Spacer, Text, VStack } from "native-base";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { AppRoutesProps } from "../routes/app.routes";
import '../utils/i18n';
import { useTranslation } from 'react-i18next';

export function Inicio() {
    const navigation = useNavigation<AppRoutesProps>();

    const { t, i18n } = useTranslation();

    return (
        <Center
            height="full"
            p={12}
            bg="#1E1E1E"
        >
            <Center mt={20} >
                <Heading size="2xl" color="#00b14a"

                fontWeight='bold'
                textTransform='uppercase'
                >
                    Chroma Finder
                </Heading>
            </Center>

            <Spacer />
            <VStack width="150px" space={3}>
                <Button
                    bg="#00b14a"
                    borderRadius={8}
                    onPress={() => navigation.navigate('Idioma')}
                >
                    <Text 
                    style={{ color: 'white', fontWeight: 'bold' }}
                    >
                      {t('idioma')}
                    </Text>

                </Button>
                <Button
                    bg="#00b14a"
                    borderRadius={8}
                    onPress={() => navigation.navigate('Historico')}
                >
                  {t('historico')}
                </Button>
            </VStack>
            <VStack width="full" my={12}>
                <Button
                    borderRadius={20}
                    bg="#00b14a"
                    onPress={() => navigation.navigate('Camera')}
                >
                    <Icon
                        as={<FontAwesome name="camera-retro" />}
                        size={12}
                        m={8}
                        color="white"
                    />
                </Button>
            </VStack>
        </Center>
    );
}
