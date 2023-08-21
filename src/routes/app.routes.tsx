import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Camera } from '../screens/Camera';
import { Historico } from '../screens/Historico';
import { Idioma } from '../screens/Idioma';
import { Inicio } from '../screens/Inicio'

type AppRoutes = {
    Inicio: undefined;
    Camera: undefined;
    Historico: undefined;
    Idioma: undefined;
}

export type AppRoutesProps = NativeStackNavigationProp<AppRoutes>

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }} >
            <Screen
                name="Inicio"
                component={Inicio}
            />
            <Screen
                name="Camera"
                component={Camera}
            />
            <Screen
                name="Historico"
                component={Historico}
            />
            <Screen
                name="Idioma"
                component={Idioma}
            />
        </Navigator>
    );
}