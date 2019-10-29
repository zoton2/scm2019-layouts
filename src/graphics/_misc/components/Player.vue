<template>
  <div :style="{ position: 'fixed' }">
    <transition name="fade">
      <div
        v-if="name"
        :key="name"
        class="Flex"
        :style="{ position: 'absolute' }"
      >
        <img
          src="../player.png"
          :style="(small) ? {
            'box-sizing': 'border-box',
            height: '100%',
            padding: '5px 0',
            'object-fit': 'scale-down',
          } : {}"
        >
        <div :style="{ 'margin-left': '10px', 'font-size': (small) ? '1.1em' : '1.3em' }">
          {{ name }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { RunDataActiveRun } from '../../../../../nodecg-speedcontrol/types';

@Component
export default class Player extends Vue {
  @State runDataActiveRun!: RunDataActiveRun;
  @Prop(Boolean) readonly small!: boolean;

  get name(): string | undefined {
    return (this.runDataActiveRun) ? this.runDataActiveRun.teams[0].players[0].name : undefined;
  }
}
</script>
