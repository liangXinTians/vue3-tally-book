<!-- <template>
  <van-cell icon="good-job-o" @click="visibleRate = true" title="软件评分" is-link />
  <van-dialog class="rate" v-model:show="visibleRate" title="软件评分" show-cancel-button>
    <van-rate class="rate" v-model="rate" allow-half void-icon="star" void-color="#eee" />
    111111111111111
  </van-dialog> 
</template>
  
<script>
import { Dialog } from 'vant';
import { onMounted, reactive, toRefs,ref } from "vue";
export default {
  name: "Data",

  setup() {
    const visibleRate = ref(false)
    const rate = 4.5
    return{
      visibleRate,
      rate,
    }
  }
};
</script>
  
<style>

</style> -->
<template>
  <div>统计</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name: '',
  setup() {
    const data = reactive({})
    return {
      ...toRefs(data),
    }
  },
}

</script>
<style scoped>
div{
  text-align: center;
}
</style>