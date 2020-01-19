<template>
  <button class="c-button" :class="type">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  @Prop({ default: 'info' }) private type?: string;
}
</script>

<style lang="less" scoped>
button {
  font-size: 12px;
  padding: 9px 20px;
  border-radius: 3px;
  border: none;
  opacity: 1;
  color: #fff;
  margin: 0 20px;
  opacity: 0.9;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 1;
  }
}
.primary {
  background-color: @primary;
}
.success {
  background-color: @success;
}
.gray {
  background-color: @gray;
}
</style>