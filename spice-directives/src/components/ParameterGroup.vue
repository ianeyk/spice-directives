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

// const docOpt1 = "<-Boolean> <_Text> <_Greeting:howdy> <oct, dec, lin> <Nsteps:20> [<StartFreq:100:k:Hz> <EndFreq:1:Hz>]"
// const docOpt1 = ".dc <_Source Name:V1> <Vstart:0:V> <Vstop:5:V> <Vincrement:10:m:V> <Nsteps:1> [<_Source Name 2> <Vstart2:V> <Vstop2:V> <Vincr2:V>]"

const parseDocOpt = (docOpt: string): {docOpt: string, optional: boolean}[] => {
    const parameterChips: {docOpt: string, optional: boolean}[] = []
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
                parameterChips.push({docOpt: option, optional: optional})
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
    <div class="parameterGroupOuter">
        <div v-for="option in parseDocOpt(props.docOpt)">
            <ParameterChip :doc-opt="option.docOpt" :optional="option.optional"></ParameterChip>
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
}

</style>
