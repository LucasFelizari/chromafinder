import axios from "axios"

export default async function obterNomeDaCor(hex: string) {
    try {
        const response = await axios.get(`https://www.thecolorapi.com/id?hex=${hex}&format=json`)

        return response.data.name.value;

    } catch (error) {
        console.log(error);
    }
}
