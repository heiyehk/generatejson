<template>
  <div class="sinput">
    <input
      :class="inputClass"
      :type="type"
      v-model="inputValue"
      :placeholder="placeholder"
      spellcheck="false"
      :maxlength="maxlength"
      @blur="success ? inputClass = '' : inputClass = 'error-shadow'"
      @input="validate"
      @keydown.enter="keydown"
      :readonly="readonly"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';

@Component
export default class Hyinput extends Vue {
  @Prop({ default: 'text' }) private type: string;
  @Prop() private value: string;
  @Prop() private placeholder?: string;
  @Prop() private maxlength?: string | number;
  @Prop() private readonly?: boolean;
  @Prop() private equal?: string;

  // 是否必填
  @Prop() private required?: boolean;

  // 验证正则
  @Prop() private regexp?: string;

  private inputValue: string = '';
  private success: boolean = false;
  private inputClass: string = '';

  @Emit()
  private input() {
    if (
      !this.inputValue ||
      (this.regexp &&
        this.inputValue &&
        !this.equal &&
        !eval(this.regexp).test(this.inputValue)) ||
      (this.equal && this.equal !== this.inputValue)
    ) {
      this.success = false;
      this.inputClass = 'error-shadow';
    }
    if (
      (this.inputValue && !this.regexp && !this.equal) ||
      (this.inputValue &&
        this.regexp &&
        !this.equal &&
        eval(this.regexp).test(this.inputValue)) ||
      (this.equal && this.equal === this.inputValue)
    ) {
      this.success = true;
      this.inputClass = 'success-shadow';
    }
    return this.inputValue;
  }

  @Emit() 
  private validate() {
    if (
      !this.inputValue ||
      (this.regexp &&
        this.inputValue &&
        !this.equal &&
        !eval(this.regexp).test(this.inputValue)) ||
      (this.equal && this.equal !== this.inputValue)
    ) {
      return false;
    }
    if (
      (this.inputValue && !this.regexp) ||
      (this.inputValue &&
        this.regexp &&
        !this.equal &&
        eval(this.regexp).test(this.inputValue)) ||
      (this.equal && this.equal === this.inputValue)
    ) {
      return true;
    }
    return false;
  }

  @Emit('keydown')
  private keydown() {
    return true;
  }

  @Watch('value')
  private onValue(nv: string) {
    this.inputValue = nv;
  }

  @Watch('inputValue')
  private oninputValue(nv: string) {
    this.input();
  }

  private changeStatus() {
    this.input();
  }
}
</script>

<style lang="less" scoped>
.sinput {
  overflow: hidden;
  width: 250px;
  height: 35px;
  input {
    display: block;
    width: 100%;
    height: 100%;
    border: none;
    padding: 0 5px;
    transition: all 0.3s;
    font-size: 14px;
    box-shadow: inset 0 0 3px @info;
  }
}
.error-shadow {
  box-shadow: inset 0 0 3px @error !important;
}
.success-shadow {
  box-shadow: inset 0 0 3px @success !important;
}
</style>
