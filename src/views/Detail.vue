<template>
  <HeaderHeader title="账单详情"/>
</template>

<script>
import HeaderHeader from "../components/Header.vue";
import { reactive, toRefs } from 'vue'
export default {
  name: 'Detail',
  components: {
    HeaderHeader
  },
  setup() {
    const data = reactive({})
    return {
      ...toRefs(data),
    }
  },
}

</script>
<style scoped>
</style>