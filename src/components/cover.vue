<template>
  <div class="component-cover" :style="setBgStyle" @click="click"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';

@Component
export default class Cover extends Vue {
  @Prop({ default: false }) private value!: boolean;
  @Prop({ default: 'rgba(255, 255, 255, .5);' })
  private backgroundColor: string;
  private viewStatus: boolean = false;

  get setBgStyle(): string {
    return `background-color: ${this.backgroundColor};`;
  }

  @Emit('click')
  private click() {
    this.viewStatus = false;
    return this.viewStatus;
  }
}
</script>

<style lang="less" scoped>
.component-cover {
  position: fixed;
  z-index: 12;
  width: 100%;
  height: 100%;
}
</style>