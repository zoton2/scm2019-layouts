<template>
  <div>
    <img src="./background.png">
    <upcoming-run
      :run-data="nextRun"
      :style="{
        left: '172px',
        top: '220px',
        width: '643px',
        height: '174px',
      }"
    ></upcoming-run>
    <upcoming-run
      :run-data="onDeck"
      :style="{
        left: '172px',
        top: '443px',
        width: '643px',
        height: '174px',
      }"
    ></upcoming-run>
    <sponsor-logos
      :style="{
        left: '855px',
        top: '240px',
        width: '208px',
        height: '134px',
      }"
    ></sponsor-logos>
    <host
      :style="{
        left: '839px',
        top: '446px',
        width: '240px',
        height: '76px',
      }"
    ></host>
    <donation-total
      :style="{
        left: '839px',
        top: '538px',
        width: '240px',
        height: '76px',
      }"
    ></donation-total>
    <donations
      :style="{
        left: '172px',
        top: '637px',
        width: '911px',
        height: '59px',
      }"
    ></donations>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { State } from 'vuex-class';
import SponsorLogos from '../_misc/components/SponsorLogos.vue';
import UpcomingRun from './components/UpcomingRun.vue';
import DonationTotal from '../_misc/components/DonationTotal.vue';
import Host from '../_misc/components/Host.vue';
import Donations from '../_misc/components/Ticker.vue';
import { RunData } from '../../../../nodecg-speedcontrol/types';
import { RunDataActiveRunSurrounding, RunDataArray } from '../../../../nodecg-speedcontrol/schemas';

@Component({
  components: {
    SponsorLogos,
    UpcomingRun,
    DonationTotal,
    Host,
    Donations,
  },
})
export default class App extends Vue {
  @State runDataArray!: RunDataArray;
  @State runDataActiveRunSurrounding!: RunDataActiveRunSurrounding;
  nextRun: RunData | null = null;
  onDeckArr: RunData[] = [];

  mounted(): void {
    this.updateNextRuns();
    nodecg.listenFor('refreshIntermission', () => this.updateNextRuns());
  }

  updateNextRuns(): void {
    let runIndex = this.runDataArray
      .findIndex((run) => run.id === this.runDataActiveRunSurrounding.next);
    this.nextRun = this.runDataArray[runIndex] || null;
    if (this.runDataActiveRunSurrounding.next) {
      runIndex = (runIndex < 0) ? 1 : runIndex + 1;
      this.onDeckArr = this.runDataArray.slice(runIndex, runIndex + 3);
    } else {
      this.onDeckArr = [];
    }
  }

  // Update/cycle the "on deck" run when needed.
  onDeck: RunData | null = null;
  onDeckIndex = 0;
  onDeckInterval?: number;
  @Watch('onDeckArr', { immediate: true })
  onDeckChange(): void {
    window.clearInterval(this.onDeckInterval);
    this.onDeckIndex = 0;
    if (this.onDeckArr.length) {
      this.cycleOnDeck();
      this.onDeckInterval = window.setInterval(this.cycleOnDeck, 10000);
    } else {
      this.onDeck = null;
    }
  }
  cycleOnDeck(): void {
    this.onDeck = this.onDeckArr[this.onDeckIndex];
    this.onDeckIndex += 1;
    if (this.onDeckIndex >= this.onDeckArr.length) {
      this.onDeckIndex = 0;
    }
  }
}
</script>

<style>
  @import url('../_misc/common.css');
  @import url('../_misc/Fade.css');
  @import url('../_misc/Flex.css');
</style>
