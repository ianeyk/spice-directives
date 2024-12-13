<script setup lang="ts">
import type { parameterChipValue } from '@/types';
import { computed, ref, watch, type ComputedRef, type Ref } from 'vue';
import ParameterChip from './ParameterChip.vue';
import ParameterGroup from './ParameterGroup.vue'

const assert = (assertion: boolean, message: string = "") => {
    if (!assertion) {
        console.error("Assertion error: " + message)
    }
}

const props = withDefaults(defineProps<{
    docOpt: string,
    topLevel?: boolean,
    directiveName?: string,
    index?: number,
    optional?: boolean,
}>(), {
    topLevel: false,
    directiveName: undefined,
    index: 0,
    optional: false,
})
const emit = defineEmits<{'parameterChanged': [parameterChipValue]}>()

const isSingleParameter = (docOpt: string): boolean => {
    return !(docOpt.includes('<') || docOpt.includes('>'))
}

const isSimpleDocOpt = (docOpt: string): boolean => {
    return !(docOpt.includes('[') || docOpt.includes(']') || docOpt.includes('(') || docOpt.includes(')'))
}

const parseSimpleDocOpt = (docOpt: string): string[] => {
    // a simple doc opt is one with no brackets or parentheses, only raw options enclosed in <>
    const parameterChips: string[] = []
    let option = ""
    for (const char of docOpt) {
        if (char == '<') {
            option = ""
            continue
        } else if (char == '>') {
            parameterChips.push(option)
            option = ""
            continue
        }

        option += char
    }
    return parameterChips
}

const parseDocOpt = (docOpt: string): string[] => {
    if (isSimpleDocOpt(docOpt)) {
        return parseSimpleDocOpt(docOpt)
    }
    const firstBracketIndex = docOpt.indexOf('[')
    let closingBracketIndex = 0
    let netBrackets = 0
    for (let index = firstBracketIndex; index < docOpt.length; index++) {
        if (docOpt[index] == '[') {
            netBrackets++
        } else if (docOpt[index] == ']') {
            netBrackets--
            if (netBrackets == 0) {
                closingBracketIndex = index
                break
            }
        }
    }

    let betweenBrackets = docOpt.slice(firstBracketIndex + 1, closingBracketIndex)
    if (isSimpleDocOpt(betweenBrackets) && isSingleParameter(betweenBrackets)) {
        betweenBrackets = "<" + betweenBrackets + ">"
    }

    return parseDocOpt(docOpt.slice(0, firstBracketIndex)).concat( // simple-parse everything before the first bracket
            [betweenBrackets]).concat( // send the things between the brackets for another recursive round of parsing
            parseDocOpt(docOpt.slice(closingBracketIndex + 1))) // simple-parse everything after the last bracket
                // do not ever count the brackets themselves
}

const parsedDocOpt = parseDocOpt(props.docOpt)

// everything starts out as optional
// as soon as a parameter chip receives a value, it becomes non-optional
// if one parameter chip is non-optional, then the entire parameter group is non-optional
// if a parameter group is non-optional, then every parameter chip inside it is non-optional
// the top level parameter group is always non-optional


// the top level parameter group is always non-optional
// a parameter group is optional if all of its parameter chips are empty (or: simply if it is empty)
// a parameter group is empty if all of its parameter chips are empty
// a parameter chip is empty if it is invalid

// a parameter group is valid if all of its parameter chips are valid or optional

const childrenValid: Ref<boolean[]> = ref(Array(parsedDocOpt.length).fill(false))
const childrenEmpty: Ref<boolean[]> = ref(Array(parsedDocOpt.length).fill(true))
const childrenParameters: Ref<string[]> = ref(Array(parsedDocOpt.length).fill(""))

const empty: ComputedRef<boolean> = computed(() => {
    return childrenEmpty.value.every(x => x) // if each child is either optional or valid
})
const optional: ComputedRef<boolean> = computed(() => {
    return (!props.topLevel && empty.value)
})
const valid: ComputedRef<boolean> = computed(() => {
    return optional.value || childrenValid.value.every(x => x) // if each child is either optional or valid
})
const parameter: ComputedRef<number | string | boolean> = computed(() => {
    // if (!valid.value) {
    //     if (optional) {
    //         return ""
    //     } else {
    //         return props.docOpt
    //     }
    // }
    if (childrenParameters.value.length == 0) {
        return ""
    }
    return childrenParameters.value.reduce((a, b) => (a + " " + b).trim()) // combine child parameters with spaces in between
})

const parameterChanged = (newValues: parameterChipValue) => {
    childrenValid.value[newValues.index] = newValues.valid
    childrenEmpty.value[newValues.index] = newValues.empty
    childrenParameters.value[newValues.index] = String(newValues.parameter)
}

watch([parameter, valid], () => {
  emit('parameterChanged', {
    index: props.index,
    parameter: parameter.value,
    valid: valid.value,
    empty: empty.value,
  })
});

</script>

<template>
    <div>
        <div class="parameterGroup">
            <div v-for="(option, index) in parsedDocOpt" :key="index">
                <component :is="isSingleParameter(option) ? ParameterChip : ParameterGroup" :doc-opt="option" :index="index" :optional="optional" @parameter-changed="parameterChanged"></component>
            </div>
        </div>
        <div class="directiveContainer" v-if="topLevel && directiveName !== undefined">
            <input type="text" :value="directiveName + ' ' + parameter">
        </div>
    </div>
</template>

<style scoped>

.parameterGroup {
    display: inline-flex;
    background-color: grey;
    padding-bottom: 1rem;
    margin-left: 1rem;
    border-radius: 10px;
    margin-bottom: 1rem;
    border-color: black;
    border-style: solid;
}

.directiveContainer {
    display: block;
    width: 90%;
    margin-left: 1rem;
}

.directiveContainer input {
    width: 100%;
}

</style>
