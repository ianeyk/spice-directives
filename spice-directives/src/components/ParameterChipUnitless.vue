<script setup lang="ts">
import type { unitlessParameterProps } from '@/types';
import { ref, type Ref } from 'vue';

const props = defineProps<unitlessParameterProps>()

const parameter: Ref<number> = ref(props.value)

</script>

<template>
    <div class="value">
      <input type="number" v-model="parameter">
    </div>
</template>

<style scoped>
  @import './ParameterChipStyles.css'
</style>
