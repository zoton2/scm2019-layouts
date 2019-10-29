<template>
  <div class="Flex">
    <div
      id="Time"
      :class="timer.state"
      :style="{
        'font-size': '2.5em',
        transition: '1s',
      }"
    >
      <span
        v-for="char in timer.time.split('')"
        :key="`${Math.random()}${char}`"
        :class="(char === ':' ? 'Colon' : undefined)"
      >
        {{ char }}
      </span>
    </div>
    <div
      v-if="runDataActiveRun"
      :style="{
        'font-size': '1.3em',
        display: 'flex',
        'flex-direction': 'row',
        'justify-content': 'center',
        width: '100%',
      }"
    >
      EST.
      <div :style="{ 'margin-left': '5px', width: estimateWidth }">
        <transition name="fade">
          <div
            id="Estimate"
            ref="Estimate"
            :key="`${runDataActiveRun.id}${runDataActiveRun.estimate}`"
            :style="{ position: 'absolute' }"
          >
            <span
              v-for="char in runDataActiveRun.estimate.split('')"
              :key="`${Math.random()}${char}`"
              :class="(char === ':' ? 'Colon' : undefined)"
            >
              {{ char }}
            </span>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Watch } from 'vue-property-decorator'; // eslint-disable-line object-curly-newline, max-len
import { State } from 'vuex-class';
import { Timer as TimerType, RunDataActiveRun } from '../../../../../nodecg-speedcontrol/types';

@Component
export default class Timer extends Vue {
  @State timer!: TimerType;
  @State runDataActiveRun!: RunDataActiveRun;
  @Ref('Estimate') readonly estimate!: HTMLElement;
  isMounted = false;
  estimateWidth = '0px';

  @Watch('runDataActiveRun', { immediate: true })
  onRunChange(newVal: TimerType, oldVal?: TimerType): void {
    if (!oldVal && newVal) {
      Vue.nextTick()
        .then(() => {
          this.estimateWidth = `${this.estimate.clientWidth}px`;
        });
    }
  }
}
</script>

<style scoped>
  .Flex {
    flex-direction: column;
  }

  /* Each character in the timer is in a span; setting width so the numbers appear monospaced. */
  #Time > span, #Estimate > span {
    display: inline-block;
    width: 0.45em;
    text-align: center;
  }
  #Time > .Colon, #Estimate > .Colon {
    width: 0.22em;
  }

  .stopped {
    color: #e0c686;
  }
  .running {
    color: #f57f05;
  }
  .paused {
    color: #dfb54f;
  }
  .finished {
    color: #b07d01;
  }
</style>
