<template>
  <div>
    <transition name="fade">
      <div
        v-if="name"
        :key="name"
        class="Flex"
        :style="{ position: 'absolute' }"
      >
        <img src="../player.png">
        <div :style="{ 'margin-left': '10px', 'font-size': '1.3em' }">
          {{ name }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { RunDataActiveRun } from '../../../../../nodecg-speedcontrol/types';

@Component
export default class Player extends Vue {
  @State runDataActiveRun!: RunDataActiveRun;

  get name(): string | undefined {
    return (this.runDataActiveRun) ? this.runDataActiveRun.teams[0].players[0].name : undefined;
  }
}
</script>
