<template>
  <div
    class="Flex"
    :style="{ 'white-space': 'nowrap' }"
  >
    {{ text }}
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Donations extends Vue {
  text = 'This part to be finished.';
  donations: {
    donor_visiblename: string;
    amount: string;
    comment: string;
  }[] = [];

  created(): void {
    nodecg.listenFor('newDonation', (donation: {
      donor_visiblename: string;
      amount: string;
      comment: string;
    }) => {
      this.donations.push(donation);
    });
  }
}
</script>
