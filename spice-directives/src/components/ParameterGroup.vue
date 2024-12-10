<script setup lang="ts">
import type { booleanParameterProps, parameterChipStatus, parameterChipProps, parameterChipValue, parameterProps, selectParameterProps, textParameterProps, unitlessParameterProps, unitsParameterProps } from '@/types';
import { computed, ref, type Component, type ComputedRef, type Ref } from 'vue';
import ParameterChipUnits from './ParameterChipUnits.vue';
import ParameterChipUnitless from './ParameterChipUnitless.vue';
import ParameterChipSelect from './ParameterChipSelect.vue';
import ParameterChip from './ParameterChip.vue';

const assert = (assertion: boolean, message: string = "") => {
    if (!assertion) {
        console.error("Assertion error: " + message)
    }
}

const props = defineProps<{
    docOpt: string
}>()

const parseOption = (option: string): parameterChipProps => {
    // parse the contents inside of a <>
    // <Nsteps> becomes Unitless
    // <EndFreq:Hz> becomes Units
    // <aa, bb, cc> becomes Select
    let parameterName: string
    let parameterChipInput: Component
    let parameterProps: parameterProps

    const splitByComma = option.split(', ')
    if (splitByComma.length > 1) {
        parameterName = "Select 1"
        parameterChipInput = ParameterChipSelect
        parameterProps = {
            options: splitByComma,
            value: splitByComma[0],
        }
    }
    else {
        const splitByColon = option.split(':')
        assert(splitByColon.length <= 2, "More than one ':' found in option '" + option + "'")
        if (splitByColon.length == 2) {
            parameterName = splitByColon[0]
            parameterChipInput = ParameterChipUnits
            parameterProps = {
                value: 0,
                units: splitByColon[1],
            }
        } else {
            parameterName = splitByColon[0]
            parameterChipInput = ParameterChipUnitless
            parameterProps = {
                value: 0,
            }
        }
    }
    return {
        name: parameterName,
        optional: false,
        valid: false,
        inputComponent: parameterChipInput,
        parameterProps: parameterProps,
    }
}

const docOpt1 = "<oct, dec, lin> <Nsteps> <StartFreq:Hz> <EndFreq:Hz>"

const parseDocOpt = (docOpt: string): parameterChipProps[] => {
    const parameterChips: parameterChipProps[] = []
    let readingOption = false
    let option = ""
    for (const char of docOpt1) {
        if (char == '<') {
            readingOption = true
            option = ""
            continue
        } else if (char == '>') {
            parameterChips.push(parseOption(option))
            readingOption = false
            continue
        }

        if (readingOption) {
            option += char
        }
    }
    return parameterChips
}

// const parameterChips = [parseOption("Nsteps"), parseOption("EndFreq:Hz"), parseOption("aa, bb, cc")]

</script>

<template>
  <div class="parameterGroupOuter" v-for="chip in parseDocOpt(docOpt1)">
    <ParameterChip :name="chip.name" :optional="chip.optional" :valid="chip.valid" :input-component="chip.inputComponent" :parameter-props="chip.parameterProps"></ParameterChip>
  </div>
</template>

<style scoped>

.parameterGroupOuter {
    display: inline-block;
}

</style>
