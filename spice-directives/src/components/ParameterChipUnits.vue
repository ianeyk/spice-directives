<script setup lang="ts">
import { siPrefixToExponent } from '@/constants';
import type { siPrefix, unitsParameterProps, parameterChipValue, parameterChipInputValue } from '@/types';
import { computed, ref, watch, type ComputedRef, type Ref } from 'vue';

const props = defineProps<unitsParameterProps>()
const emit = defineEmits<{'parameterChanged': [parameterChipInputValue]}>()

const parameterSuffix: Ref<siPrefix> = ref(props.unitPrefix ? props.unitPrefix : 'unity')
const rawParameterMantissa: Ref<number | string> = ref(props.value)
const parameterValue: ComputedRef<number> = computed(() => typeof(rawParameterMantissa.value) === "number" ? rawParameterMantissa.value : NaN)

const parameter: ComputedRef<number> = computed(() => parameterValue.value * siPrefixToExponent[parameterSuffix.value])

const valid: ComputedRef<boolean> = computed(() => {
  return !Number.isNaN(parameter.value)
})

watch([parameter, valid], () => {
  emit('parameterChanged', {
    parameter: parameter.value,
    valid: valid.value,
  })
});

</script>

<template>
    <div class="value">
      <input type="number" v-model="rawParameterMantissa">
      <select v-model="parameterSuffix">
        <option value='p'>p{{ units }}</option>
        <option value='n'>n{{ units }}</option>
        <option value='u'>μ{{ units }}</option>
        <option value='m'>m{{ units }}</option>
        <option value='unity'>{{ units }}</option>
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
