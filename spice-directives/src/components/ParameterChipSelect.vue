<script setup lang="ts">
import type { selectParameterProps } from '@/types';

defineProps<selectParameterProps>()
</script>

<template>
    <div class="value">
      <select>
        <option v-for="option in options" :value="option">{{ option }}</option>
      </select>
    </div>
</template>

<style scoped>
  @import './ParameterChipStyles.css'
</style>
