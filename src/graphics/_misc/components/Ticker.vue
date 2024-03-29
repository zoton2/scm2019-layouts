<template>
  <div
    class="Flex"
    :style="{
      position: 'fixed',
      'font-size': '1.5em',
      'box-sizing': 'border-box',
      padding: '0 10px',
      'white-space': 'nowrap',
      overflow: 'hidden',
    }"
  >
    <transition
      name="fade"
      mode="out-in"
    >
      <generic-text v-if="type === 'donation'" :key="text" @end="onEnd">
        <b>New Donation:</b> {{ text }}
      </generic-text>
      <generic-text v-else-if="type === 'generic'" :key="text" @end="onEnd">
        {{ text }}
      </generic-text>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import GenericText from './Ticker/GenericText.vue';

interface DonationObj {
  donor_visiblename: string;
  amount: string;
  comment: string;
}

@Component({
  components: {
    GenericText,
  },
})
export default class Ticker extends Vue {
  text = '';
  type: 'donation' | 'generic' = 'generic';
  donations: DonationObj[] = [];
  showingDonations = false;

  // Add "generic text" possibilities here!
  genericTextArr = [
    'Generic Text 1',
    'Generic Text 2',
    'Generic Text 3',
    'Generic Text 4',
  ];

  created(): void {
    this.onEnd();
    nodecg.listenFor('newDonation', (donation: DonationObj) => {
      this.donations.push(donation);
    });
  }

  showNextDonation(): void {
    this.type = 'donation';
    const donation = this.donations[0];
    this.showingDonations = true;
    this.text = `${donation.donor_visiblename} ($${parseFloat(donation.amount).toFixed(2)})`
      + `${(donation.comment) ? ` - ${donation.comment}` : ''}`;
    this.donations.shift();
  }

  showGenericText(): void {
    this.type = 'generic';
    const rand = Math.floor(Math.random() * this.genericTextArr.length);
    this.text = this.genericTextArr[rand];
  }

  onEnd(): void {
    if (this.type === 'donation') {
      if (!this.donations.length) {
        this.showingDonations = false;
        this.text = '';
        this.showGenericText();
      } else {
        this.showNextDonation();
      }
    } else if (this.type === 'generic') {
      if (!this.showingDonations && this.donations.length) {
        this.showNextDonation();
      } else {
        this.showGenericText();
      }
    }
  }
}
</script>
