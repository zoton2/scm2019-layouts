<template>
  <v-app>
    <v-btn
      block
      :disabled="disableChange || !nextRun"
      @click="playNextRun"
    >
      <span v-if="nextRun">
        <v-icon left>mdi-play</v-icon>{{ nextRunGameName }}
      </span>
      <span v-else-if="runDataArray.length">
        No Runs Left
      </span>
      <span v-else>
        No Runs Added
      </span>
    </v-btn>
    <v-alert
      v-if="disableChange"
      dense
      type="info"
      :style="{ 'margin-top': '5px' }"
    >
      Cannot change run while timer is {{ timerState }}.
    </v-alert>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { store as scStore } from '../../browser_shared/sc-store';
import { RunDataActiveRunSurrounding } from '../../../../nodecg-speedcontrol/schemas';
import { RunDataArray, RunData } from '../../../../nodecg-speedcontrol/types';

export default Vue.extend({
  computed: {
    runDataArray(): RunDataArray {
      return scStore.state.runDataArray;
    },
    runDataActiveRunSurrounding(): RunDataActiveRunSurrounding {
      return scStore.state.runDataActiveRunSurrounding;
    },
    nextRun(): RunData | undefined {
      return this.runDataArray.find((run) => run.id === this.runDataActiveRunSurrounding.next);
    },
    nextRunGameName(): string {
      if (this.nextRun && this.nextRun.game) {
        return `${this.nextRun.game.slice(0, 35)}${(this.nextRun.game.length > 35) ? '...' : ''}`;
      }
      return '(The Run With No Name)';
    },
    timerState(): string {
      return scStore.state.timer.state;
    },
    disableChange(): boolean {
      return ['running', 'paused'].includes(this.timerState);
    },
  },
  methods: {
    playNextRun(): void {
      if (this.nextRun) {
        nodecg.sendMessage('nextRun').then(() => {
          // run change successful
        }).catch(() => {
          // run change unsuccessful
        });
      }
    },
  },
});
</script>
