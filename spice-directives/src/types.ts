export type unitsParameterProps = {
    value: number,
    units: string,
}

export type unitlessParameterProps = {
    value: number,
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

export type parameterPropTypes = unitsParameterProps | unitlessParameterProps | booleanParameterProps | selectParameterProps
