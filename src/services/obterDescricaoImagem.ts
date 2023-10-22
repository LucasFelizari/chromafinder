import axios from "axios";




export default async function obterDescricaoImagem(imagem: Buffer): Promise<string> {
    if (!!imagem) {
        const subscriptionKey = '3c06587bfb4b4c4e9f49b4658c078a36';
        const uriBase = 'https://brazilsouth.api.cognitive.microsoft.com/vision/v3.2/describe';
        const params = {
            maxCandidates: 1,
            language: 'pt',
            'model-version': 'latest'
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
            //  console.log(response.data);
            const { captions } = response.data.description;
            return captions[0].text;
        }
        catch (error: any) {
            console.log(error.response);
            throw new Error("Não foi possivel capturar a descrição da imagem");
        }
    }
    throw new Error('Imagem não possivel capturar a imagem');
}
