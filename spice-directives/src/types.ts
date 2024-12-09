export type unitsParameterProps = {
    value: number,
    units: string,
}

export type unitlessParameterProps = {
    value: number,
}

export type textParameterProps = {
    value: string,
}

export type booleanParameterProps = {
    value: boolean,
    trueMessage?: string,
    falseMessage?: string,
}

export type selectParameterProps = {
    options: string[],
    value: string,
}

export type parameterPropTypes = unitsParameterProps | unitlessParameterProps | textParameterProps | booleanParameterProps | selectParameterProps

export type siSuffix = 'p' | 'n' | 'u' | 'm' | 'unity' | 'k' | 'Meg' | 'G' | 'T'

export type parameterChipStatus = 'optionalUnvalid' | 'optionalvalid' | 'requiredUnvalid' | 'requiredvalid'
