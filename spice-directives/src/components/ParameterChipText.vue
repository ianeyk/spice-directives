<script setup lang="ts">
import type { parameterChipInputValue, parameterChipValue, textParameterProps } from '@/types';
import { computed, ref, watch, type ComputedRef, type Ref } from 'vue';

const props = defineProps<textParameterProps>()
const emit = defineEmits<{'parameterChanged': [parameterChipInputValue]}>()

const parameter: Ref<string> = ref(props.value)
const valid: ComputedRef<boolean> = computed(() => parameter.value.length > 0)

watch([parameter, valid], () => {
  emit('parameterChanged', {
    parameter: parameter.value,
    valid: valid.value,
  })
});

</script>

<template>
    <div class="value">
      <input type="text" v-model="parameter">
    </div>
</template>

<style scoped>
  @import './ParameterChipStyles.css'
</style>
