<script setup lang="ts">
import type { unitlessParameterProps } from '@/types';

defineProps<unitlessParameterProps>()
</script>

<template>
    <div class="value">
      <input type="text" :value=value>
    </div>
</template>

<style scoped>
  @import './ParameterChipStyles.css'
</style>
