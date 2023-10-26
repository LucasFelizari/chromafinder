import { useNavigation } from "@react-navigation/native";
import { Button, Center, HStack, Heading, IconButton, Text, VStack, Spacer, Divider, Switch } from "native-base";
import { AppRoutesProps } from "../routes/app.routes";
import { useTranslation } from 'react-i18next';
import { Feather } from "@expo/vector-icons";
import { useChromaFinderContext } from "../hooks/useChromaFinderContext";
import { IIdioma } from "../contexts/ChromaFinderContext";

export function Idioma() {
    const navigation = useNavigation<AppRoutesProps>();
    const { t } = useTranslation();
    const { buscarDescricaoImagem, setBuscarDescricaoImagem } = useChromaFinderContext();

    return (
        <VStack flex={1} bg="#1E1E1E" alignItems='start' paddingTop={12}>
            <IconButton
                icon={<Feather name="arrow-left" color="#b9b9b9" size={50} />}
                onPress={() => navigation.goBack()}
            />
            <Text
                style={{ color: 'white', fontWeight: 'bold', fontSize: 15, marginLeft: 20 }}
                mt={6}
            >
                {t('idioma')}
            </Text>
            {/* <Divider bg={'#494949'} my={5} /> */}
            <VStack mt={4} mb={6} space={4} w='90%' mx='auto'>
                <BotaoSelecaoIdioma idiomaBotao="en" nome='English' />
                <BotaoSelecaoIdioma idiomaBotao="pt" nome='Português' />
            </VStack>
            <Divider bg={'#494949'} mt={2} mb={5} />
            <HStack w='90%' mx='auto' justifyContent='start' alignItems={'center'}>
            <Switch 
            size="lg" 
            onTrackColor="#00857a" 
            value={buscarDescricaoImagem}
            onToggle={() => setBuscarDescricaoImagem(!buscarDescricaoImagem)} 
            />
            <Text
                style={{ color: 'white', fontWeight: 'bold', fontSize: 18, marginLeft: 20 }}
            >
               {t('descricao img')}
            </Text>
            </HStack>
        </VStack>
    );
}

function BotaoSelecaoIdioma({ idiomaBotao, nome }: { idiomaBotao: IIdioma, nome: string }) {
    const { i18n } = useTranslation();
    const { idioma, setIdioma } = useChromaFinderContext();

    function mudarIdioma(language: IIdioma) {
        i18n.changeLanguage(language);
        setIdioma(language);
    }
    return (
        <Button
            bg="#3f3f3f"
            h={14}
            borderRadius={10}
            onPress={() => mudarIdioma(idiomaBotao)}
            justifyContent={'flex-start'}
            paddingLeft={10}
            borderWidth={idioma === idiomaBotao ? 3 : 0}
            borderColor={idioma === idiomaBotao ? '#00857a' : 'transparent'}
        >
            <Text
                style={{ color: 'white', fontWeight: 'bold' }}
            >
                {nome}
            </Text>
        </Button>
    );
}