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
    </div>-->
    <div class="op-item" v-if="localData.length">
      <div class="op-item-title">代码列表</div>
      <div class="op-item-input">
        <template v-for="(item, index) in localData">
          <div class="local-code" :key="index" @click="setCode(item)">
            <div class="top flex-between">
              <div class="name">{{item.name}}</div>
              <div class="time hidden">{{item.time}}</div>
            </div>
            <div class="content hidden">{{item.json | splitStrToStar(100)}}</div>
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
  name: string;
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

  @Watch('$store.state.localDataAPI')
  private watchAPI(nv: LocalDataType[]) {
    this.localData = nv;
  }

  @Emit('input')
  private change() {
    this.viewStatus = false;
    return this.viewStatus;
  }

  private setCode(item: LocalDataType) {
    this.$store.state.storeCode = item;
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
    border-bottom: 1px solid #ccc;
  }
  &-input {
    font-size: 15px;
  }
  .local-code {
    padding: 6px 10px;
    margin: 4px 0;
    cursor: pointer;
    position: relative;
    &:hover {
      background-color: @background;
    }
    .top {
      font-size: 14px;
      margin-bottom: 5px;
    }
    .content {
      position: relative;
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
}
</style>
