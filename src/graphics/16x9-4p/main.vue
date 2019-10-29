<template>
  <div>
    <img src="./background.png">
    <timer
      :style="{
        left: '544px',
        top: '504px',
        width: '191px',
        height: '67px',
      }"
    ></timer>
    <game
      :style="{
        left: '544px',
        top: '149px',
        width: '191px',
        height: '67px',
      }"
      :scale="0.8"
    ></game>
    <player
      :style="{
        left: '17px',
        top: '12px',
        width: '327px',
        height: '51px',
      }"
    ></player>
    <player
      :style="{
        left: '933px',
        top: '12px',
        width: '327px',
        height: '51px',
      }"
    ></player>
    <player
      :style="{
        left: '17px',
        top: '660px',
        width: '327px',
        height: '51px',
      }"
    ></player>
    <player
      :style="{
        left: '934px',
        top: '660px',
        width: '327px',
        height: '51px',
      }"
    ></player>
    <host
      :style="{
        left: '544px',
        top: '581px',
        width: '191px',
        height: '67px',
      }"
    ></host>
    <donation-total
      :style="{
        left: '544px',
        top: '72px',
        width: '191px',
        height: '67px',
      }"
    ></donation-total>
    <donations
      :style="{
        left: '354px',
        top: '660px',
        width: '570px',
        height: '52px',
      }"
    ></donations>
    <sponsor-logos
      :style="{
        left: '543px',
        top: '368px',
        width: '193px',
        height: '119px',
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
