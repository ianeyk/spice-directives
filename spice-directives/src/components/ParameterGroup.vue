<script setup lang="ts">
import type { booleanParameterProps, parameterChipStatus, parameterChipProps, parameterChipValue, parameterProps, selectParameterProps, textParameterProps, unitlessParameterProps, unitsParameterProps, siPrefix } from '@/types';
import { computed, ref, type Component, type ComputedRef, type Ref } from 'vue';
import ParameterChipUnits from './ParameterChipUnits.vue';
import ParameterChipUnitless from './ParameterChipUnitless.vue';
import ParameterChipSelect from './ParameterChipSelect.vue';
import ParameterChip from './ParameterChip.vue';
import ParameterChipBoolean from './ParameterChipBoolean.vue';
import ParameterChipText from './ParameterChipText.vue';

const assert = (assertion: boolean, message: string = "") => {
    if (!assertion) {
        console.error("Assertion error: " + message)
    }
}

const props = defineProps<{
    docOpt: string
}>()

const parseOption = (option: string, optional: boolean = false): parameterChipProps => {
    // parse the contents inside of a <>
    // <--Option> becomes Boolean
    // <_Name> becomes Text
    // <Nsteps> becomes Unitless
    // <EndFreq:Hz> becomes Units
    // <aa, bb, cc> becomes Select

    const splitByColon = option.split(':')
    assert(splitByColon.length <= 4, "More than one ':' found in option '" + option + "'")
    const splitByComma = option.split(', ')

    // BOOLEAN PARAMETER
    if (option.length > 0 && option[0] == '-') {
        return {
            name: option.replace("-", ""),
            optional: true,
            valid: false,
            inputComponent: ParameterChipBoolean,
            parameterProps: {
                value: false,
                trueMessage: "Yes",
                falseMessage: "No",
            },
        }
    }

    // TEXT PARAMETER
    if (option.length > 0 && option[0] == '_') {
        switch (splitByColon.length) {
            default: // case(1)
                return {
                    name: option.replace("_", ""),
                    optional: optional,
                    valid: false,
                    inputComponent: ParameterChipText,
                    parameterProps: {
                        value: "",
                    },
                }
            case(2):
                return {
                    name: splitByColon[0].replace("_", ""),
                    optional: optional,
                    valid: true,
                    inputComponent: ParameterChipText,
                    parameterProps: {
                        value: splitByColon[1],
                    },
                }
        }
    }

    // SELECT PARAMETER
    if (splitByComma.length > 1) {
        return {
            name: "Select 1",
            optional: optional,
            valid: true,
            inputComponent: ParameterChipSelect,
            parameterProps: {
                options: splitByComma,
                value: splitByComma[0],
            },
        }
    }

    // UNITS PARAMETER
    if (splitByColon.length >= 3 || (splitByColon.length == 2 && isNaN(Number(splitByColon[1])))) {
        switch (splitByColon.length) {
            default: // case(2)
                return {
                    name: splitByColon[0],
                    optional: optional,
                    valid: false,
                    inputComponent: ParameterChipUnits,
                    parameterProps: {
                        value: "",
                        units: splitByColon[1],
                    },
                }
            case(3):
            return {
                name: splitByColon[0],
                optional: optional,
                valid: true,
                inputComponent: ParameterChipUnits,
                parameterProps: {
                    value: Number(splitByColon[1]),
                    units: splitByColon[2],
                },
            }
            case(4):
            return {
                name: splitByColon[0],
                optional: optional,
                valid: true,
                inputComponent: ParameterChipUnits,
                parameterProps: {
                    value: Number(splitByColon[1]),
                    unitPrefix: splitByColon[2] as siPrefix,
                    units: splitByColon[3],
                },
            }
        }

    // UNITLESS PARAMETER
    } else {
        switch (splitByColon.length) {
            default: // case(1)
                return {
                    name: splitByColon[0],
                    optional: optional,
                    valid: false,
                    inputComponent: ParameterChipUnitless,
                    parameterProps: {
                        value: "",
                    },
                }
            case(2):
                return {
                    name: splitByColon[0],
                    optional: optional,
                    valid: true,
                    inputComponent: ParameterChipUnitless,
                    parameterProps: {
                        value: Number(splitByColon[1]),
                    },
                }
        }
    }
}

// const docOpt1 = "<-Boolean> <_Text> <_Greeting:howdy> <oct, dec, lin> <Nsteps:20> [<StartFreq:100:k:Hz> <EndFreq:1:Hz>]"
const docOpt1 = ".dc <_Source Name:V1> <Vstart:0:V> <Vstop:5:V> <Vincrement:10:m:V> <Nsteps:1> [<_Source Name 2> <Vstart2:V> <Vstop2:V> <Vincr2:V>]"

const parseDocOpt = (docOpt: string): parameterChipProps[] => {
    const parameterChips: parameterChipProps[] = []
    let option = ""
    let optional = false
    for (const char of docOpt) {
        if (char == '<' || char == '[') {
            option = ""
            if (char == '[') {
                optional = true
            }
            continue
        } else if (char == '>' || char == ']') {
            if (option.replace(/\s/g, "").length > 0) {
                parameterChips.push(parseOption(option, optional))
            }
            option = ""
            if (char == ']') {
                optional = false
            }
            continue
        }

        option += char
    }
    return parameterChips
}

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
