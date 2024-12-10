<script setup lang="ts">
import type { booleanParameterProps, parameterChipStatus, parameterChipProps, parameterChipValue, selectParameterProps, textParameterProps, unitlessParameterProps, unitsParameterProps } from '@/types';
import { computed, ref, type Component, type ComputedRef, type Ref } from 'vue';

const props = withDefaults(defineProps<parameterChipProps>(), {
    optional: false,
    valid: false,
})

const optional: Ref<boolean> = ref(props.optional)
const valid: Ref<boolean> = ref(props.valid)
const parameter: Ref<number | string | boolean> = ref(props.parameterProps.value)

const parameterChanged = (newValues: parameterChipValue) => {
    parameter.value = newValues.parameter
    valid.value = newValues.valid
}

const status: ComputedRef<parameterChipStatus> = computed(() => optional.value ?
    (valid.value ? 'optionalvalid' : 'optionalInvalid') :
    (valid.value ? 'requiredvalid' : 'requiredInvalid')
)

</script>

<template>
  <div :class="['outer', status]">
    <h1 class="name">{{ name }}</h1>
    <component :is="inputComponent" v-bind="parameterProps" @parameter-changed="parameterChanged"></component>
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
