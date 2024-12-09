<script setup lang="ts">
import type { textParameterProps } from '@/types';
import { ref, type Ref } from 'vue';

const props = defineProps<textParameterProps>()

const parameter: Ref<string> = ref(props.value)

</script>

<template>
    <div class="value">
      <input type="text" v-model="parameter">
    </div>
</template>

<style scoped>
  @import './ParameterChipStyles.css'
</style>
