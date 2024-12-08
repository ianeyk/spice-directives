<script setup lang="ts">
import type { selectParameterProps } from '@/types';

defineProps<selectParameterProps>()
</script>

<template>
    <div class="value">
      <select>
        <option v-for="option in options" :value="option">{{ option }}</option>
        <!-- <option value="p">p{{ units }}</option>
        <option value="n">n{{ units }}</option>
        <option value="u">u{{ units }}</option>
        <option value="m">m{{ units }}</option>
        <option selected value="unity">{{ units }}</option>
        <option value="Meg">M{{ units }}</option>
        <option value="G">G{{ units }}</option> -->
      </select>
    </div>
</template>

<style scoped>
  @import './ParameterChipStyles.css'
</style>
