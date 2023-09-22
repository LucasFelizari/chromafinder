
import { mapeamentoCoresPortugues } from '../utils/mapeamentoCores';


export default async function obterNomeCorSemelhante(hex: string): Promise<string> {
    const corAlvo = await hexToRgb(hex);
    return await encontrarCorMaisSemelhante(Object.values(corAlvo));
}

async function encontrarCorMaisSemelhante(corAlvo: number[]): Promise<string> {
    let corMaisSemelhante = "";
    let menorDiferenca = Number.MAX_VALUE;

    for (const cor of mapeamentoCoresPortugues) {
        const diferenca = calcularDiferencaRGB(corAlvo, cor.rgb);
        if (diferenca < menorDiferenca) {
            menorDiferenca = diferenca;
            corMaisSemelhante = cor.nome;
        }
    }

    return corMaisSemelhante;
}

function calcularDiferencaRGB(cor1: number[], cor2: number[]): number {
    const diferencaR = cor1[0] - cor2[0];
    const diferencaG = cor1[1] - cor2[1];
    const diferencaB = cor1[2] - cor2[2];
    return Math.sqrt(diferencaR * 2 + diferencaG * 2 + diferencaB ** 2);
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

