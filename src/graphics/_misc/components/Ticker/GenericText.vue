<template>
  <div ref="Elem" :style="{ overflow: 'hidden' }">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

@Component
export default class Donation extends Vue {
  @Ref('Elem') readonly elem!: HTMLElement;
  backupTO!: number;
  anim!: gsap.core.Tween;

  mounted(): void {
    const fullWidth = this.elem.scrollWidth;
    const visibleWidth = this.elem.clientWidth;

    // Display time is minimum of 10s.
    let time = 10;
    if (fullWidth > visibleWidth) {
      const dist = fullWidth - visibleWidth;
      time = ((dist / 100) > 10) ? (dist / 100) : 10;
    }

    this.anim = gsap.to(this.elem, {
      duration: time,
      scrollTo: { x: 'max' },
      delay: 2,
      ease: 'none',
      onComplete: () => {
        window.clearTimeout(this.backupTO);
        setTimeout(() => { this.$emit('end'); }, 2 * 1000);
      },
    });

    // Backup in case the GSAP animation doesn't complete for some reason.
    this.backupTO = window.setTimeout(() => {
      this.anim.kill();
      this.$emit('end');
    }, (time + 2 + 2 + 2) * 1000);
  }
}
</script>
