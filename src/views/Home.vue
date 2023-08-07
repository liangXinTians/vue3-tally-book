<template>
  <div class="home">
    <div class="header">
      <div class="type-wrap" @click="toggle">
        <span class="title">{{ currentSelect.name || '全部类型' }}</span>
        <i class="iconfont icon-quanbu1" />
      </div>
      <div class="data-wrap">
        <span class="time" @click="monthToggle"> {{ currentTime }} <i class="iconfont icon-xiala" /></span>
        <!-- <span class="time">2022-10<i class="iconfont icon-xiala" /></span> -->
        <span class="expense">总支出 ¥1000.00</span>
        <span class="income">总收入 ¥2000.00</span>
      </div>
    </div>
    <div class="content-wrap">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" >
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
          class="list-width">
          <CardItem v-for="item in 10" :bill="item" :key="item" />
        </van-list>
      </van-pull-refresh>
    </div>
    <PopType ref="popRef" @select="select" />
    <PopMonth ref="popMonthRef" @select="selectMonth" />
    <div class="add">
      <van-icon name="records" @click="addToggle"/>
    </div>
    <PopAdd ref="popAddRef" />
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import PopType from "../components/PopType.vue";
import PopMonth from '../components/PopMonth.vue'
import CardItem from '../components/CardItem.vue'
import PopAdd from '../components/PopAdd.vue'
import axios from '../utils/axios'
import dayjs from 'dayjs'


export default {
  name: "Home",
  components: {
    PopType,CardItem,PopMonth,PopAdd
  },
  setup() {
    // 声明 ref，通过 popRef 我们可以拿到 PopType 组件内的属性和方法。
    const popRef = ref(null);
    const popMonthRef = ref(null)
    const popAddRef = ref(null)

    const state = reactive({
      page: 1, 
      totalPage: 0, // 总页数。
      list: [], 
      loading: false,
      finished: false,
      refreshing: false,
      currentSelect: {},
      currentTime: dayjs().format('YYYY-MM')

    });

    const monthToggle = () => {
      popMonthRef.value.toggle()
    }

    const toggle = () => {
      // PopTye 组件的 toggle 方法在 popRef.value 内可以找到，所以在此调用 popRef.value.toggle 方法，可以让弹窗的 show 属性变为 true，让弹窗从底部弹出。
      popRef.value.toggle();
    };
    // 筛选类型
    // 这个方法将传入 PopType 组件，组件内部已经声明了 emit 触发下面的 select，并且附带了类型数据 item，所以我们在这里可以拿到属性，将其显示到头部。
    const select = (item) => {
      state.currentSelect = item;
    };

    const selectMonth = (item) => {
      state.currentTime = item
    }
 
    const addToggle = () => {
        popAddRef.value.toggle()
      }


    const getBillList = async () => {
      // 请求列表接口。
      const { data } = await axios.get(`/api/bill/list?date=${state.currentTime}&type_id=${state.currentSelect.id || 'all'}&page=${state.page}&page_size=5`)
      // 如果 refreshing 为 true，代表下拉刷新了，需要重置 list = []。
      if (state.refreshing) {
        state.list = []
        state.refreshing = false
      }
      state.loading = false
      // 通过 concat 将数据拼接在旧的 list 后面。
      state.list = state.list.concat(data.list)
      state.totalPage = data.totalPage
      // 如果当前页 page 大于等于总页数 totalPage，则代表数据已经请求完，将 finished 设置为 true。
      if (state.page >= state.totalPage) state.finished = true
    }

    // van-list 加载方法。
    const onLoad = () => {
      // 当不是下拉刷新且当前页 page 小于总页数 totalPage，需要加载下一页的数据，所以这里
      if (!state.refreshing && state.page < state.totalPage) {
        state.page = state.page + 1 
      }
      getBillList()
    }
    // van-pull-refresh 刷新方法。
    const onRefresh = () => {
      // 清空列表数据。
      state.finished = false;
      // 页数重置。
      state.page = 1
      // 重新加载数据。
      // 将 loading 设置为 true，表示处于加载状态。
      state.refreshing = true
      state.loading = true;
      onLoad()
    }







    return {
      ...toRefs(state),
      popRef,
      toggle,
      select,

      onLoad,
      onRefresh,

      popMonthRef,
      monthToggle,
      selectMonth,

      popAddRef,
      addToggle,
    };
  },
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 80px;

  .header {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 80px;
    // background-color: rgb(57, 190, 119);
    background-color: $primary;
    color: #fff;
    font-size: 14px;
    padding: 20px 20px;
    z-index: 100;

    .type-wrap {
      // background-color: rgb(80, 202, 132);
      background-color: #50ca84;
      display: inline-block;
      padding: 4px 6px 4px 6px;
      margin-top: 4px;
      border-radius: 4px;
      position: relative;
      align-self: baseline;

      .title {
        margin-right: 22px;
      }

      .title::after {
        content: '';
        position: absolute;
        top: 12px;
        bottom: 11px;
        right: 32px;
        width: 1px;
        background-color: #e9e9e9;
      }
    }

    .data-wrap {
      margin-top: 10px;
      font-size: 13px;
      text-align: left;
      margin-left: 3px;

      .time {
        margin-right: 12px;

        .sort-down {
          font-size: 12px;
        }
      }

      .expense {
        margin-right: 10px;
      }
    }
  }

  .content-wrap {
    // height: calc(~"(100% - 50px)");
    height: calc(100% - 50px);
    overflow: hidden;
    overflow-y: scroll;
    background-color: #f5f5f5;
    padding: 10px;
    width: 100%;
    // text-align: left;
  }
}
.add {
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #e9e9e9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  color: $primary;
}
</style>