<template>
  <div>
    <img
      v-if="nextGameName === 'dark souls'"
      src="./Backgrounds/ds.png"
    >
    <img
      v-else-if="nextGameName === 'dark souls ii'"
      src="./Backgrounds/ds2.png"
    >
    <img
      v-else-if="nextGameName === 'dark souls iii'"
      src="./Backgrounds/ds3.png"
    >
  <img
      v-else-if="nextGameName.includes('demon')"
      src="./Backgrounds/des.png"
    >
  <img
      v-else-if="nextGameName.includes('bloodborne')"
      src="./Backgrounds/bb.png"
    >
  <img
      v-else-if="nextGameName.includes('sekiro')"
      src="./Backgrounds/sekiro.png"
    >
  <img
      v-else-if="nextGameName.includes('bayonetta')"
      src="./Backgrounds/bayo.png"
    >
  <img
      v-else-if="nextGameName.includes('castlevania')"
      src="./Backgrounds/castle.png"
    >
  <img
      v-else-if="nextGameName.includes('devil')"
      src="./Backgrounds/dmc4.png"
    >
  <img
      v-else-if="nextGameName.includes('matador')"
      src="./Backgrounds/elm.png"
    >
  <img
      v-else-if="nextGameName.includes('furi')"
      src="./Backgrounds/furi.png"
    >
  <img
      v-else-if="nextGameName.includes('hollow')"
      src="./Backgrounds/hk.png"
    >
  <img
      v-else-if="nextGameName.includes('hyper')"
      src="./Backgrounds/hyper.png"
    >
  <img
      v-else-if="nextGameName.includes('land')"
      src="./Backgrounds/land.png"
    >
  <img
      v-else-if="nextGameName.includes('london')"
      src="./Backgrounds/london.png"
    >
  <img
      v-else-if="nextGameName.includes('solid')"
      src="./Backgrounds/mgs.png"
    >
  <img
      v-else-if="nextGameName.includes('mulaka')"
      src="./Backgrounds/mulaka.png"
    >
  <img
      v-else-if="nextGameName.includes('chaos')"
      src="./Backgrounds/mwc.png"
    >
  <img
      v-else-if="nextGameName.includes('woods')"
      src="./Backgrounds/nitw.png"
  >
    <img
      v-else-if="nextGameName.includes('prince')"
      src="./Backgrounds/pop.png"
    >
  <img
      v-else-if="nextGameName.includes('rain')"
      src="./Backgrounds/ror.png"
    >
  <img
      v-else-if="nextGameName.includes('meat')"
      src="./Backgrounds/smb.png"
    >
  <img
      v-else-if="nextGameName === 'super mario land'"
      src="./Backgrounds/sml.png"
    >
  <img
      v-else-if="nextGameName === 'super mario odyssey'"
      src="./Backgrounds/smo.png"
    >
  <img
      v-else-if="nextGameName.includes('vice')"
      src="./Backgrounds/vc.png"
    >
  <img
      v-else-if="nextGameName.includes('noid')"
      src="./Backgrounds/yo.png"
    >
  <img
      v-else-if="nextGameName.includes('zelda')"
      src="./Backgrounds/zelda.png"
    >
    <img
      v-else
      src="./background.png"
    >
    <upcoming-run
      :run-data="nextRun"
      :style="{
        left: '172px',
        top: '220px',
        width: '643px',
        height: '174px',
      }"
    />
    <upcoming-run
      :run-data="onDeck"
      :style="{
        left: '172px',
        top: '443px',
        width: '643px',
        height: '174px',
      }"
    />
    <sponsor-logos
      :style="{
        left: '865px',
        top: '230px',
        width: '208px',
        height: '134px',
      }"
    />
    <host
      :style="{
        left: '852px',
        top: '440px',
        width: '240px',
        height: '76px',
      }"
    />
    <donation-total
      :style="{
        left: '845px',
        top: '530px',
        width: '240px',
        height: '76px',
      }"
    />
    <donations
      :style="{
        left: '180px',
        top: '625px',
        width: '911px',
        height: '59px',
      }"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { replicantNS } from '@scm2019-layouts/browser_shared/replicant_store';
import SponsorLogos from '../_misc/components/SponsorLogos.vue';
import UpcomingRun from './components/UpcomingRun.vue';
import DonationTotal from '../_misc/components/DonationTotal.vue';
import Host from '../_misc/components/Host.vue';
import Donations from '../_misc/components/Ticker.vue';
import { RunData } from '../../../../nodecg-speedcontrol/src/types';
import { RunDataActiveRunSurrounding, RunDataArray } from '../../../../nodecg-speedcontrol/src/types/schemas';

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
  @replicantNS.State((s) => s.reps.runDataArray) readonly runDataArray!: RunDataArray;
  @replicantNS.State(
    (s) => s.reps.runDataActiveRunSurrounding,
  ) readonly runDataActiveRunSurrounding!: RunDataActiveRunSurrounding;
  nextRun: RunData | null = null;
  onDeckArr: RunData[] = [];

  get nextGameName(): string {
    return ((this.nextRun ? this.nextRun.game : undefined) || '').toLowerCase();
  }

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
