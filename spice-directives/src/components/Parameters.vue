<script setup lang="ts">
import { ref, type Ref } from 'vue';
import ParameterChip from './ParameterChip.vue';
import ParameterChipSelect from './ParameterChipSelect.vue';
import ParameterGroup from './ParameterGroup.vue';
import type { parameterChipValue } from '@/types';

const props = defineProps<{
    directives: string[]
}>()

const directiveParts = props.directives.map((directive: string) => { return {
    name: directive.slice(0, directive.indexOf(' ')), // everything up to the first space
    parameters: directive.slice(directive.indexOf(' ') + 1), // everything after the first space
}})

const directiveNamesAsDocOpt: string = "<" + directiveParts.map(directive => directive.name).join(", ") + ">"

const currentDirective: Ref<string> = ref(directiveParts[0].name)

const parameterChanged = (newValues: parameterChipValue) => {
    currentDirective.value = String(newValues.parameter)
}


</script>

<template>
    <div class="chipContainer">
        <ParameterGroup :doc-opt="directiveNamesAsDocOpt" :top-level="true" :index="0" :optional="false" @parameter-changed="parameterChanged"></ParameterGroup>
        <div v-for="directive in directiveParts">
            <ParameterGroup :class="directive.name == currentDirective ? 'shown' : 'hidden'" :docOpt="directive.parameters" :topLevel="true" :index="0" :optional="false"></ParameterGroup>
        </div>
    </div>
</template>

<style scoped>

.chipContainer {
  display: flex;
  margin-top: 1rem;
  padding-bottom: 1rem;
  width: 80%;
  overflow-x: scroll;
}

.hidden {
    display: none;
}

</style>
