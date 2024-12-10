import type { siPrefix } from "./types";

export const siPrefixToExponent: { [key in siPrefix] : number } = {
    'p': 1e-12,
    'n': 1e-9,
    'u': 1e-6,
    'm': 1e-3,
    'unity': 1,
    'k': 1e3,
    'Meg': 1e6,
    'G': 1e9,
    'T': 1e12,
}
