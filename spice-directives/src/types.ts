import type { Component } from "vue"

export type unitsParameterProps = {
    value: number | string,
    units: string,
    unitPrefix?: siPrefix,
}

export type unitlessParameterProps = {
    value: number | string,
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

export type parameterGroupProps = {
    docOpt: string,
}

export type parameterProps = unitsParameterProps | unitlessParameterProps | textParameterProps | booleanParameterProps | selectParameterProps

export type siPrefix = 'p' | 'n' | 'u' | 'm' | 'unity' | 'k' | 'Meg' | 'G' | 'T'

export type parameterChipStatus = 'optionalInvalid' | 'optionalvalid' | 'requiredInvalid' | 'requiredvalid'

export type parameterChipInputValue = {
    parameter: number | string | boolean,
    valid: boolean,
}

export type parameterChipValue = {
    index: number,
    parameter: number | string | boolean,
    valid: boolean,
    empty: boolean,
}

export type parameterChipProps = {
    name: string,
    optional: boolean,
    valid: boolean,
    inputComponent: Component,
    parameterProps: parameterProps,
}
