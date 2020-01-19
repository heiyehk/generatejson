<template>
  <div class="page flex-dcolumn">
    <div class="top-header flex-between">
      <div class="l-t-h">
        <!-- <router-link to="/">CreateAPI</router-link> -->
      </div>
      <div class="c-t-h flex-items">
        <Button type="primary" @click="generateMock">{{$t('generate')}}</Button>
        <Button type="success" @click="showDemoCode">{{$t('example')}}</Button>
        <Button type="gray" @click="resetValues">{{$t('reset')}}</Button>
      </div>
      <div class="r-t-h flex-items">
        <a @click="viewStatus = true;">{{$t('guide')}}</a>
        <a @click="aboutStatus = true;">{{$t('about')}}</a>
        <!-- <a @click="optionsStatus = true;">{{$t('options')}}</a> -->
        <Select v-model="$i18n.locale" :list="oplist" label="label" val="value" style="width: 120px;margin-left: 20px;"></Select>
      </div>
    </div>
    <div class="code-content flex-between flex1">
      <div
        class="l-cc-enter"
        :style="leftCodeContStyle"
        :class="displayType === 'code' ? 'amplification' : ''"
      >
        <textarea ref="editor" class="editor" v-model="defaultCode"></textarea>
        <div class="oper-icons">
          <i
            :title="isAmplification ? '缩小' : '放大'"
            class="iconfont"
            :class="isAmplification && displayType === 'code' ? 'icon-zoomout' : 'icon-amplification'"
            @click="amplification($event, 'code')"
          ></i>
          <!-- <i class="iconfont icon-save" title="保存" @click="saveCode"></i> -->
        </div>
      </div>
      <div class="c-cc-line" @mousedown="lineDown" @mouseup="lineUp" :style="linStyle">=</div>
      <div class="r-cc-output flex1" :class="displayType === 'output' ? 'amplification' : ''">
        <textarea ref="mockjson" class="editor"></textarea>
        <div class="oper-icons">
          <i
            :title="isAmplification ? '缩小' : '放大'"
            class="iconfont"
            :class="isAmplification && displayType === 'output' ? 'icon-zoomout' : 'icon-amplification'"
            @click="amplification($event, 'output')"
          ></i>
          <i class="iconfont icon-download" title="下载" @click="mockDataDownload"></i>
        </div>
      </div>
    </div>
    <cover
      v-if="viewStatus || aboutStatus || optionsStatus"
      @click="viewStatus = false; aboutStatus = false; optionsStatus = false;"
    ></cover>
    <drawer v-model="viewStatus" title="Mockjs指南" :content="documentHtml"></drawer>
    <drawer v-model="aboutStatus" title="关于CreateAPI" :content="aboutHtml"></drawer>
    <options v-model="optionsStatus"></options>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

// 组件
import drawer from '@/components/drawer.vue';
import cover from '@/components/cover.vue';
import options from './components/options.vue';

// mockjs
import mockjs from 'mockjs';

// codemirror
import codemirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';

// 折叠插件
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/foldgutter.css';

// 自动闭合{}[]""''
import 'codemirror/addon/edit/closebrackets';

/**
 * 也可以使用下面这种方式
 * @require const documentMd = require('@/markdown/document.md');
 */
// @ts-ignore
import documentMd from '@/markdown/guide.md';
// @ts-ignore
import aboutMd from '@/markdown/about.md';
@Component({
  components: {
    drawer,
    cover,
    options
  }
})
export default class Main extends Vue {
  private oplist: object[] = [
    {
      label: '中文',
      value: 'zh'
    },
    {
      label: 'English',
      value: 'en'
    }
  ];
  public $refs: {
    editor: HTMLTextAreaElement;
    mockjson: HTMLTextAreaElement;
  };
  private editor: codemirror.Editor;
  private demoCode: string = `{
  "data|20": [
    {
      "name": "@cname()",
      "uid": "@guid()",
      "address": "@county()",
      "avatar": "@Image('100x100','@color')"
    }
  ]
}
`;
  private defaultCode: string = `/**
 * 请使用json格式
 * 20条
 */
{
  "data|20": [
    {
      // 姓名
      "name": "@cname()",
      // guid
      "uid": "@guid()",
      // 地址
      "address": "@county()",
      // 头像
      "avatar": "@Image('100x100','@color')"
    }
  ]
}
`;
  private mockJson: codemirror.Editor;
  private clientX: number | string = '50%';
  private prevClientX: number | string = '';
  private documentHtml: string = '';
  private aboutHtml: string = '';
  private langs: string[] = ['en', 'zh'];
  private isAmplification: boolean = false;
  private displayType: string = '';

  private viewStatus: boolean = false;
  private aboutStatus: boolean = false;
  private optionsStatus: boolean = false;
  private shows: boolean = true;

  get linStyle(): string {
    return `left: ${this.clientX};`;
  }

  get leftCodeContStyle(): string {
    if (this.clientX === '50%') {
      return 'flex: 1';
    }
    return `width: ${this.clientX}`;
  }

  private created() {
    this.documentHtml = documentMd;
    this.aboutHtml = aboutMd;
    document.addEventListener('keydown', this.keydownEsc);
  }

  private mounted() {
    this.editorInit();
    document.addEventListener('click', () => {
      document.removeEventListener('mousemove', this.lineMove);
    });
  }

  private editorInit() {
    this.editor = codemirror.fromTextArea(this.$refs.editor, {
      value: this.defaultCode,
      mode: { name: 'javascript', json: true },
      lineNumbers: true, // 显示行号
      smartIndent: true, // 自动缩进
      foldGutter: true,
      autoCloseBrackets: true, // 自动关闭
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
    });
    this.mockJson = codemirror.fromTextArea(this.$refs.mockjson, {
      mode: { name: 'javascript', json: true },
      lineNumbers: true, // 显示行号
      smartIndent: true, // 自动缩进
      readOnly: true,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
    });
  }

  // 生成
  private generateMock() {
    const that = this;
    try {
      this.mockJson.setOption('mode', 'text/javascript');
      const jsonMockValue = JSON.parse(
        this.editor
          .getValue()
          .replace(/(?:^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/g, '')
          .replace(/\/\/.+/g, '')
      );
      const data = mockjs.mock(jsonMockValue).data;
      this.mockJson.setValue(JSON.stringify(data, null, 4));
    } catch (error) {
      that.mockJson.setValue(error.message);
      that.mockJson.setOption('mode', 'text/text');
    }
  }

  // 示例
  private showDemoCode() {
    this.editor.setValue(this.demoCode);
    this.generateMock();
  }

  // 保存
  private saveCode() {
    console.log(this.editor.getValue());
  }

  // 重置
  private resetValues() {
    this.editor.setValue(this.defaultCode);
    this.mockJson.setValue('');
    this.clientX = '50%';
  }

  // 线条被按下
  private lineDown(e: MouseEvent) {
    this.prevClientX = this.clientX;
    document.addEventListener('mousemove', this.lineMove);
  }

  private lineUp(e: MouseEvent) {
    document.removeEventListener('mousemove', this.lineMove);
    if (this.clientX === '50%') {
      // 未移动就取消后面操作
      return;
    }
    if (this.prevClientX === this.clientX) {
      // 用来重置line的距离
      this.clientX = '50%';
    } else {
      this.prevClientX = this.clientX;
    }
  }

  private lineMove(e: MouseEvent) {
    const clientX = e.clientX;
    if (clientX <= 500) {
      // 左边最低500，右边最低600
      this.clientX = '500px';
    } else if (clientX > 500 && clientX < window.innerWidth - 500) {
      this.clientX = `${clientX}px`;
    } else if (clientX >= window.innerWidth - 600) {
      this.clientX = `${window.innerWidth - 600}px`;
    }
  }

  // 查看指南
  private viewGuide() {
    this.viewStatus = true;
  }

  // 查看关于
  private viewAbout() {
    console.log(cover);
  }

  // 放大缩小
  private amplification(e: Event, type: string) {
    if (this.isAmplification) {
      this.isAmplification = false;
      this.displayType = '';
    } else {
      this.displayType = type;
      this.isAmplification = true;
    }
  }

  // esc按下
  private keydownEsc(e: KeyboardEvent) {
    if (e.keyCode === 27 && this.isAmplification) {
      this.isAmplification = false;
      this.displayType = '';
    }
  }

  private mockDataDownload() {
    const blob: Blob = new Blob([this.mockJson.getValue()], {
      type: 'type/json'
    });
    const documentA = document.createElement('a');
    documentA.href = URL.createObjectURL(blob);
    documentA.download = 'download.json';
    documentA.dispatchEvent(
      new MouseEvent('click', { bubbles: true, cancelable: true, view: window })
    );
    window.URL.createObjectURL(blob);
  }

  private destroyed() {
    // 消除esc按下事件
    document.removeEventListener('keydown', this.keydownEsc);
  }
}
</script>

<style lang="less" scoped>
.page {
  height: 100%;
}
.top-header {
  height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
  color: @info;
  border-bottom: 1px solid @border;
  position: relative;
  .l-t-h {
    font-size: 28px;
  }
  .c-t-h {
    position: absolute;
    height: 100%;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }
  .r-t-h {
    a {
      font-size: 14px;
      margin-left: 20px;
      display: block;
      padding: 5px 20px;
      background-color: #ffffff;
      transition: background-color 0.3s;
      &:first-child {
        margin-left: 0;
      }
      &:hover {
        color: #fff;
        background-color: @primary;
        transition: background-color 0.3s;
      }
    }
  }
}
.code-content {
  position: relative;
  height: 100%;
  overflow: auto;
  .c-cc-line {
    user-select: none;
    position: fixed;
    width: 6px;
    height: calc(100% - 50px);
    background-color: #f5f5f5;
    left: 50%;
    bottom: 0;
    border-left: 1px solid @border;
    border-right: 1px solid @border;
    z-index: 11;
    display: flex;
    align-items: center;
    font-size: 10px;
    text-align: center;
    cursor: w-resize;
    transition: background-color 0.3s;
    opacity: 0.7;
    margin-left: -2px;
    &:hover {
      background-color: #fff;
      transition: background-color 0.3s;
    }
    &:active {
      background-color: rgba(45, 139, 240, 0.1);
      transition: background-color 0.3s;
    }
  }
  .l-cc-enter,
  .r-cc-output {
    height: 100%;
    position: relative;
    textarea {
      width: 100%;
      height: 100%;
    }
    &:hover .oper-icons {
      opacity: 1;
      z-index: 12;
      transition: all 0.3s;
    }
  }
  .amplification {
    position: fixed !important;
    z-index: 14;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 1;
    transition: all 0.3s;
  }
}
.oper-icons {
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: -1;
  opacity: 0;
  .iconfont {
    font-size: 24px;
    background-color: #fff;
    cursor: pointer;
    transition: all 0.3s;
    display: block;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
    &:hover {
      box-shadow: 0 0 5px 0 #ccc;
      transition: all 0.3s;
    }
  }
}
select {
  padding: 3px 15px;
  font-size: 16px;
  option {
    display: block;
    min-height: 40px;
  }
}
</style>
