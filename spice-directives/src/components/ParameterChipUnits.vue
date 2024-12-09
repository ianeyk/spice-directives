<script setup lang="ts">
import { siSuffixToExponent } from '@/constants';
import type { siSuffix, unitsParameterProps } from '@/types';
import { computed, ref, type ComputedRef, type Ref } from 'vue';

const props = defineProps<unitsParameterProps>()

const parameterSuffix: Ref<siSuffix> = ref('unity')
const rawParameterMantissa: Ref<number | string> = ref(props.value)
const parameterValue: ComputedRef<number> = computed(() => typeof(rawParameterMantissa.value) === "number" ? rawParameterMantissa.value : NaN)

const parameter: ComputedRef<number> = computed(() => parameterValue.value * siSuffixToExponent[parameterSuffix.value])

const valid: ComputedRef<boolean> = computed(() => {
  return !Number.isNaN(parameter.value)
})

</script>

<template>
    <div class="value">
      <input type="number" v-model="rawParameterMantissa">
      <select v-model="parameterSuffix">
        <option value='p'>p{{ units }}</option>
        <option value='n'>n{{ units }}</option>
        <option value='u'>μ{{ units }}</option>
        <option value='m'>m{{ units }}</option>
        <option selected value='unity'>{{ units }}</option>
        <option value='k'>k{{ units }}</option>
        <option value='Meg'>M{{ units }}</option>
        <option value='G'>G{{ units }}</option>
        <option value='T'>T{{ units }}</option>
      </select>
    </div>
</template>

<style scoped>
  @import './ParameterChipStyles.css'
</style>
