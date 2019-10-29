<template>
  <div>
    <img src="./background.png">
    <timer
      :style="{
        position: 'fixed',
        left: '646px',
        top: '547px',
        width: '237px',
        height: '74px',
      }"
    ></timer>
    <game
      :style="{
        position: 'fixed',
        left: '394px',
        top: '547px',
        width: '237px',
        height: '74px',
      }"
    ></game>
    <player
      :style="{
        position: 'fixed',
        left: '20px',
        top: '97px',
        width: '237px',
        height: '74px',
      }"
    ></player>
    <player
      :style="{
        position: 'fixed',
        left: '1020px',
        top: '97px',
        width: '237px',
        height: '74px',
      }"
    ></player>
    <host
      :style="{
        position: 'fixed',
        left: '898px',
        top: '547px',
        width: '237px',
        height: '74px',
        'font-size': '1.3em',
      }"
    ></host>
    <donation-total
      :style="{
        position: 'fixed',
        left: '142px',
        top: '547px',
        width: '237px',
        height: '74px',
        'font-size': '2em',
      }"
    ></donation-total>
    <donations
      :style="{
        position: 'fixed',
        left: '143px',
        top: '633px',
        width: '897px',
        height: '74px',
        'font-size': '1.5em',
      }"
    ></donations>
    <sponsor-logos
      :style="{
        position: 'fixed',
        left: '1048px',
        top: '633px',
        width: '90px',
        height: '74px',
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
