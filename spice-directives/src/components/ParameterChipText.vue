<script setup lang="ts">
import type { textParameterProps } from '@/types';
import { computed, ref, type ComputedRef, type Ref } from 'vue';

const props = defineProps<textParameterProps>()

const parameter: Ref<string> = ref(props.value)
const valid: ComputedRef<boolean> = computed(() => parameter.value.length > 0)

</script>

<template>
    <div class="value">
      <input type="text" v-model="parameter">
    </div>
</template>

<style scoped>
  @import './ParameterChipStyles.css'
</style>
