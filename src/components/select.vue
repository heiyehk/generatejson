<template>
  <div class="c-select">
    <div
      class="c-select-active"
      :class="value ? '' : 'c-select-placeholder'"
      @click="show = !show;"
    >{{value ? activeSelect : placeholder}}</div>
    <div class="c-select-list" :style="scrollStyle">
      <template v-for="(item, index) in list">
        <div
          class="c-select-item"
          :class="activeSelect === item[label] ? 'option-active' : ''"
          :key="index"
          @click="selectItem(index)"
        >{{item[label]}}</div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Emit,
  Watch,
  Model
} from 'vue-property-decorator';

interface ListTypes {
  [prop: number]: any;
}

@Component
export default class Select extends Vue {
  @Prop({ default: '' }) private value?: string;
  @Prop() private list?: ListTypes[];
  @Prop() private label?: any;
  @Prop() private val?: any;
  @Prop({ default: '请选择' }) private placeholder?: string;

  private activeSelect?: string = '';
  private show: boolean = false;

  get scrollStyle(): string {
    if (!this.show || !(this.list as ListTypes[]).length) {
      return 'overflow: hidden;';
    }
    if ((this.list as ListTypes[]).length >= 6) {
      return 'height: 200px;overflow-y: auto;padding: 5px 0;z-index: 12;top: 43px;opacity: 1;transition: all .3s;';
    } else {
      return `height: ${(this.list as ListTypes[]).length *
        35}px;overflow: hidden;padding: 5px 0;z-index: 12;top: 43px;opacity: 1;transition: all .3s;`;
    }
  }

  @Watch('value')
  private watchValue(nv: string) {
    return;
  }

  private mounted() {
    const filterLists = (this.list as ListTypes[]).filter(x => x[this.val] === this.value)[0];
    this.activeSelect = filterLists[this.label];
    document.addEventListener('click', this.contains);
  }

  @Emit('input')
  private selectItem(index: number): string {
    this.show = false;
    const value = (this.list as ListTypes[])[index][this.val];
    this.activeSelect = (this.list as ListTypes[])[index][this.label];
    this.change(value);
    return value;
  }

  @Emit('on-change')
  private change(value: string) {
    return value;
  }

  private contains(e: MouseEvent) {
    if (!(e.target as Node).contains(this.$el.children[0])) {
      this.show = false;
    }
  }

  private destroyed() {
    // 消除esc按下事件
    document.removeEventListener('click', this.contains);
  }
}
</script>

<style lang="less" scoped>
.c-select {
  font-size: 14px;
  width: 200px;
  position: relative;
  line-height: 35px;
  &-active {
    border: 1px solid @border;
    padding: 0 13px;
    color: @content;
    cursor: pointer;
    transition: all 0.3s;
    box-sizing: border-box;
    border-radius: 3px;
    height: 35px;
    background-color: #fff;
    &:hover {
      border: 1px solid @primary;
      transition: all 0.3s;
    }
  }
  &-placeholder {
    color: #ccc;
  }
  &-list {
    position: absolute;
    z-index: -1;
    width: 100%;
    top: 20px;
    border: 1px solid @border;
    background-color: #fff;
    cursor: pointer;
    border-radius: 3px;
    height: 0;
    padding: 0;
    max-height: 200px;
    overflow-y: auto;
    transition: all 0.3s;
    opacity: 0;
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(141, 141, 141, 0.1);
      background-color: #f5f5f5;
      border-radius: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #bbb;
      border-radius: 5px;
    }
    .c-select-item {
      height: 35px;
      line-height: 35px;
      padding: 0 13px;
      color: @content;
      &:hover {
        background-color: @background;
        transition: background-color 0.3s;
      }
    }
    .option-active {
      background-color: @background;
      color: @primary;
    }
  }
}
</style>