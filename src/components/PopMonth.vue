<template>
    <van-popup v-model:show="show" position="bottom" round :style="{ height: '46%' }">
        <!-- vant4版本 -->
        <!-- <van-date-picker
            v-model="currentDate"
            title="选择年月"
            :formatter="formatter"
            :columns-type="columnsType"
            @change="changeFn"
            @confirm="choseMonth"
            @cancel="toggle"
            >
        </van-date-picker> -->


        <!-- vant3版本 -->
        <van-datetime-picker
            v-model="active"
            title="选择年月"
            type="year-month"
            :formatter="formatter"
            @confirm="choseMonth"
            @cancel="toggle"
            >
        </van-datetime-picker>
    </van-popup>
</template>


<script>
  import { onMounted, reactive, toRefs } from "vue";
  import dayjs from "dayjs";
  export default {
    props: {
      select: Function,
    },
    setup(props, ctx) {
      const state = reactive({
        show: false,
        active: new Date(),
      });

      const toggle = () => {
        state.show = !state.show;
      };

      const choseMonth = (item) => {
        console.log(item);
        state.active = item;
        state.show = false;
        ctx.emit("select", dayjs(item).format("YYYY-MM"));
      };

      const formatter = (type, val) => {
        if (type === "year") {
          return `${val}年`;
        } else if (type === "month") {
          return `${val}月`;
        }
        return val;
      };

      return {
        ...toRefs(state),
        toggle,
        choseMonth,
        formatter,
      };
    },
  };
</script>





<!-- vant4版本 -->
<!-- <script>
import { onMounted, ref, reactive, toRefs } from "vue";
import dayjs from "dayjs";
export default {
    name: 'PopMonth',
    props: {
        select: Function,
    },

    setup(props, ctx) {
        const state = reactive({
            show: false,
            // currentDate: new Date(),
        });

        const currentDate = ref(['2022', '01'])
        // const currentDate = new Date();
        const columnsType = ['year', 'month'];

        const toggle = () => {
            state.show = !state.show;
        };

        const choseMonth = (item) => {
            // console.log(item);
            // currentDate = item;
            // state.show = false;
            state.show = !state.show;
            ctx.emit("select", dayjs(item).format("YYYY-MM"));
        };
        /ant3版本
        // const formatter = (type, val) => {
        //     if (type === "year") {
        //         return `${val}年`;
        //     } else if (type === "month") {
        //         return `${val}月`;
        //     }
        //     return val;
        // };

        // vant4版本
        const formatter = (type, option) => {
            if (type === 'year') {
                option.text += '年';
            }
            if (type === 'month') {
                option.text += '月';
            }
            return option;
        };


        return {
            ...toRefs(state),
            toggle,
            choseMonth,
            formatter,
            columnsType,
            currentDate,
        };
    },
};
</script>  -->




