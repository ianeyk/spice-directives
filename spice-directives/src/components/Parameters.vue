<script setup lang="ts">
import { ref, type Ref } from 'vue';
import ParameterGroup from './ParameterGroup.vue';
import type { parameterChipValue } from '@/types';

const props = defineProps<{
    parameterSets: string[]
}>()

const parameterParts = props.parameterSets.map((directive: string) => { return {
    name: directive.slice(0, directive.indexOf(' ')), // everything up to the first space
    parameters: directive.slice(directive.indexOf(' ') + 1), // everything after the first space
}})

const parameterNamesAsDocOpt: string = "<" + parameterParts.map(directive => directive.name).join(", ") + ">"

const currentParameters: Ref<string> = ref(parameterParts[0].name)

const selectedParameterNameChanged = (newValues: parameterChipValue) => {
    currentParameters.value = String(newValues.parameter)
}

const directiveChanged = (newValues: parameterChipValue) => {
    directive.value = String(newValues.parameter)
}

const directive: Ref<string> = ref("")


</script>

<template>
    <div class="chipContainer">
        <ParameterGroup :doc-opt="parameterNamesAsDocOpt" :top-level="true" :index="0" :optional="false" @parameter-changed="selectedParameterNameChanged"></ParameterGroup>
        <div v-for="parametersPart in parameterParts">
            <ParameterGroup :class="parametersPart.name == currentParameters ? 'shown' : 'hidden'" :docOpt="parametersPart.parameters" :topLevel="true" :index="0" :optional="false" @parameter-changed="directiveChanged"></ParameterGroup>
        </div>
    </div>
    <div class="directiveContainer">
        <input type="text" v-model="directive">
    </div>
</template>

<style scoped>

.chipContainer {
    margin: auto;
    display: flex;
    margin-top: 1rem;
    padding-bottom: 1rem;
    width: 90%;
    overflow-x: scroll;
}

.directiveContainer {
    display: block;
    width: 90%;
}

.directiveContainer input {
    width: 100%;
}

.hidden {
    display: none;
}

</style>
