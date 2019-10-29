<template>
  <div>
    <transition name="fade">
      <div
        :key="host"
        class="Flex"
        :style="{ position: 'absolute' }"
      >
        <img
          src="../mic.png"
          :style="{ 'margin-right': '10px' }"
        >
        <div>{{ host }}</div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { Host as HostType } from '../../../../schemas';

@Component
export default class Host extends Vue {
  @State host!: HostType;
}
</script>

<style scoped>
  .Flex {
    flex-direction: row;
  }
</style>
