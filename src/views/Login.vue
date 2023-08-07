<template>
  <HeaderHeader :title="type == 'login' ? '登录' : '注册'"></HeaderHeader>
  <div class="auth">
    <img class="logo" src="//s.yezgea02.com/1606836859539/onpeice.png" alt="" />
    <van-form class="form-wrap" v-if="type == 'login'">
      <div class="form">
        <van-field clearable v-model="username" name="username" label="账号" placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写账户' }]" />
        <van-field clearable v-model="password" type="password" name="password" label="密码" placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
        <van-field center clearable label="验证码" placeholder="输入验证码" v-model="verify">
          <template #button>
            <VueImgVerify ref="verifyRef" />
          </template>
        </van-field>
      </div>
      <div style="margin: 16px 0;">
        <van-button round block type="primary" @click="onSubmit">
          登录
        </van-button>
        <!--3-->
        <p @click="chanegType('register')" class="change-btn">
          没有账号，前往注册
        </p>
      </div>
    </van-form>
    <van-form class="form-wrap" v-if="type == 'register'">
      <div class="form">
        <van-field clearable v-model="username" name="username" label="账号" placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写账号' }]" />
        <van-field clearable v-model="password" type="password" name="password" label="密码" placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
        <van-field center clearable label="验证码" placeholder="输入验证码" v-model="verify">
          <template #button>
            <VueImgVerify ref="verifyRef" />
          </template>
        </van-field>
      </div>
      <div style="margin: 16px 0;">
        <van-button round block type="primary" :loading="loading" @click="onSubmit">
          注册
        </van-button>
        <!--5-->
        <p @click="chanegType('login')" class="change-btn">登录已有账号</p>
      </div>
    </van-form>
  </div>



</template>
<script>
import { reactive, toRefs, ref } from "vue";
import axios from "../utils/axios.js";
import { Toast } from "vant";
import HeaderHeader from '../components/Header.vue';
import VueImgVerify from '../components/VueImageVerify.vue'
import { useRouter } from "vue-router";
export default {
  name: "Login",
  components: {
    HeaderHeader, VueImgVerify
  },
  setup() {
    const verifyRef = ref(null)
    const state = reactive({
      username: "",
      password: "",
      type: "login", // 登录注册模式切换参数
      loading: false, // 点击注册是，让按钮处于加载状态
      verify: '', // 验证码输入框输入的内容
      imgCode: '', // 生成的验证图片内的文字
    });

    const router = useRouter();

    // 提交登录 or 注册表单
    // const onSubmit = async (values) => {
    //   state.imgCode = verifyRef.value.imgCode || ''
    //   if (state.type == 'login') {
    //     const { data } = axios.post('/user/login', {
    //       username: state.username,
    //       password: state.password
    //     })
    //   } else {
    //     if (state.imgCode != state.verify) {
    //       Toast.fail('验证码错误')
    //       return
    //     }
    //     const { data } = axios.post('/user/register', {
    //       username: state.username,
    //       password: state.password
    //     })
    //   }
    //   try {
    //     if (state.type == "login") {
    //       const { data } = await axios.post("/user/login", {
    //         username: state.username,
    //         password: state.password,
    //       });
    //       localStorage.setItem("token", data.token);
    //       window.location.href = "/";
    //     } else {
    //       state.imgCode = verifyRef.value.imgCode || "";
    //       if (
    //         verifyRef.value.imgCode.toLowerCase() !=
    //         state.verify.toLowerCase()
    //       ) {
    //         console.log("verifyRef.value.imgCode", verifyRef.value.imgCode);
    //         Toast.fail("验证码错误");
    //         return;
    //       }
    //       state.loading = true;
    //       const { data } = await axios.post("/user/register", {
    //         username: state.username,
    //         password: state.password,
    //       });
    //       Toast.success("注册成功");
    //       state.type = "login";
    //       state.loading = false;
    //     }
    //   } catch (error) {
    //     state.loading = false;
    //   }
    // }


    // 6
    // 提交登录 or 注册表单
    const onSubmit = async (values) => {
      try {
        state.imgCode = verifyRef.value.imgCode || '';
        if (state.type == "login") {
          const { data } = await axios.post("/api/user/login", {
            username: state.username,
            password: state.password,
          });
          localStorage.setItem("token", data.token);
          window.location.href = "";
          if (
            // verifyRef.value.imgCode.toLowerCase() !=
            // state.verify.toLowerCase()
            // state.imgCode != state.verify
            verifyRef.value.imgCode === state.verify
          ) {
            router.push({ path: "/home" });
          }
          else {
            Toast.fail("验证码错误");
          }
          // state.loading = true;
        } else {
          // if (
          //   // verifyRef.value.imgCode.toLowerCase() !=
          //   // state.verify.toLowerCase()
          //   // state.imgCode != state.verify
          //   verifyRef.value.imgCode === state.verify
          // ){
          //   router.push({ path: "/home" });
          // }
          // else{
          //   Toast.fail("验证码错误");
          // }
          // state.loading = true;
          if (state.imgCode != state.verify) {
            Toast.fail('验证码错误')
            return
          }
          const { data } = await axios.post("/api/user/register", {
            username: state.username,
            password: state.password,
          });
          Toast.success("注册成功");
          state.type = "login";
          state.loading = false;
        }
      } catch (error) {
        state.loading = false;
      }
    };

    // 切换登录和注册两种模式
    const chanegType = (type) => {
      state.type = type;
    };
    return {
      ...toRefs(state),
      onSubmit,
      chanegType,
      verifyRef
    };
  },
};
</script>


<style lang='less' scoped>
// @import url('../config/custom.less');
.auth {
  height: calc(~"(100% - 46px)");
  width: 100%;
  padding: 30px 20px 0 20px;
  background: #f5f5f5;

  .logo {
    width: 150px;
    display: block;
    margin: 0 auto;
    margin-bottom: 30px;
  }

  .form-wrap {
    .form {
      border-radius: 10px;
      overflow: hidden;

      .van-cell:first-child {
        padding-top: 20px;
      }

      .van-cell:last-child {
        padding-bottom: 20px;
      }
    }
  }

  .change-btn {
    text-align: center;
    margin: 10px 0;
    // color: @link-color;
    color: rgb(24, 138, 250);
    font-size: 14px;
  }
}
</style>