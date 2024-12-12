<script setup lang="ts">
import Parameters from './components/Parameters.vue';

const parameterSets = [
  // ".tran <Tstep> <Tstop> [<Tstart> [<dTmax>]] [<modifiers>]",
  ".tran <Tstep> <Tstop> [<Tstart> [dTmax]] [modifiers]",
  ".ac <oct, dec, lin> <Nsteps> <StartFreq> <EndFreq>",
  ".dc <srcnam> <Vstart> <Vstop> <Vincr> [<srcnam2> <Vstart2> <Vstop2> <Vincr2>]",
]

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
      <Parameters :parameterSets="parameterSets"></Parameters>
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

</style>
