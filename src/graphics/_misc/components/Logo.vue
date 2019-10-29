<template>
  <div class="Flex">
    <img
      :style="{
        width: '100%',
        height: '100%',
        'object-fit': 'contain',
      }"
      src="../logo.png"
    >
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Logo extends Vue {
  // nothing :)
}
</script>
