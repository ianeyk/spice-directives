<script setup lang="ts">
import type { parameterChipStatus, parameterChipProps, parameterChipValue, siPrefix, parameterChipInputValue } from '@/types';
import { computed, ref, watch, type ComputedRef, type Ref } from 'vue';
import ParameterChipBoolean from './ParameterChipBoolean.vue';
import ParameterChipText from './ParameterChipText.vue';
import ParameterChipSelect from './ParameterChipSelect.vue';
import ParameterChipUnits from './ParameterChipUnits.vue';
import ParameterChipUnitless from './ParameterChipUnitless.vue';

const assert = (assertion: boolean, message: string = "") => {
    if (!assertion) {
        console.error("Assertion error: " + message)
    }
}

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

const props = defineProps<{
    docOpt: string,
    index: number,
    optional: boolean,
}>()
const emit = defineEmits<{'parameterChanged': [parameterChipValue]}>()

const parsedProps: parameterChipProps = parseOption(props.docOpt, true)

const valid: Ref<boolean> = ref(parsedProps.valid)

const parameterToString = (newValue: string | number | boolean) => {
    if (!valid.value) {
        if (props.optional) {
            return ""
        } else {
            return "<" + props.docOpt + ">"
        }
    } else {
        return String(newValue)
    }
}

const basicParameter: Ref<string> = ref(String(parsedProps.parameterProps.value))
const parameter: Ref<string> = ref(parameterToString(parsedProps.parameterProps.value))

const parameterChanged = (newValues: parameterChipInputValue) => {
    valid.value = newValues.valid
    basicParameter.value = String(newValues.parameter)
    parameter.value = parameterToString(newValues.parameter)
}

const status: ComputedRef<parameterChipStatus> = computed(() => props.optional ?
    (valid.value ? 'optionalvalid' : 'optionalInvalid') :
    (valid.value ? 'requiredvalid' : 'requiredInvalid')
)

watch(props, () => {
    parameter.value = parameterToString(basicParameter.value)
})

watch([parameter, valid], () => {
  emit('parameterChanged', {
    index: props.index,
    parameter: parameter.value,
    valid: valid.value,
    empty: !valid.value,
  })
}, {immediate: true});

parameter.value = parameterToString(parsedProps.parameterProps.value)


</script>

<template>
  <div :class="['outer', status]">
    <h1 class="name">{{ parsedProps.name }}</h1>
    <component :is="parsedProps.inputComponent" v-bind="parsedProps.parameterProps" @parameter-changed="parameterChanged"></component>
  </div>
</template>

<style scoped>

.outer {
    display: inline-block;
    padding: 1rem;
    padding-top: 0;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    border-radius: 1rem;
}

.outer.optionalvalid {
    background-color: lightgreen;
}

.outer.optionalInvalid {
    background-color: lightgrey;
}

.outer.requiredvalid {
    background-color: green;
}

.outer.requiredInvalid {
    background-color: orange;
}

.name {
    display: block;
    text-align: center;
    font-size: x-large;
    line-height: normal;
}

</style>
