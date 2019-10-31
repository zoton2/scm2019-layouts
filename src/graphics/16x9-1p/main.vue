<template>
  <div>
    <img src="./background.png">
    <timer
      :style="{
        left: '17px',
        top: '261px',
        width: '208px',
        height: '77px',
      }"
    ></timer>
    <game
      :style="{
        left: '17px',
        top: '353px',
        width: '208px',
        height: '74px',
      }"
    ></game>
    <player
      :style="{
        left: '17px',
        top: '441px',
        width: '208px',
        height: '75px',
      }"
    ></player>
    <host
      :style="{
        left: '17px',
        top: '530px',
        width: '209px',
        height: '75px',
      }"
    ></host>
    <donation-total
      :style="{
        left: '17px',
        top: '619px',
        width: '209px',
        height: '75px',
      }"
    ></donation-total>
    <donations
      :style="{
        left: '238px',
        top: '619px',
        width: '935px',
        height: '75px',
      }"
    ></donations>
    <sponsor-logos
      :style="{
        left: '1181px',
        top: '617px',
        width: '82px',
        height: '81px',
      }"
    ></sponsor-logos>
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
import { RunDataActiveRun } from '../../../../nodecg-speedcontrol/types';

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
  @State runDataActiveRun!: RunDataActiveRun;
}
</script>

<style>
  @import url('../_misc/common.css');
  @import url('../_misc/Fade.css');
  @import url('../_misc/Flex.css');
</style>
