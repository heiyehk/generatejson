<template>
  <div class="c-model">
    <div class="c-model-cover"></div>
    <div class="c-model-content flex-dcolumn">
      <div class="c-m-top flex-between">
        <div class="title">{{title}}</div>
        <div class="close">
          <i class="iconfont icon-close" @click="close"></i>
        </div>
      </div>
      <div class="c-m-content flex1">
        <slot></slot>
      </div>
      <div class="c-m-bottom">
        <div class="btns flex-center">
          <Button type="primary" @click="confirm">确认</Button>
          <Button @click="cancel">取消</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from 'vue-property-decorator';
import Button from './button.vue';

@Component
export default class Model extends Vue {
  @Prop(String) private title!: string;

  private mounted() {
    document.body.appendChild(this.$el);
  }

  @Emit('on-close')
  private close() {}

  @Emit('on-confirm')
  private confirm() {}

  @Emit('on-cancel')
  private cancel() {}
}
</script>

<style lang="less" scoped>
.c-model{
  position: fixed;
  z-index: 15;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  font-size: 14px;
  &-cover{
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0);
  }
  &-content{
    position: absolute;
    min-width: 300px;
    min-height: 120px;
    background-color: #fff;
    left: 50%;
    top: 50%;
    box-shadow: 0 0 5px 0 #ccc;
    border-radius: 5px;
    padding: 20px;
    box-sizing: border-box;
    animation: fadeInDown .5s forwards;
    .c-m-content{
      margin: 20px 0;
    }
  }
}
</style>