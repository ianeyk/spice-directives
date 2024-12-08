<script setup lang="ts">
import ParameterChip from './components/ParameterChip.vue';
import ParameterChipUnits from './components/ParameterChipUnits.vue';

</script>

<template>
    <header>
      <h1>
        Spice Directive Generator
      </h1>
      <p class="instructions">
        Hi! In circuit simulators like LTSpice, there are numerous types of simulation that can be run, for example DC sweeps, AC sweeps, transient analysis, etc. The commands to run each of these simulation types take many parameters in a specific order, which can be hard to remember. This tool should be able to help you generate the directives you need to perform any type of simulation, without having to look it up in the docs.
      </p>
    </header>

    <main>
      <div class="chipContainer">
        <ParameterChip name="Starting Value" :parameterType="ParameterChipUnits" :parameterProps="{'value': 0, 'units': 'V'}" />
        <ParameterChip name="Ending Value" :parameterType="ParameterChipUnits" :parameterProps="{'value': 5, 'units': 'V'}" />
        <ParameterChip name="Voltage Step" :parameterType="ParameterChipUnits" :parameterProps="{'value': 0.01, 'units': 'V'}" />
      </div>
    </main>
</template>

<style scoped>
header {
  display: block;
  justify-content: center;
}

h1 {
  text-align: center;
  font-weight: bold;
  font-size: xx-large;
  padding-bottom: 1rem;
}

p.instructions {
  font-size: large;
  margin-left: 10%;
  margin-right: 10%;
}

main {
  display: block;
  line-height: 1.5;
}

.chipContainer {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
</style>
