
import axios from 'axios';

type AnalisarImagemReturn = {
    sucesso: boolean;
    cor?: string;
}

export default async function analisarImagem(imagem: Buffer): Promise<AnalisarImagemReturn> {
    if (!!imagem) {
        const subscriptionKey = 'ce5b7ed8cd98493abd254149952bdd80';
        const uriBase = 'https://brazilsouth.api.cognitive.microsoft.com/vision/v3.2/analyze';
        const params = {
            visualFeatures: 'Color',
            language: 'pt-BR'
        };

        const headers = {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': subscriptionKey
        };

        try {
            const response = await axios.post(uriBase, imagem, {
                params,
                headers,
                responseType: 'json',
                transformResponse: [(data) => JSON.parse(data)],
            }
            );

            const { accentColor } = response.data.color;
            return { sucesso: true, cor: accentColor };

        } catch (error: any) {
            return { sucesso: false };
        }

    }

    return { sucesso: false };
}


