import './style.css'

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Tabbar, TabbarItem, Form, Field, Toast, Icon, NavBar, Button, Popup, CellGroup, Cell, PullRefresh, List, DatetimePicker, NumberKeyboard, Dialog,  Rate } from "vant";
import "lib-flexible/flexible";
import "vant/lib/index.css";
import dayjs from 'dayjs';


const app = createApp(App);

app.use(router)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Form)
app.use(Field)
app.use(Toast)
app.use(Button)
app.use(Icon)
app.use(NavBar)
app.use(Popup)
app.use(CellGroup)
app.use(Cell)
app.use(PullRefresh)
app.use(List)
// app.use( DatePicker )
app.use(DatetimePicker)
app.use(NumberKeyboard)
app.use(Dialog)
app.use(Rate)



app.mount("#app");



app.config.globalProperties.$filters = {
    transTime(date) {
        return dayjs(Number(date)).format("HH:mm");
    },
    transDay(value){
        return dayjs(value).format("MM-DD");
    }
};



// import { Dialog } from "vant"
// Vue.use(Dialog)