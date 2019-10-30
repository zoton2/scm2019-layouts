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
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'; // eslint-disable-line object-curly-newline, max-len
import { State } from 'vuex-class';
import { RunDataActiveRun } from '../../../../../nodecg-speedcontrol/types';

@Component
export default class Player extends Vue {
  @State('runDataActiveRun') run!: RunDataActiveRun;
  @Prop(Boolean) readonly small!: boolean;
  @Prop({ default: 1 }) readonly team!: number;
  timeout?: number;
  teamI = 0;
  index = 0;
  name: string | null = null;

  @Watch('run', { immediate: true })
  onRunChange(val: RunDataActiveRun): void {
    window.clearTimeout(this.timeout);
    this.teamI = this.team - 1;
    this.index = 0;
    this.name = null;
    const coop = !!(val && val.teams.length === 1 && val.teams[0].players.length >= 2);

    if (val) {
      if (coop && val.teams[0].players[this.teamI]) {
        this.name = val.teams[0].players[this.teamI].name;
      } else if (!coop && val.teams[this.teamI] && val.teams[this.teamI].players.length) {
        this.showNextName();
      }
    }
  }

  showNextName(): void {
    if (!this.run) {
      return;
    }
    const { players } = this.run.teams[this.teamI];
    this.name = players[this.index].name;
    this.timeout = window.setTimeout(() => this.showNextName(), 30 * 1000);
    this.index = (players.length <= this.index + 1) ? 0 : this.index + 1;
  }
}
</script>
