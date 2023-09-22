import { useNavigation } from "@react-navigation/native";
import { Button, Center, HStack, Heading, IconButton, Text, VStack } from "native-base";
import { AppRoutesProps } from "../routes/app.routes";
import { useTranslation } from 'react-i18next';
import { Feather } from "@expo/vector-icons";
import { useEffect } from "react";

export function Idioma() {
    const navigation = useNavigation<AppRoutesProps>();

    const { t, i18n } = useTranslation();

    function mudarIdioma(language: string) {
        i18n.changeLanguage(language);
    }

    return (
        <VStack flex={1} bg="#1E1E1E" alignItems='start' paddingTop={12}>
            <IconButton
                icon={<Feather name="arrow-left" color="#b9b9b9" size={50} />}
                onPress={() => navigation.goBack()}
            />
            <Text
                style={{ color: 'white', fontWeight: 'bold', fontSize: 18, marginLeft: 20 }}
                mt={6}
            >
                {t('idioma')}
            </Text>
            <VStack my={6} space={2} w='full'>
                <Button
                    bg="#3f3f3f"
                    h={14}
                    onPress={() => mudarIdioma('en')}
                    justifyContent={'flex-start'}
                    paddingLeft={10}
                >
                    <Text
                        style={{ color: 'white', fontWeight: 'bold' }}
                    >
                        English
                    </Text>
                </Button>
                <Button
                    bg="#3f3f3f"
                    h={14}
                    onPress={() => mudarIdioma('pt')}
                    justifyContent={'flex-start'}
                    paddingLeft={10}
                >
                    <Text
                        style={{ color: 'white', fontWeight: 'bold' }}
                    >
                        Português
                    </Text>
                </Button>
            </VStack>
        </VStack>

    );
}