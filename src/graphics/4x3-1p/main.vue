<template>
  <div>
    <img src="./background.png">
    <timer
      :style="{
        position: 'fixed',
        left: '105px',
        top: '261px',
        width: '259px',
        height: '75px',
      }"
    ></timer>
    <game
      :style="{
        position: 'fixed',
        left: '105px',
        top: '352px',
        width: '259px',
        height: '75px',
      }"
    ></game>
    <player
      :style="{
        position: 'fixed',
        left: '105px',
        top: '441px',
        width: '259px',
        height: '75px',
      }"
    ></player>
    <host
      :style="{
        position: 'fixed',
        left: '105px',
        top: '530px',
        width: '259px',
        height: '75px',
        'font-size': '1.3em',
      }"
    ></host>
    <donation-total
      :style="{
        position: 'fixed',
        left: '105px',
        top: '619px',
        width: '259px',
        height: '75px',
        'font-size': '2em',
      }"
    ></donation-total>
    <donations
      :style="{
        position: 'fixed',
        left: '406px',
        top: '619px',
        width: '644px',
        height: '75px',
        'font-size': '1.5em',
      }"
    ></donations>
    <sponsor-logos
      :style="{
        position: 'fixed',
        left: '1061px',
        top: '619px',
        width: '112px',
        height: '79px',
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
import Donations from '../_misc/components/Donations.vue';
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
