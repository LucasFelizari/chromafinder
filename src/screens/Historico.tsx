import { useNavigation } from "@react-navigation/native";
import { Button, Center, Heading } from "native-base";
import { AppRoutesProps } from "../routes/app.routes";

export function Historico() {
    const navigation = useNavigation<AppRoutesProps>();

    return (
        <Center flex={1}>
            <Heading color='green.400'>Historico</Heading>
            <Button
                mt={6}
                onPress={() => navigation.goBack()}
                px={12}
                colorScheme="green"
            >
                Voltar
            </Button>
        </Center>
    );
}