<template>
    <!--1-->
    <div class="block"></div>
    <!--2-->
    <van-nav-bar class="header" @click-left="back" :title="title" left-text="返回" left-arrow>
        <template #right>
            <!--3-->
            <i class="iconfont icon-more" />
        </template>
    </van-nav-bar>

</template>

<script >
import { useRouter } from "vue-router";
export default {
    name: "HeaderHeader",
    // 4
    props: {
        title: {
            type: String,
            default: "",
        },
    },
    setup() {
        const router = useRouter();
        // 5
        // 返回方法
        const back = () => {
            router.back();
        };

        return {
            back,
        };
    },
};
</script>

<style lang="scss" scoped>
.block {
    width: 100%;
    height: 46px;
}

.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;

    .icon-more {
        font-size: 30px;
    }
}
</style>