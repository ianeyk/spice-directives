<script setup lang="ts">
import ParameterChip from './components/ParameterChip.vue';
import ParameterChipBoolean from './components/ParameterChipBoolean.vue';
import ParameterChipSelect from './components/ParameterChipSelect.vue';
import ParameterChipUnitless from './components/ParameterChipUnitless.vue';
import ParameterChipUnits from './components/ParameterChipUnits.vue';
import ParameterGroup from './components/ParameterGroup.vue';
import Parameters from './components/Parameters.vue';

const docOpt1 = ".ac <oct, dec, lin> <Nsteps> <StartFreq> <EndFreq>"

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
        <Parameters docOpt=""></Parameters>
        <!-- <ParameterChip name="Sweep" :inputComponent="ParameterChipSelect" :parameterProps="{'options': ['AC', 'DC', 'rocking', 'rolling'], 'value': 'AC'}" :valid="true" />
        <ParameterChip name="N Steps" :inputComponent="ParameterChipUnitless" :parameterProps="{'value': 100}" :valid="true" />
        <ParameterChip name="Starting Value" :inputComponent="ParameterChipUnits" :parameterProps="{'value': 0, 'units': 'V'}" :valid="true" />
        <ParameterChip name="Ending Value" :inputComponent="ParameterChipUnits" :parameterProps="{'value': 5, 'units': 'V'}" :valid="true" />
        <ParameterChip name="Voltage Step" :inputComponent="ParameterChipUnits" :parameterProps="{'value': 0.01, 'units': 'V'}":valid="true" />
        <ParameterChip name="Boolean" :inputComponent="ParameterChipBoolean" :parameterProps="{'value': true}" :optional="true" :valid="true"/>
        <ParameterChip name="N Steps" :inputComponent="ParameterChipUnitless" :parameterProps="{'value': 100}" :optional="true" :valid="true"/>
        <ParameterChip name="N Steps" :inputComponent="ParameterChipUnitless" :parameterProps="{'value': 100}" :valid="true" />
        <ParameterChip name="N Steps" :inputComponent="ParameterChipUnitless" :parameterProps="{'value': 100}" :valid="true" />
        <ParameterChip name="N Steps" :inputComponent="ParameterChipUnitless" :parameterProps="{'value': 100}" :valid="true" />
        <ParameterChip name="N Steps" :inputComponent="ParameterChipUnitless" :parameterProps="{'value': 100}" :valid="true" />
        <ParameterChip name="N Steps" :inputComponent="ParameterChipUnitless" :parameterProps="{'value': 100}" :valid="true" />
        <ParameterChip name="N Steps" :inputComponent="ParameterChipUnitless" :parameterProps="{'value': 100}" :valid="true" />
        <ParameterChip name="N Steps" :inputComponent="ParameterChipUnitless" :parameterProps="{'value': 100}" :valid="true" />
        <ParameterChip name="N Steps" :inputComponent="ParameterChipUnitless" :parameterProps="{'value': 100}" :valid="true" />
        <ParameterChip name="N Steps" :inputComponent="ParameterChipUnitless" :parameterProps="{'value': 100}" :valid="true" />
        <ParameterChip name="N Steps" :inputComponent="ParameterChipUnitless" :parameterProps="{'value': 100}" :valid="true" /> -->
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
  display: flex;
  line-height: 1.5;
  justify-content: center;
}

.chipContainer {
  display: flex;
  margin-top: 1rem;
  padding-bottom: 1rem;
  width: 80%;
  overflow-x: scroll;
}
</style>
