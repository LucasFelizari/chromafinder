import { IRgb } from "../services/obterNomeCorSemelhante";

export type IMapeamentoCores = IRgb & {
    id: Number;
    pt: string;
    en: string;
    rgb: [number, number, number];
    [key: string]: any;
}

export const mapeamentoCores: IMapeamentoCores[] = [
    {
        id: 1,
        pt: "Azul",
        en: "Blue",
        rgb: [0, 0, 255],
        r: 0,
        g: 0,
        b: 255
    },
    {
        id: 2,
        pt: "Azul Claro",
        en: "Light Blue",
        rgb: [173, 216, 230],
        r: 173,
        g: 216,
        b: 230
    },
    {
        id: 3,
        pt: "Azul Escuro",
        en: "Dark Blue",
        rgb: [0, 0, 139],
        r: 0,
        g: 0,
        b: 139
    },
    {
        id: 4,
        pt: "Vermelho",
        en: "Red",
        rgb: [255, 0, 0],
        r: 255,
        g: 0,
        b: 0
    },
    {
        id: 5,
        pt: "Vermelho Claro",
        en: "Light Red",
        rgb: [255, 102, 102],
        r: 255,
        g: 102,
        b: 102
    },
    {
        id: 6,
        pt: "Vermelho Escuro",
        en: "Dark Red",
        rgb: [139, 0, 0],
        r: 139,
        g: 0,
        b: 0
    },
    {
        id: 7,
        pt: "Amarelo",
        en: "Yellow",
        rgb: [255, 255, 0],
        r: 255,
        g: 255,
        b: 0
    },
    {
        id: 8,
        pt: "Amarelo Claro",
        en: "Light Yellow",
        rgb: [255, 255, 153],
        r: 255,
        g: 255,
        b: 153
    },
    {
        id: 9,
        pt: "Amarelo Escuro",
        en: "Dark Yellow",
        rgb: [153, 153, 0],
        r: 153,
        g: 153,
        b: 0
    },
    {
        id: 10,
        pt: "Verde",
        en: "Green",
        rgb: [0, 255, 0],
        r: 0,
        g: 255,
        b: 0
    },
    {
        id: 11,
        pt: "Verde Claro",
        en: "Light Green",
        rgb: [144, 238, 144],
        r: 144,
        g: 238,
        b: 144
    },
    {
        id: 12,
        pt: "Verde Escuro",
        en: "Dark Green",
        rgb: [0, 100, 0],
        r: 0,
        g: 100,
        b: 0
    },
    {
        id: 13,
        pt: "Laranja",
        en: "Orange",
        rgb: [255, 165, 0],
        r: 255,
        g: 165,
        b: 0
    },
    {
        id: 14,
        pt: "Laranja Claro",
        en: "Light Orange",
        rgb: [255, 179, 71],
        r: 255,
        g: 179,
        b: 71
    },
    {
        id: 15,
        pt: "Laranja Escuro",
        en: "Dark Orange",
        rgb: [255, 140, 0],
        r: 255,
        g: 140,
        b: 0
    },
    {
        id: 16,
        pt: "Roxo",
        en: "Purple",
        rgb: [128, 0, 128],
        r: 128,
        g: 0,
        b: 128
    },
    {
        id: 17,
        pt: "Roxo Claro",
        en: "Light Purple",
        rgb: [204, 153, 255],
        r: 204,
        g: 153,
        b: 255
    },
    {
        id: 18,
        pt: "Roxo Escuro",
        en: "Dark Purple",
        rgb: [75, 0, 130],
        r: 75,
        g: 0,
        b: 130
    },
    {
        id: 19,
        pt: "Rosa",
        en: "Pink",
        rgb: [255, 192, 203],
        r: 255,
        g: 192,
        b: 203
    },
    {
        id: 20,
        pt: "Rosa Claro",
        en: "Light Pink",
        rgb: [255, 182, 193],
        r: 255,
        g: 182,
        b: 193
    },
    {
        id: 21,
        pt: "Rosa Escuro",
        en: "Dark Pink",
        rgb: [199, 21, 133],
        r: 199,
        g: 21,
        b: 133
    },
    {
        id: 22,
        pt: "Marrom",
        en: "Brown",
        rgb: [165, 42, 42],
        r: 165,
        g: 42,
        b: 42
    },
    {
        id: 23,
        pt: "Marrom Claro",
        en: "Light Brown",
        rgb: [210, 180, 140],
        r: 210,
        g: 180,
        b: 140
    },
    {
        id: 24,
        pt: "Marrom Escuro",
        en: "Dark Brown",
        rgb: [101, 67, 33],
        r: 101,
        g: 67,
        b: 33
    },
    {
        id: 25,
        pt: "Cinza",
        en: "Gray",
        rgb: [128, 128, 128],
        r: 128,
        g: 128,
        b: 128
    },
    {
        id: 26,
        pt: "Cinza Claro",
        en: "Light Gray",
        rgb: [211, 211, 211],
        r: 211,
        g: 211,
        b: 211
    },
    {
        id: 27,
        pt: "Cinza Escuro",
        en: "Dark Gray",
        rgb: [64, 64, 64],
        r: 64,
        g: 64,
        b: 64
    },
    {
        id: 28,
        pt: "Preto",
        en: "Black",
        rgb: [0, 0, 0],
        r: 0,
        g: 0,
        b: 0
    },
    {
        id: 29,
        pt: "Branco",
        en: "White",
        rgb: [255, 255, 255],
        r: 255,
        g: 255,
        b: 255
    },
    {
        id: 30,
        pt: "Bege",
        en: "Beige",
        rgb: [245, 245, 220],
        r: 245,
        g: 245,
        b: 220
    },
    {
        id: 31,
        pt: "Azul Royal",
        en: "Royal Blue",
        rgb: [65, 105, 225],
        r: 65,
        g: 105,
        b: 225
    }, 
    {
        id: 32,
        pt: "Azul Céu",
        en: "Sky Blue",
        rgb: [135,206,235],
        r: 135,
        g: 206,
        b: 235
    },
    {
        id: 33,
        pt: "Azul Aço",
        en: "Light Steel Blue",
        rgb: [176,196,222],
        r: 176,
        g: 196,
        b: 222
    },
    {
        id: 34,
        pt: "Verde Lima",
        en: "Lime Green",
        rgb: [50,205,50],
        r: 50,
        g: 205,
        b: 50
    },
    {
        id: 35,
        pt: "Verde Oliva",
        en: "Olive Green",
        rgb: [107,142,35],
        r: 107,
        g: 142,
        b: 35
    },
    {
        id: 36,
        pt: "Verde Mar",
        en: "Sea Green",
        rgb: [46,139,87],
        r: 46,
        g: 139,
        b: 87
    },
];
