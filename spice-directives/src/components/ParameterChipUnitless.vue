<script setup lang="ts">
import type { parameterChipValue, unitlessParameterProps } from '@/types';
import { computed, ref, watch, type ComputedRef, type Ref } from 'vue';

const props = defineProps<unitlessParameterProps>()
const emit = defineEmits<{'parameterChanged': [parameterChipValue]}>()

const rawParameter: Ref<number | string> = ref(props.value)
const parameter: ComputedRef<number> = computed(() => typeof(rawParameter.value) === "number" ? rawParameter.value : NaN)

const valid: ComputedRef<boolean> = computed(() => {
  return !Number.isNaN(parameter.value)
})

watch([parameter, valid], () => {
  emit('parameterChanged', {
    parameter: parameter.value,
    valid: valid.value,
  })
});

</script>

<template>
    <div class="value">
      <input type="number" v-model="rawParameter">
    </div>
</template>

<style scoped>
  @import './ParameterChipStyles.css'
</style>
