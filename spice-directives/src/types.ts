export type unitsParameterProps = {
    value: number,
    units: string,
}

export type unitlessParameterProps = {
    value: number,
}

export type booleanParameterProps = {
    value: boolean,
}

export type selectParameterProps = {
    values: string[],
    value: number, // the index of the selected value
}

export type parameterPropTypes = unitsParameterProps | unitlessParameterProps | booleanParameterProps | selectParameterProps
