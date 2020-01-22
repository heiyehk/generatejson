<template>
  <drawer v-model="viewStatus" width="30%">
    <!-- <div class="op-item">
      <div class="op-item-title">空格缩进</div>
      <div class="op-item-input">
        <input type="text" />
      </div>
    </div>
    <div class="op-item">
      <div class="op-item-title">Split分割</div>
      <div class="op-item-input">
        <input type="text" />
      </div>
    </div>
    <div class="op-item">
      <div class="op-item-title">主题展示</div>
      <div class="op-item-input">
        <input type="text" />
      </div>
    </div> -->
    <div class="op-item" v-if="localData.length">
      <div class="op-item-title">代码列表</div>
      <div class="op-item-input">
        <template v-for="(item, index) in localData">
          <div class="local-code flex-between" :key="index">
            <div class="time hidden">{{item.time}}</div>
            <div class="content hidden">{{item.json | splitStrToStar(50)}}</div>
          </div>
        </template>
      </div>
    </div>
  </drawer>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import drawer from '@/components/drawer.vue';

interface LocalDataType {
  time: string;
  json: string;
}

@Component({
  components: {
    drawer
  }
})
export default class Options extends Vue {
  @Prop(String) private title?: string;
  @Prop(String) private content!: string;
  @Prop({ default: false }) private value!: boolean;

  private viewStatus: boolean = false;
  private localData: LocalDataType[] = [];
  private errorMessage: string = '';

  private mounted() {
    const localData: string | null = localStorage.getItem('createapi');
    if (localData) {
      try {
        this.localData = JSON.parse(localData);
      } catch (error) {
        this.localData = [];
        this.errorMessage = '本地缓存数据出错，请检查';
      }
    }
  }

  @Watch('value')
  private watchStatus(nv: boolean) {
    this.viewStatus = nv;
  }

  @Emit('input')
  private change() {
    this.viewStatus = false;
    return this.viewStatus;
  }
}
</script>

<style lang="less" scoped>
.op-item {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  &-title {
    font-size: 16px;
    padding: 5px 10px;
  }
  &-input {
    font-size: 15px;
  }
  .local-code {
    height: 36px;
    padding: 0 10px;
    cursor: pointer;
    position: relative;
    &:hover {
      background-color: @background;
    }
    .content {
      max-width: 50%;
    }
    &::before {
      content: '';
      position: absolute;
      height: 100%;
      width: 20%;
      background-image: linear-gradient(to right, transparent 10%, #fff 90%);
      top: 0;
      right: 0;
    }
  }
}
</style>
