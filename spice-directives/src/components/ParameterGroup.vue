<script setup lang="ts">
import type { booleanParameterProps, parameterChipStatus, parameterChipProps, parameterChipValue, parameterProps, selectParameterProps, textParameterProps, unitlessParameterProps, unitsParameterProps, siPrefix } from '@/types';
import { computed, ref, type Component, type ComputedRef, type Ref } from 'vue';
import ParameterChipUnits from './ParameterChipUnits.vue';
import ParameterChipUnitless from './ParameterChipUnitless.vue';
import ParameterChipSelect from './ParameterChipSelect.vue';
import ParameterChip from './ParameterChip.vue';
import ParameterGroup from './ParameterGroup.vue'
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

// const docOpt1 = "<-Boolean> <_Text> <_Greeting:howdy> <oct, dec, lin> <Nsteps:20> [<StartFreq:100:k:Hz> <EndFreq:1:Hz>]"
// const docOpt1 = ".dc <_Source Name:V1> <Vstart:0:V> <Vstop:5:V> <Vincrement:10:m:V> <Nsteps:1> [<_Source Name 2> <Vstart2:V> <Vstop2:V> <Vincr2:V>]"

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
    const reversedDocOpt = docOpt.split('').reverse().join('')
    const lastBracketIndex = reversedDocOpt.indexOf(']')

    return parseSimpleDocOpt(docOpt.slice(0, firstBracketIndex)).concat( // simple-parse everything before the first bracket
            [docOpt.slice(firstBracketIndex + 1, lastBracketIndex - 1)]).concat( // complex-parse the things between the brackets
                parseSimpleDocOpt(docOpt.slice(docOpt.length - lastBracketIndex + 1))) // simple-parse everything after the last bracket
                // do not ever count the brackets themselves
}

</script>

<template>
    <div class="parameterGroupOuter">
        <div v-for="option in parseDocOpt(props.docOpt)">
            <component :is="isSingleParameter(option) ? ParameterChip : ParameterGroup" :doc-opt="option"></component>
        </div>
    </div>
</template>

<style scoped>

.parameterGroupOuter {
    display: inline-flex;
    background-color: grey;
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin-left: 1rem;
    border-radius: 10px;
    margin-top: 1rem;
    border-color: black;
    border-style: solid;
}

</style>
