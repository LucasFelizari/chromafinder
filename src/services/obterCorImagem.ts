
import axios from 'axios';

export default async function obterCorImagem(imagem: Buffer): Promise<string> {
    if (!!imagem) {
        const subscriptionKey = '3c06587bfb4b4c4e9f49b4658c078a36';
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
            return accentColor;

        } catch (error: any) {
            console.log(error.response.data);
            throw new Error("Não foi possivel capturar a cor da imagem");
        }
    }

    throw new Error('Imagem não possivel capturar a imagem');
}


