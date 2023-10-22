import { useNavigation } from "@react-navigation/native";
import { Button, Center, HStack, Heading, IconButton, Text, VStack, Spacer, Divider } from "native-base";
import { AppRoutesProps } from "../routes/app.routes";
import { useTranslation } from 'react-i18next';
import { Feather } from "@expo/vector-icons";

export function Idioma() {
    const navigation = useNavigation<AppRoutesProps>();

    const { t } = useTranslation();

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
            <Divider bg={'#494949'} my={5}/>
            <VStack my={6} space={4} w='90%' mx='auto'>
                <BotaoSelecaoIdioma idioma="en" nome='English'  />
                <BotaoSelecaoIdioma idioma="pt" nome='Português'  />
            </VStack>
        </VStack>
    );
}

function BotaoSelecaoIdioma({idioma, nome}: {idioma: string, nome: string}) {
    const { i18n } = useTranslation();

    function mudarIdioma(language: string) {
        i18n.changeLanguage(language);
    }
    return(
        <Button
            bg="#3f3f3f"
            h={14}
            borderRadius={10}
            onPress={() => mudarIdioma(idioma)}
            justifyContent={'flex-start'}
            paddingLeft={10}
            borderWidth={i18n.language === idioma ? 3 : 0}
            borderColor={i18n.language === idioma ? 'green.500' : 'transparent'}
        >
            <Text
                style={{ color: 'white', fontWeight: 'bold' }}
            >
                {nome}
            </Text>
        </Button>
    );
}