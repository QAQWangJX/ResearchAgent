import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import "@/assets/css/common.scss"
import { BrowserRouter, HashRouter } from "react-router-dom";
// 自动给html根元素设置font-size
// import 'amfe-flexible'
import './utils/amfe-flexible'
import useHttp from '@/hooks/useHttp'
import { getUserId } from "@/api/common.js"
// const token = localStorage.getItem('token')
// const userId = localStorage.getItem('userId')
// const tokenVal = new Date().getTime()
let newUserId = ''
// if (!token || !userId) {
//   localStorage.setItem('token', tokenVal)
//   // newUserId = await getUserId()
//   getUserId().then(res => {
//     localStorage.setItem('userId', res)
//   })
// } else {
//   if ((new Date().getTime() - tokenVal * 1) > 24 * 60 * 60 * 1000) {
//     localStorage.setItem('token', tokenVal)
//     // newUserId = await getUserId()
//     getUserId().then(res => {
//       localStorage.setItem('userId', res)
//     })
//   }
// }
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
