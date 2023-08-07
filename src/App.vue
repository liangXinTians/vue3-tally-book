<template>
    <router-view/>
    <NavBar v-if="show"/>
    <!-- <NavBar v-show="show"/> -->

</template>
<script>
import NavBar from './components/NavBar.vue';
import { useRouter } from "vue-router";
import { reactive, toRefs } from "vue";
  export default {
    name: "App",
    components: {
      NavBar,
    },
    setup() {
      const state = reactive({
        // 2
        menu: ["/home", "/data", "/user"],
        show: false,
      });
      const router = useRouter();

      // 当更换路径时，会执行回调方法。我们在回调方法内通过 router.currentRoute.value.path 属性拿到当前路径
      router.afterEach(() => {
        // menu 内的路径都是需要展示底部导航栏的
        state.show = state.menu.includes(router.currentRoute.value.path);
      });

      return {
        ...toRefs(state),
      };
    },
  };
</script>
<style>

</style>
