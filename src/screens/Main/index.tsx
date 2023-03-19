import { Box, Button, Center, Heading, Icon, Spacer, Text, VStack } from "native-base";
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

export function Main() {

    return (
        <Center
            height="full"
            p={12}
            bg="#1E1E1E"
        >
            <Center mt={8} >
                <Heading size="2xl" color="white" style={{ fontFamily: 'ChangaOne-Regular' }} >
                    Choma Finder
                </Heading>
            </Center>

            <Spacer />
            <VStack width="150px" space={3}>
                <Button
                    bg="#22CF92"
                    borderRadius={8}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>IDIOMA</Text>

                </Button>
                <Button
                    bg="#22CF92"
                    borderRadius={8}
                >
                    HISTÓRICO
                </Button>
            </VStack>
            <VStack width="full" my={12}>
                <Button borderRadius={20} bg="#22CF92">
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
