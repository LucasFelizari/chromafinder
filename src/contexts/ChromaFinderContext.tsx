import { createContext, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import speak from "../hooks/speak";
import obterCorImagem from "../services/obterCorImagem";
import obterDescricaoImagem from "../services/obterDescricaoImagem";
import obterMapeamentoCor from "../services/obterNomeCorSemelhante";
import { IMapeamentoCores } from "../utils/mapeamentoCores";
import { Camera as ExpoCamera } from 'expo-camera'
import converterArquivo from "../services/converterAquivo";

export type ChromaFinderContextProps = {
    corObtida: string;
    corMapeada: IMapeamentoCores;
    isLoading: boolean;
    idioma: string;
    camRef?: React.RefObject<ExpoCamera>;
    analisarImagem: () => Promise<void>;
    setIdioma: (idioma: IIdioma) => void;
}

export type IIdioma = 'pt' | 'en';

type ChromaFinderProviderProps = {
    children: ReactNode;
}

export const ChromaFinderContext = createContext<ChromaFinderContextProps>({} as ChromaFinderContextProps);

export function ChromaFinderProvider( { children }: ChromaFinderProviderProps ) {
    const [corObtida, setCorObtida] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [corMapeada, setCorMapeada] = useState<IMapeamentoCores>({} as IMapeamentoCores);
    const [buscarDescricaoImagem, setBuscarDescricaoImagem] = useState<boolean>(true);
    const { i18n } = useTranslation();
    const [idioma, setIdioma] = useState<IIdioma>(i18n.language as IIdioma);
    const camRef = useRef<ExpoCamera>(null);

    const analisarImagem = useCallback(async () => {
        try {
            setIsLoading(true);
            resetarValores();
            const imagem = await tirarFoto();
            if(!imagem) throw new Error('Erro ao tirar foto');

            const [corImagemHex, descricaoImagem] = await Promise.all([
                obterCorImagem(imagem),
                obterDescricaoImagem(imagem)
            ]);

            setCorObtida(corImagemHex);
            buscarNomeDaCor(corImagemHex, descricaoImagem);
        } catch (error) {
            throw new Error('Erro ao obter dados da imagem');
        } finally {
            setIsLoading(false);
        }
    }, [ idioma ]);

    async function tirarFoto() {
        try {
            if (camRef?.current) {
                const { base64 } = await camRef?.current?.takePictureAsync({
                    base64: true,
                    quality: 0.8,
                });
                if(!base64) throw new Error('Erro ao tirar foto');
                const imagemConvertida = await converterArquivo(base64);
                if(!imagemConvertida) throw new Error('Erro ao converter imagem');
                return imagemConvertida;

            }
        } catch (error) {
            throw new Error('Camera não encontrada');
        }
    }

    const falarInfoImagem = useCallback((cor: IMapeamentoCores, descricaoImagem: string) => {
        if(buscarDescricaoImagem) {
            speak(descricaoImagem + ", a cor predominante é " + cor[idioma]);
        } else {
            speak("A cor predominante é " + cor[idioma]);
        }
    }, [buscarDescricaoImagem,  corMapeada, idioma]);


    function resetarValores() {
        setCorObtida('');
        setCorMapeada({} as IMapeamentoCores);
    }

    const buscarNomeDaCor = useCallback(
        async (corHex: string, descricaoImagem: string) => {
            const cor = await obterMapeamentoCor(corHex);
            if (cor) {
                setCorMapeada(cor);
            }

            falarInfoImagem(cor, descricaoImagem);
        },
        [buscarDescricaoImagem],
    );

    return (
        <ChromaFinderContext.Provider value={{
            corObtida,
            corMapeada,
            isLoading,
            idioma,
            setIdioma,
            camRef,
            analisarImagem
        }}>
            {children}
        </ChromaFinderContext.Provider>
    )
}