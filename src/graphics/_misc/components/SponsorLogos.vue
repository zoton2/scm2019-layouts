<template>
  <div :style="{ position: 'fixed' }">
    <img
      v-if="sponsorLogos.length"
      :style="{ width: '100%', height: '100%' }"
      :src="sponsorLogos[0].url"
    >
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { Asset } from '../../../../types';

@Component
export default class SponsorLogos extends Vue {
  @State('assets:sponsor-logos') sponsorLogos!: Asset[];
}
</script>
