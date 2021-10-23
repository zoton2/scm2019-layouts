<template>
  <div>
    <img src="./background.png">
    <timer
      :style="{
        left: '646px',
        top: '547px',
        width: '237px',
        height: '74px',
      }"
    />
    <game
      :style="{
        left: '394px',
        top: '547px',
        width: '237px',
        height: '74px',
      }"
    />
    <player
      :style="{
        left: '20px',
        top: '97px',
        width: '237px',
        height: '74px',
      }"
      :team="1"
    />
    <player
      :style="{
        left: '1020px',
        top: '97px',
        width: '237px',
        height: '74px',
      }"
      :team="2"
    />
    <host
      :style="{
        left: '898px',
        top: '547px',
        width: '237px',
        height: '74px',
      }"
    />
    <donation-total
      :style="{
        left: '142px',
        top: '547px',
        width: '237px',
        height: '74px',
      }"
    />
    <donations
      :style="{
        left: '143px',
        top: '633px',
        width: '897px',
        height: '74px',
      }"
    />
    <sponsor-logos
      :style="{
        left: '1048px',
        top: '633px',
        width: '90px',
        height: '74px',
      }"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';
import SponsorLogos from '../_misc/components/SponsorLogos.vue';
import DonationTotal from '../_misc/components/DonationTotal.vue';
import Host from '../_misc/components/Host.vue';
import Donations from '../_misc/components/Ticker.vue';
import Timer from '../_misc/components/Timer.vue';
import Game from '../_misc/components/Game.vue';
import Player from '../_misc/components/Player.vue';
import { RunDataActiveRun } from '../../../../nodecg-speedcontrol/src/types';
import { replicantNS } from '@scm2019-layouts/browser_shared/replicant_store';

@Component({
  components: {
    SponsorLogos,
    DonationTotal,
    Host,
    Donations,
    Timer,
    Game,
    Player,
  },
})
export default class App extends Vue {
  @replicantNS.State((s) => s.reps.runDataActiveRun) readonly runDataActiveRun!: RunDataActiveRun;
}
</script>

<style>
  @import url('../_misc/common.css');
  @import url('../_misc/Fade.css');
  @import url('../_misc/Flex.css');
</style>
