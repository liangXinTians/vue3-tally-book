import axios from "axios";
import { Toast } from "vant";
import { useRouter } from "vue-router";

axios.defaults.baseURL =
    process.env.NODE_ENV == "development"
        ? "//47.99.134.126:7009"
        : "//localhost:7001"; // 根据环境变量切换本地和线上的请求地址
axios.defaults.withCredentials = true; // 允许跨域
axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers["token"] = localStorage.getItem("token") || ""; 
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.response.use((res) => {
    const router = useRouter(); 
    if (typeof res.data !== "object") {
        Toast.fail("服务端异常！");
        return Promise.reject(res);
    }
    if (res.data.code != 200) {
        if (res.data.msg) Toast.fail(res.data.msg);
        if (res.data.code == 401) {
            router.push({ path: "/login" });
        }
        return Promise.reject(res.data);
    }
    return res.data;
});
export default axios;


