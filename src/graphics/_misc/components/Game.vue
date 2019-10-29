<template>
  <div>
    <transition name="fade">
      <div
        v-if="runDataActiveRun"
        :key="`${runDataActiveRun.game}${runDataActiveRun.category}`"
        class="Flex"
        :style="{ position: 'absolute', 'flex-direction': 'column' }"
      >
        <div
          v-if="runDataActiveRun"
          :style="{ 'font-size': `${1.3 * scale}em` }"
        >
          {{ runDataActiveRun.game }}
        </div>
        <div
          v-if="runDataActiveRun"
          :style="{ 'font-size': `${1.1 * scale}em`, color: '#cccccc' }"
        >
          {{ runDataActiveRun.category }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { RunDataActiveRun } from '../../../../../nodecg-speedcontrol/types';

@Component
export default class Game extends Vue {
  @State runDataActiveRun!: RunDataActiveRun;
  @Prop({ default: 1 }) readonly scale!: number;
}
</script>
