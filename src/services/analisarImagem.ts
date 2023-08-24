
import axios from 'axios';

export default async function analisarImagem(imagem: Buffer){
    if(imagem) {
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

     await axios.post(uriBase, imagem, {
            params,
            headers,
            responseType: 'json',
            transformResponse: [(data) => JSON.parse(data)], 
        }
        ).then((response) => {
            console.log(response.data.color.accentColor);
            return response.data.color.accentColor;
        })
        .catch((error) => {
            return 'erro';
        }); 
    }
    else {
        return 'erro';
    }
}


