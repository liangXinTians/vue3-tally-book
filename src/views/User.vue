<template>
  <div class="user">
    <div class="head">
      <img class="avatar" src="//s.yezgea02.com/1606836859539/onpeice.png" />
      <div class="info">
        <!-- <span class="name">{{ user.username || '' }}</span>
        <span class="slogen">个性签名：{{ user.signature || '' }}</span> -->
        <span class="name">admin</span>
        <span class="slogen">个性签名：1234332</span>
      </div>
    </div>

     <div class="content">
      <van-cell icon="edit" @click="visibleSig = true" title="修改个性签名" is-link />
      <van-cell icon="setting-o" to="/account" title="账户安全" is-link />
      <van-cell icon="good-job-o" @click="visibleRate = true" title="软件评分" is-link />
      <van-cell icon="smile-o" title="关于我们" is-link />
    </div>
    <!-- <van-dialog v-model:show="visibleSig" @confirm="confirmSig" title="个性签名" show-cancel-button>
      <van-field v-model="signature" rows="2" autosize type="textarea" maxlength="20" placeholder="请输入个性签名"
        show-word-limit />
    </van-dialog>  
     <van-dialog class="rate" v-model:show="visibleRate" title="软件评分" show-cancel-button>
      <van-rate class="rate" v-model="rate" allow-half void-icon="star" void-color="#eee" />
      1234
    </van-dialog>  -->
  </div>
</template>

<script>
import { Dialog } from "vant";
import { onMounted, reactive, toRefs } from "vue";
import axios from "../utils/axios";
export default {
  name: "User",
  setup() {
    const state = reactive({
      user: {}, // 用户信息
      signature: "",
      visibleSig: false,
      visibleRate: false,
      rate: 4.5
    });

  //   onMounted(async () => {
  //     getUserInfo();
  //   });

  //   // 获取用户信息
  //   const getUserInfo = async () => {
  //     const { data } = await axios.get("/api/user/get_userinfo");
  //     state.user = data;
  //     state.signature = data.signature
  //   };
  //   个性签名弹窗确认
  //   const confirmSig = async () => {
  //     const { data } = await axios.post('/api/user/edit_signature', {
  //       signature: state.signature
  //     })
  //     state.user = data
  //     state.signature = data.signature
  //   }

    return {
      ...toRefs(state),
      // confirmSig
    };
  },
};
</script>

<style lang='scss' scoped>
.user {
  min-height: 100%;
  background-color: #f5f5f5;
  padding: 12px;

  .head {
    display: flex;
    background: linear-gradient(315deg, #7fcea4 0%, #39be77 100%);
    padding: 12px;
    border-radius: 4px;
    margin-bottom: 12px;

    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 3px solid #fff;
      margin-right: 10px;
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .name {
        font-size: 18px;
        color: #fff;
        font-weight: 500;
      }

      .slogen {
        color: #fff;
        background: rgba(0, 0, 0, 0.1);
        padding: 1px 5px;
        border-radius: 10px;
      }
    }
  }
}

.rate {
  .van-dialog__content {
    text-align: center;
    padding: 20px 0;
  }
}
</style>