<script setup lang="ts">
import type { parameterChipValue, selectParameterProps } from '@/types';
import { ref, watch, type Ref } from 'vue';

const props = defineProps<selectParameterProps>()
const emit = defineEmits<{'parameterChanged': [parameterChipValue]}>()

const parameter: Ref<string> = ref(props.value)
const valid: Ref<boolean> = ref(true)

watch([parameter, valid], () => {
  emit('parameterChanged', {
    parameter: parameter.value,
    valid: valid.value,
  })
});

</script>

<template>
    <div class="value">
      <select v-model="parameter">
        <option v-for="option in options" :value="option">{{ option }}</option>
      </select>
    </div>
</template>

<style scoped>
  @import './ParameterChipStyles.css'
</style>
