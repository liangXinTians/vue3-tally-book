<template>
  <div></div>
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
<style scoped lang='less'>
</style>