<template>
  <div>
    <img src="./background.png">
    <timer
      :style="{
        left: '105px',
        top: '261px',
        width: '259px',
        height: '75px',
      }"
    />
    <game
      :style="{
        left: '105px',
        top: '352px',
        width: '259px',
        height: '75px',
      }"
    />
    <player
      :style="{
        left: '105px',
        top: '441px',
        width: '259px',
        height: '75px',
      }"
    />
    <host
      :style="{
        left: '105px',
        top: '530px',
        width: '259px',
        height: '75px',
      }"
    />
    <donation-total
      :style="{
        left: '105px',
        top: '619px',
        width: '259px',
        height: '75px',
      }"
    />
    <donations
      :style="{
        left: '406px',
        top: '619px',
        width: '644px',
        height: '75px',
      }"
    />
    <sponsor-logos
      :style="{
        left: '1061px',
        top: '619px',
        width: '112px',
        height: '79px',
      }"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { replicantNS } from '@scm2019-layouts/browser_shared/replicant_store';
import SponsorLogos from '../_misc/components/SponsorLogos.vue';
import DonationTotal from '../_misc/components/DonationTotal.vue';
import Host from '../_misc/components/Host.vue';
import Donations from '../_misc/components/Ticker.vue';
import Timer from '../_misc/components/Timer.vue';
import Game from '../_misc/components/Game.vue';
import Player from '../_misc/components/Player.vue';
import { RunDataActiveRun } from '../../../../nodecg-speedcontrol/src/types';

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
