<script setup lang="ts">
import type { unitlessParameterProps } from '@/types';
import { computed, ref, type ComputedRef, type Ref } from 'vue';

const props = defineProps<unitlessParameterProps>()

const rawParameter: Ref<number | string> = ref(props.value)
const parameter: ComputedRef<number> = computed(() => typeof(rawParameter.value) === "number" ? rawParameter.value : NaN)

const valid: ComputedRef<boolean> = computed(() => {
  return !Number.isNaN(parameter.value)
})

</script>

<template>
    <div class="value">
      <input type="number" v-model="rawParameter">
    </div>
</template>

<style scoped>
  @import './ParameterChipStyles.css'
</style>
