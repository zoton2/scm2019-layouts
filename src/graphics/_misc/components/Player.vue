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
          } : {
            height: '25px',
          }"
        >
        <div :style="{ 'margin-left': '5px', 'font-size': (small) ? '1.1em' : '1.3em' }">
          {{ name }}
          <span
            v-if="finishTime"
            :style="{ 'font-size': '0.75em' }"
          >
            [{{ finishTime }}]
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { replicantNS } from '@scm2019-layouts/browser_shared/replicant_store';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { RunDataActiveRun, Timer } from '../../../../../nodecg-speedcontrol/src/types';

@Component
export default class Player extends Vue {
  @replicantNS.State((s) => s.reps.runDataActiveRun) readonly run!: RunDataActiveRun;
  @replicantNS.State((s) => s.reps.timer) readonly timer!: Timer;
  @Prop(Boolean) readonly small!: boolean;
  @Prop({ default: 1 }) readonly team!: number;
  timeout?: number;
  teamI = 0;
  index = 0;
  name: string | null = null;

  get finishTime(): string | undefined {
    if (!this.run || this.run.teams.length <= 1) {
      return undefined;
    }
    const teamFinishTime = this.timer.teamFinishTimes[this.run.teams[this.teamI].id];
    if (teamFinishTime) {
      if (teamFinishTime.state === 'completed') {
        return this.timer.teamFinishTimes[this.run.teams[this.teamI].id].time;
      }
      if (teamFinishTime.state === 'forfeit') {
        return 'Forfeit';
      }
    }
    return undefined;
  }

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
