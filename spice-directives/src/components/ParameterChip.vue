<script setup lang="ts">
import type { booleanParameterProps, parameterChipStatus, selectParameterProps, textParameterProps, unitlessParameterProps, unitsParameterProps } from '@/types';
import { computed, ref, type Component, type ComputedRef, type CSSProperties, type Ref } from 'vue';

const props = withDefaults(defineProps<{
    name: string,
    optional?: boolean,
    valid?: boolean,
    parameterType: Component,
    parameterProps: unitsParameterProps | unitlessParameterProps | textParameterProps | booleanParameterProps | selectParameterProps,
}>(), {
    optional: false,
    valid: false,
})

const optional: Ref<boolean> = ref(props.optional)
const valid: Ref<boolean> = ref(props.valid)

const status: ComputedRef<parameterChipStatus> = computed(() => optional.value ?
    (valid.value ? 'optionalvalid' : 'optionalUnvalid') :
    (valid.value ? 'requiredvalid' : 'requiredUnvalid')
)

</script>

<template>
  <div :class="['outer', status]">
    <h1 class="name">{{ name }}</h1>
    <component :is="parameterType" v-bind="parameterProps"></component>
  </div>
</template>

<style scoped>

.outer {
    display: inline-block;
    width: 12rem;
    /* background-color: lightgrey; */
    padding: 1rem;
    padding-top: 0;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    border-radius: 1rem;
}

.outer.optionalvalid {
    background-color: lightgreen;
}

.outer.optionalUnvalid {
    background-color: lightgrey;
}

.outer.requiredvalid {
    background-color: green;
}

.outer.requiredUnvalid {
    background-color: orange;
}

.name {
    display: block;
    text-align: center;
    font-size: x-large;
    line-height: normal;
}

</style>
