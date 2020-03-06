<template>
  <div class="page flex-dcolumn">
    <div class="top-header flex-between">
      <div class="l-t-h">
        <!-- <router-link to="/">CreateAPI</router-link> -->
      </div>
      <div class="c-t-h flex-items">
        <Button type="primary" @click="generateMock">{{$t('generate')}}</Button>
        <Button type="gray" @click="resetValues">{{$t('reset')}}</Button>
      </div>
      <div class="r-t-h flex-items">
        <a @click="viewStatus = true;">{{$t('guide')}}</a>
        <a @click="aboutStatus = true;">{{$t('about')}}</a>
        <!-- <a @click="aboutStatus = true;">{{$t('version')}}</a> -->
        <a @click="optionsStatus = true;">{{$t('options')}}</a>
        <Select
          v-model="$i18n.locale"
          :list="oplist"
          label="label"
          val="value"
          style="width: 120px;margin-left: 20px;"
        ></Select>
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
          <i class="iconfont icon-save" title="保存" @click="saveEvent"></i>
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
    <model
      title="保存"
      v-if="!saveModelHidden"
      @on-confirm="saveCode"
      @on-close="saveModelHidden = true; saveItemName = '';"
      @on-cancel="saveModelHidden = true; saveItemName = '';"
    >
      <hyinput
        ref="saveRef"
        style="width: 100%;"
        type="text"
        v-model="saveItemName"
        @validate="validate"
      />
    </model>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Utils from '@/utils/util';

// 组件
import drawer from '@/components/drawer.vue';
import model from '@/components/model.vue';
import cover from '@/components/cover.vue';
import hyinput from '@/components/hyinput.vue';
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

// 格式化
import 'codemirror/addon/lint/json-lint'
/**
 * 也可以使用下面这种方式
 * @require const documentMd = require('@/markdown/document.md');
 */
// @ts-ignore
import documentMd from '@/markdown/guide.md';
// @ts-ignore
import aboutMd from '@/markdown/about.md';

interface LocalDataType {
  name: string;
  time: string;
  json: string;
}

@Component({
  components: {
    drawer,
    cover,
    options,
    hyinput
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
  private editor: codemirror.Editor;
  private defaultCode: string = `/**
 * 请严格使用json格式，需要注意的是在生成的数据外围总是包含着{"data": []}
 * {
 *    "data": [
 *        // todo
 *    ]
 * }
 */
{
  "data|5": [
    {
      // 姓名
      "name": "@cname()",
      // guid
      "uid": "@guid()",
      // 地址
      "address": "@county()",
      // 头像
      "avatar": "@Image('100x100','@color')",
      // 生日
      "birthday": "@date('yyyy-MM-dd HH:mm:ss')",
      // 创建时间
      "create_time": "@date('yyyy-MM-dd HH:mm:ss')",
      // 更新时间
      "update_time": "@date('yyyy-MM-dd HH:mm:ss')",
      // 描述
      "description": "@cword(20, 50)"
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
  private saveStatus: boolean = false;

  // 保存时的名字
  private saveItemName: string = '';

  // 显示
  private viewStatus: boolean = false;
  private aboutStatus: boolean = false;
  private optionsStatus: boolean = false;
  private shows: boolean = true;
  private saveModelHidden: boolean = true;

  // 缓存
  private localData: LocalDataType[] = [];

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
    this.getLocalStorage();
    this.clientX = window.innerWidth / 2 + 'px';
    this.documentHtml = documentMd.replace(
      /href="*/g,
      'target="_brank" href="'
    );
    this.aboutHtml = aboutMd.replace(/href="*/g, 'target="_brank" href="');
    document.addEventListener('keydown', this.keydownEsc);
  }

  private mounted() {
    this.editorInit();
    this.disposeParams();
    document.addEventListener('click', () => {
      document.removeEventListener('mousemove', this.lineMove);
    });
  }

  private disposeParams() {
    const that = this;
    const { typeFullScreen, pathMatch } = this.$route.params;
    if (typeFullScreen && typeFullScreen === 'code') {
      this.isAmplification = true;
      this.displayType = 'code';
    } else if (typeFullScreen && typeFullScreen === 'output') {
      this.isAmplification = true;
      this.displayType = 'output';
    }
    if (!pathMatch) {
      return false;
    }
    try {
      this.editor.setValue(JSON.stringify(JSON.parse(pathMatch), null, 4));
      this.generateMock();
    } catch(error) {
      this.editor.setValue(pathMatch);
      that.mockJson.setValue(Utils.catchError(error.message));
      that.mockJson.setOption('mode', 'text/text');
      that.isAmplification = false;
      that.displayType = '';
    }
  }

  private getLocalStorage() {
    const localStorageAPI: string | null = localStorage.getItem('createapi');
    if (localStorageAPI) {
      const localDataAPI = JSON.parse(
        localStorage.getItem('createapi') as string
      );
      this.localData = localDataAPI;
      this.$store.state.localDataAPI = localDataAPI;
    }
  }
  private editorInit() {
    this.editor = codemirror.fromTextArea(
      this.$refs.editor as HTMLTextAreaElement,
      {
        value: this.defaultCode,
        mode: { name: 'javascript', json: true },
        lineNumbers: true, // 显示行号
        smartIndent: true, // 自动缩进
        foldGutter: true,
        autoCloseBrackets: true, // 自动关闭
        lineWrapping: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
      }
    );
    this.mockJson = codemirror.fromTextArea(
      this.$refs.mockjson as HTMLTextAreaElement,
      {
        mode: { name: 'javascript', json: true },
        lineNumbers: true, // 显示行号
        smartIndent: true, // 自动缩进
        readOnly: true,
        foldGutter: true,
        lineWrapping: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
      }
    );
  }

  private validationJson() {}

  // 生成
  private generateMock() {
    if (!this.editor.getValue()) {
      this.mockJson.setValue('Please generate data first!');
      this.mockJson.setOption('mode', 'text/text');
      return;
    }
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
      that.mockJson.setValue(Utils.catchError(error.message));
      that.mockJson.setOption('mode', 'text/text');
      that.isAmplification = false;
      that.displayType = '';
    }
  }

  // 保存
  private saveCode() {
    (this.$refs.saveRef as any).changeStatus();
    if (!this.saveStatus) {
      return false;
    }
    const data: LocalDataType = {
      name: this.saveItemName,
      time: Utils.getTime('YYYY-MM-DD'),
      json: this.editor.getValue()
    };
    this.localData.push(data);
    this.$store.state.localDataAPI = this.localData;
    localStorage.setItem('createapi', JSON.stringify(this.localData));
    this.saveItemName = '';
    this.saveModelHidden = true;
  }

  // 重置
  private resetValues() {
    this.editor.setValue(this.defaultCode);
    this.mockJson.setValue('');
    this.clientX = '50%';
    this.$router.push('/')
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

  /**
   * todo
   * 验证输入的内容
   */
  private saveEvent() {
    try {
      const editorCode = this.editor
        .getValue()
        .replace(/(?:^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/g, '')
        .replace(/\/\/.+/g, '');
      // 去除注释之后判断是否为json格式
      if (/^\{\w\W|}$/.test(editorCode.trim())) {
        this.saveModelHidden = false;
      }
    } catch (error) {}
  }

  // esc按下
  private keydownEsc(e: KeyboardEvent) {
    if (e.keyCode === 27) {
      if (this.isAmplification) {
        this.isAmplification = false;
        this.displayType = '';
      }
      this.viewStatus = false;
      this.aboutStatus = false;
      this.optionsStatus = false;
    }
  }

  private mockDataDownload() {
    const mockJsonData = this.mockJson.getValue();
    if (!mockJsonData || !/^\[\w\W|]$/.test(mockJsonData)) {
      this.mockJson.setValue('Please generate data first!');
      this.mockJson.setOption('mode', 'text/text');
      return;
    }
    const blob: Blob = new Blob([mockJsonData], {
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

  private validate(data: boolean) {
    this.saveStatus = data;
  }
}
</script>

<style lang="less" scoped>
.page {
  height: 100%;
}
.top-header {
  user-select: none;
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
      padding: 5px 14px;
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
    width: 100% !important;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 1;
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
