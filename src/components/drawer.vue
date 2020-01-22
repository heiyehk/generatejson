<template>
  <div class="drawer" v-if="viewStatus" :style="drawerStyle">
    <div class="d-content">
      <div class="d-c-top flex-between">
        <h1 class="c-t-l" v-if="title">{{title}}</h1>
        <div class="c-t-r">
          <i class="iconfont icon-close" @click="close"></i>
        </div>
      </div>
      <div class="d-c-context markdown-body" :style="drawerContentStyle" v-if="content" v-html="content">{{content}}</div>
      <div class="d-c-context" :style="drawerContentStyle" v-else>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop, Watch } from 'vue-property-decorator';

@Component
export default class Drawer extends Vue {
  @Prop(String) private title?: string;
  @Prop(String) private width?: string;
  @Prop(String) private content!: string;
  @Prop({ default: false }) private value!: boolean;

  private viewStatus: boolean = false;

  @Watch('value')
  private watchStatus(nv: boolean) {
    this.viewStatus = nv;
  }

  get drawerStyle(): string {
    return `width: ${this.width}`;
  }

  get drawerContentStyle(): string {
    return `height: ${this.title ? 'calc(100% - 60px)' : '100%'};`;
  }

  @Emit('input')
  private change() {
    this.viewStatus = false;
    return this.viewStatus;
  }

  @Emit('on-close')
  private close() {
    this.change();
    this.viewStatus = false;
    return this.viewStatus;
  }
}
</script>

<style lang="less" scoped>
.drawer {
  position: fixed;
  z-index: 13;
  width: 50%;
  height: 100%;
  right: 0;
  top: 0;
  bottom: 0;
  animation: hidein 0.5s;
  .d-content {
    position: absolute;
    width: 100%;
    height: 100%;
    right: 0;
    top: 0;
    background-color: #fff;
    box-shadow: 0 0 14px 1px #ccc;
  }
}
.d-c-top {
  height: 60px;
  padding: 0 20px;
  box-shadow: 0 0 6px 0 #ccc;
  position: relative;
  h1 {
    font-size: 24px;
  }
  .iconfont {
    font-size: 22px;
    background-color: #fff;
    transition: background-color 0.3s;
    &:hover {
      color: #fff;
      background-color: @primary;
      transition: background-color 0.3s;
    }
  }
}
.d-c-context {
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
}
@keyframes hidein {
  0% {
    right: -50%;
    opacity: 0;
  }
  100% {
    right: 0;
    opacity: 1;
  }
}
</style>