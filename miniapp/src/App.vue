
<script>
import { login } from "./servers/index";
export default {
  created() {
    wx.login({
      async success(res) {
         if (res.code) {
          let data = await login(res.code);
          wx.setStorage({
            key: "openid",
            data: data.data.openid
          });
        }else{
          console.log("登陆失败")
        }
      }
    });
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
html{
  width: 100%;
  height: 100%;
}
html>div.page{
  width: 100%;height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
