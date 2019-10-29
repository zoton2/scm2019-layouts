<template>
  <div>
    <img src="./background.png">
    <timer
      :style="{
        left: '417px',
        top: '551px',
        width: '211px',
        height: '75px',
      }"
    ></timer>
    <game
      :style="{
        left: '250px',
        top: '469px',
        width: '211px',
        height: '75px',
      }"
    ></game>
    <player
      :style="{
        left: '398px',
        top: '342px',
        width: '197px',
        height: '31px',
      }"
      small
    ></player>
    <player
      :style="{
        left: '1008px',
        top: '342px',
        width: '197px',
        height: '31px',
      }"
      small
    ></player>
    <player
      :style="{
        left: '686px',
        top: '347px',
        width: '197px',
        height: '31px',
      }"
      small
    ></player>
    <host
      :style="{
        left: '417px',
        top: '633px',
        width: '211px',
        height: '75px',
      }"
    ></host>
    <donation-total
      :style="{
        left: '31px',
        top: '469px',
        width: '211px',
        height: '75px',
      }"
    ></donation-total>
    <donations
      :style="{
        left: '32px',
        top: '387px',
        width: '596px',
        height: '75px',
      }"
    ></donations>
    <sponsor-logos
      :style="{
        left: '465px',
        top: '470px',
        width: '163px',
        height: '75px',
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
