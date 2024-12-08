<script setup lang="ts">
import type { unitsParameterProps } from '@/types';

defineProps<unitsParameterProps>()
</script>

<template>
    <div class="value">
      <input type="text" :value=value>
      <select>
        <option value="p">p{{ units }}</option>
        <option value="n">n{{ units }}</option>
        <option value="u">u{{ units }}</option>
        <option value="m">m{{ units }}</option>
        <option selected value="unity">{{ units }}</option>
        <option value="Meg">M{{ units }}</option>
        <option value="G">G{{ units }}</option>
      </select>
    </div>
</template>

<style scoped>

.value {
  display: flex;
  justify-content: center;
}

input, select {
    display: inline-block;
    width: 5rem;
    height: 4rem;
    font-size: xx-large;
}

input {
    width: 6rem;
}

</style>
