<template>
  <drawer v-model="viewStatus" width="30%"></drawer>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import drawer from '@/components/drawer.vue';

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