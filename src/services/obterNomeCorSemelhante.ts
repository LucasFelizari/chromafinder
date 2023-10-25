import { IMapeamentoCores, mapeamentoCores } from '../utils/mapeamentoCores';

export type IRgb = {
    r: number;
    g: number;
    b: number;
}

export default async function obterMapeamentoCor(hex: string): Promise<IMapeamentoCores> {
    const corAlvo: IRgb = await hexToRgb(hex);
       return await encontrarCorMaisSemelhante(corAlvo);
}

async function encontrarCorMaisSemelhante(corAlvo: IRgb): Promise<IMapeamentoCores> {
    let corMaisSemelhante: IMapeamentoCores = {} as IMapeamentoCores;

    let menorDiferenca = Number.MAX_VALUE;

    for (const cor of mapeamentoCores) {
        const diferenca = calcularDiferencaRGB(corAlvo, cor);
        if (diferenca < menorDiferenca) {
            menorDiferenca = diferenca;
            corMaisSemelhante = cor;
        }
    }
    return corMaisSemelhante;
}

function calcularDiferencaRGB(cor1: IRgb, cor2: IRgb): number {
    const diferencaR = cor1.r - cor2.r;
    const diferencaG = cor1.g - cor2.g;
    const diferencaB = cor1.b - cor2.b;

 return Math.sqrt(diferencaR ** 2 + diferencaG ** 2 + diferencaB ** 2);
}

async function hexToRgb(hex: string) {
    // Remove o "#" se estiver presente
    hex = hex.replace(/^#/, '');

    // Converte o valor hexadecimal em números separados para R, G e B
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Retorna o valor RGB como um objeto
    return { r, g, b };
}
