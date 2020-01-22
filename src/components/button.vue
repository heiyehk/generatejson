<template>
  <button class="c-button" :class="type" @click="click">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  @Prop() private type?: string;

  @Emit('click')
  private click(e: Event) {
    return e;
  }
}
</script>

<style lang="less" scoped>
button {
  font-size: 12px;
  padding: 9px 20px;
  border-radius: 3px;
  border: none;
  opacity: 1;
  color: #333;
  margin: 0 20px;
  opacity: 0.9;
  &:hover {
    opacity: 0.8;
    color: @primary;
    background-color: #ecf5ff;
  }
  &:active {
    opacity: 1;
  }
}
.primary {
  background-color: @primary !important;
  color: #fff !important;
}
.success {
  background-color: @success !important;
  color: #fff !important;
}
.gray {
  background-color: @gray !important;
  color: #fff !important;
}
</style>