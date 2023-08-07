<template>
  <van-popup v-model:show="show" position="bottom" round :style="{ height: '70%' }">
    <div class="pop">
      <div class="header van-hairline--bottom">
        请选择类型
        <van-icon name="cross" class="cross" @click="toggle" />
      </div>
      <div class="content">
        <div @click="choseType({ id: 'all' })" :class="{ all: true, active: active == '全部类型' }">
          全部类型
        </div>
        <div class="title">支出</div>
        <div class="expense-wrap">
          <p @click="choseType(item)" :class="{ active: active == item.id }" v-for="item in expense" :key="item">
            {{ item.name }}
          </p>
        </div>
        <div class="title">收入</div>
        <div class="income-wrap">
          <p @click="choseType(item)" :class="{ active: active == item.id }" v-for="item in income" :key="item">
            {{ item.name }}
          </p>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import axios from "../utils/axios.js";
export default {
  props: {
    select: Function, 
  },
  setup(props, ctx) {
    const state = reactive({
      active: "全部类型",
      show: false,
      expense: [],
      income: [],
    });

    onMounted(async () => {
      // type=1 代表支出的标签类型，type=2 代表收入的标签类型
      const {
        data: { list },
      } = await axios.get("/api/type/list");
      state.expense = list.filter((i) => i.type == 1);
      state.income = list.filter((i) => i.type == 2);
    });

    // 控制弹窗的展示和隐藏
    const toggle = () => {
      state.show = !state.show;
    };

    // 选择标签方法
    const choseType = (item) => {
      state.active = item.id;
      state.show = false;
      // 通过 emit 方法触发父组件传入的 select 方法，并将选择好的类型数据传回去
      ctx.emit("select", item);
    };

    return {
      ...toRefs(state),
      toggle,
      choseType,
    };
  },
};
</script>

<style lang="scss" scoped>
.pop {
  position: relative;
  background-color: #f5f5f5;

  .header {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 56px;
    text-align: center;
    font-size: 14px;
    line-height: 56px;
    color: $color-text-base;
    background-color: #fff;

    .cross {
      position: absolute;
      left: 10px;
      top: 50%;
      font-size: 20px;
      transform: translateY(-50%);
      color: $color-text-secondary;
    }
  }

  .content {
    padding: 20px;

    .all {
      display: inline-block;
      padding: 12px 20px;
      font-size: 16px;
      color: $color-text-base;
      background-color: #fff;
    }

    .title {
      color: $color-text-caption;
      margin: 10px 0;
      font-size: 14px;
    }

    .expense-wrap,
    .income-wrap {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      p {
        width: calc((100% - 20px) / 3);
        text-align: center;
        padding: 12px 0;
        margin-bottom: 10px;
        background-color: #fff;
        font-size: 16px;
      }
    }

    .active {
      background-color: $primary !important;
      color: #fff;
    }
  }
}
</style>

