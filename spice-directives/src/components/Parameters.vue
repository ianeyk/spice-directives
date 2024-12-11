<script setup lang="ts">
import type { booleanParameterProps, parameterChipStatus, parameterChipProps, parameterChipValue, parameterProps, selectParameterProps, textParameterProps, unitlessParameterProps, unitsParameterProps, siPrefix } from '@/types';
import { computed, ref, type Component, type ComputedRef, type Ref } from 'vue';
import ParameterChipUnits from './ParameterChipUnits.vue';
import ParameterChipUnitless from './ParameterChipUnitless.vue';
import ParameterChipSelect from './ParameterChipSelect.vue';
import ParameterChip from './ParameterChip.vue';
import ParameterChipBoolean from './ParameterChipBoolean.vue';
import ParameterChipText from './ParameterChipText.vue';
import ParameterGroup from './ParameterGroup.vue';

const assert = (assertion: boolean, message: string = "") => {
    if (!assertion) {
        console.error("Assertion error: " + message)
    }
}

const props = defineProps<{
    docOpt: string
}>()

const docOptSegments: string[] = ["<_Source Name:V1> <Vstart:0:V> <Vstop:5:V> <Vincrement:10:m:V>", "<_Source Name 2> <Vstart2:V> <Vstop:V> <Vincr2:V>"]

</script>

<template>
    <div class="parametersOuter">
        <div v-for="docOptSegment in docOptSegments">
            <ParameterGroup :doc-opt="docOptSegment"></ParameterGroup>
        </div>
    </div>
</template>

<style scoped>

.parametersOuter {
    display: flex;
}

</style>
