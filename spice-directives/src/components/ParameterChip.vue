<script setup lang="ts">
import type { booleanParameterProps, selectParameterProps, unitlessParameterProps, unitsParameterProps } from '@/types';
import type { Component } from 'vue';

defineProps<{
    name: string,
    parameterType: Component,
    parameterProps: unitsParameterProps | unitlessParameterProps | booleanParameterProps | selectParameterProps,
}>()
</script>

<template>
  <div class="outer">
    <h1 class="name">{{ name }}</h1>
    <component :is="parameterType" v-bind="parameterProps"></component>
  </div>
</template>

<style scoped>

.outer {
    display: inline-block;
    width: 12rem;
    background-color: lightgrey;
    padding: 1rem;
    padding-top: 0;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    border-radius: 1rem;
}

.name {
    display: block;
    text-align: center;
    font-size: x-large;
    line-height: normal;
}

</style>
