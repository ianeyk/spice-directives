<script setup lang="ts">
import type { booleanParameterProps } from '@/types';
import { ref, type Ref } from 'vue';

const props = withDefaults(defineProps<booleanParameterProps>(),
{
    trueMessage: 'True',
    falseMessage: 'False',
})

const parameter: Ref<boolean> = ref(props.value)

const toggleValue = () => {
    parameter.value = !parameter.value
}
</script>

<template>
    <div class="value">
        <button type="button" v-on:click="toggleValue">{{ parameter ? trueMessage : falseMessage }}</button>
    </div>
</template>

<style scoped>
  @import './ParameterChipStyles.css'
</style>
