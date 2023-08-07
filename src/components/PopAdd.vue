<template>
    <van-popup v-model:show="show" position="bottom" round>
        <div class="add-wrap">
            <header class="header">
                <span class="close" @click="show = false">
                    <van-icon name="cross" />
                </span>
                <van-button class="add-btn" type="primary" size="small">
                <!-- <van-button class="add-btn" type="primary" size="small" @click="addBill"> -->
                    确定
                </van-button>
            </header>
            <div class="filter">
                <div class="type">
                    <span @click="changeType('expense')" :class="{ expense: true, active: payType == 'expense' }">
                        支出
                    </span>
                    <span @click="changeType('income')" :class="{ income: true, active: payType == 'income' }">
                        收入
                    </span>
                </div>
                <div @click="showDay = true" class="time">
                    {{ $filters.transDay(date) }}
                    <i class="iconfont icon-xiala" />
                </div>
            </div>
            <van-popup v-model:show="showDay" position="bottom" round :style="{ height: '46%' }">
                <van-datetime-picker v-model="date" type="date" title="选择时间" @confirm="choseDay"
                    @cancel="showDay = false" />
            </van-popup>

            <div class="money">
                <span class="sufix">¥</span>
                <span class="amount animation">{{ amount }}</span>
            </div>

            <div class="type-warp">
                <div class="type-body" v-if="payType == 'expense'">
                    <div class="type-item" v-for="item in expense" :key="item.id" @click="choseType(item)">
                        <span :class="{ 'iconfont-wrap': true, 'expense': true, active: currentType.id == item.id }">
                            <i class="iconfont" :class="typeMap[item.id].icon" />
                        </span>
                        <span>{{ item.name }}</span>
                    </div>
                </div>
                <div class="type-body" v-else>
                    <div class="type-item" v-for="item in income" :key="item.id" @click="choseType(item)">
                        <span :class="{ 'iconfont-wrap': true, 'income': true, active: currentType.id == item.id }">
                            <i class="iconfont" :class="typeMap[item.id].icon" />
                        </span>
                        <span>{{ item.name }}</span>
                    </div>
                </div>
            </div>


            <!-- <div class="remark" v-if="remark">
                {{ remark }}
            </div>
            <div class="remark" v-else @click="remarkVisible = true">添加备注</div>

            <van-dialog v-model:show="remarkVisible" title="备注" show-cancel-button>
                <van-field v-model="remark" rows="2" autosize type="textarea" maxlength="10" placeholder="请输入备注"
                    show-word-limit />
            </van-dialog> -->



            <van-number-keyboard :show="true" extra-key="." @delete="remove" @input="inputChange" />
        </div>
    </van-popup>


</template>
<script>
import { reactive, toRefs, onMounted, ref } from "vue";
import { typeMap } from '../utils/index.js'
import axios from '../utils/axios.js'
import dayjs from 'dayjs'
import { Toast } from 'vant'
// import { Dialog } from 'vant'
export default {
    props: {
      refresh: Function
    },

    setup() {
        // reactive参数一般接受对象或数组，是深层次的响应式。ref参数一般接收简单数据类型，若ref接收对象为参数，本质上会转变为reactive方法
        // 在JS中访问ref的值需要手动添加.value，访问reactive不需要
        // 响应式的底层原理都是Proxy
        const remarkVisible = ref(false)

        const state = reactive({
            show: false, // 弹窗显示隐藏变量
            showDay: false, // 日期选择
            payType: 'expense', // 默认是支出类型
            date: new Date(), // 当前选择的日期
            amount: '', // 金额

            expense: [], // 支出类型数组
            income: [], // 收入类型数组
            typeMap: typeMap, // 类型 key-value 键值对
            currentType: {}, // 当前选择的类型对象

            remark: '',//备注信息
        });

        // 初始化，请求消费类型列表
        onMounted(async () => {
            const { data: { list } } = await axios.get('/api/type/list')
            state.expense = list.filter(i => i.type == 1)
            state.income = list.filter(i => i.type == 2)
            state.currentType = state.expense[0]
        })


        // 选择花销类型
        const choseType = (item) => {
            state.currentType = item
        }

        // 显示隐藏弹窗
        const toggle = () => {
            state.show = !state.show;
        };

        // 切换收入支出
        const changeType = (type) => {
            state.payType = type
            state.currentType = state[type][0] 
        }

        // 选择日期
        const choseDay = (value) => {
            state.date = value
            state.showDay = false
        }

        // 删除输入框内容
        const remove = () => {
            // 通过 slice 过滤处字符串 0 到 字符串长度 - 1 的值，也就是除去了最后一个值
            state.amount = state.amount.slice(0, state.amount.length - 1)
        }

        // 监听输入框改变值
        const inputChange = (value) => {
            // 当输入的值为 '.' 且 已经存在 '.'，则不让其继续字符串相加。
            if (value == '.' && state.amount.includes('.')) return
            // 小数点后保留两位，当超过两位时，不让其字符串继续相加。
            if (value != '.' && state.amount.includes('.') && state.amount && state.amount.split('.')[1].length >= 2) return
            state.amount += value
        }

        const addBill = async () => {
        if (!state.amount) {
          Toast.fail('请输入具体金额')
          return
        }
        const params = {
          amount: Number(state.amount).toFixed(2), // 金额
          type_id: state.currentType.id, // 当前消费类型 id
          type_name: state.currentType.name, // 当前消费类型 name
          date: dayjs(state.date).unix() * 1000, // 日期
          pay_type: state.payType == 'expense' ? 1 : 2, // 支出或收入
          remark: state.remark || ''
        }
        const result = await axios.post('api/bill/add', params)
        // 调完接口之后清空数据
        state.amount = ''
        state.payType = 'expense'
        state.currentType = state.expense[0]
        state.show = false
        state.date = new Date()
        state.remark = ''
        Toast.success('添加成功')
        // 并且刷新 Home 的列表数据，这里需要外部父组件传入
        // <PopAdd ref="popAddRef" @refresh="onRefresh" />
        ctx.emit('refresh')
      }


        return {
            ...toRefs(state),
            toggle,
            changeType,
            choseDay,
            remove,
            inputChange,
            choseType,
            remarkVisible,
            addBill
        };
    },
};
</script>

<style lang="scss" scoped>
.add-wrap {
    padding-top: 12px;

    .header {
        display: flex;
        justify-content: space-between;
        padding: 0 24px;

        .van-icon-cross {
            font-size: 20px;
            color: $color-text-secondary;
        }

        .close {
            display: flex;
            align-items: center;
        }

        .add-btn {
            padding: 0 12px;
            background-color: $primary;
            border-color: $primary;
        }
    }

    .filter {
        padding: 12px 24px;
        display: flex;
        justify-content: space-between;

        align-items: center;

        .type {
            span {
                display: inline-block;
                background: #f5f5f5;
                color: $color-text-caption;
                padding: 4px 12px;
                font-size: 12px;
                border-radius: 24px;
                border: 1px solid #f5f5f5;
            }

            .expense {
                margin-right: 6px;

                &.active {
                    background-color: #eafbf6;
                    border-color: $primary;
                    color: $primary;
                }
            }

            .income {
                &.active {
                    background-color: #fbf8f0;
                    border-color: $text-warning;
                    color: $text-warning;
                }
            }
        }

        .time {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 4px 12px;
            background-color: #f0f0f0;
            border-radius: 20px;
            color: $color-text-base;

            .sort-down {
                font-size: 12px;
                margin-left: 5px;
            }
        }
    }

    .money {
        padding-bottom: 12px;
        border-bottom: 1px solid #e9e9e9;
        margin: 0 24px;
        text-align: left;

        .sufix {
            font-size: 36px;
            font-weight: bold;
            vertical-align: top;
        }

        .amount {
            font-size: 40px;
            padding-left: 10px;
        }
    }

    // 模拟输入时后面那一道竖线的光标闪烁
    .animation::after {
        content: '';
        display: inline-block;
        margin-left: 5px;
        width: 2px;
        height: 28px;
        animation: blink 1s infinite steps(1, start);
    }

    @keyframes blink {
        0% {
            background-color: white;
        }

        50% {
            background-color: $color-text-secondary;
        }

        100% {
            background-color: white;
        }
    }

    .van-number-keyboard {
        position: unset;
    }

    .type-warp {
        display: flex;
        overflow-x: auto;
        margin: 0 24px;
        margin-bottom: 20px;
        // height: 40px;

        * {
            touch-action: pan-x;
        }

        .type-body {
            display: flex;
            white-space: nowrap;
            // height: 40px;

            .type-item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 16px 12px 10px 12px;

                .iconfont-wrap {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #f5f5f5;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    margin-bottom: 5px;

                    .iconfont {
                        color: $color-text-caption;
                        font-size: 20px;
                    }
                }

                .expense {
                    &.active {
                        background-color: $primary;

                        .iconfont {
                            color: #fff;
                        }
                    }
                }

                .income {
                    &.active {
                        background-color: $text-warning;

                        .iconfont {
                            color: #fff;
                        }
                    }
                }
            }
        }
    }
}

.remark {
    padding: 0 24px;
    padding-bottom: 12px;
    color: #4b67e2;
}
</style>