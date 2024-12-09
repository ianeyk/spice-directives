<script setup lang="ts">
import type { selectParameterProps } from '@/types';
import { ref, type Ref } from 'vue';

const props = defineProps<selectParameterProps>()

const parameter: Ref<string> = ref(props.value)
const valid: Ref<boolean> = ref(true)

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
