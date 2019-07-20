<template>
<div>
  <main v-if="phone">
    <div class="top">
      <h5>
        <img src="../../../static/images/my.png" />
      </h5>
      <p>{{phone}}</p>
    </div>
    <ul>
      <li @click="add()">
        <icon type="waiting" size="18" />
        <span>我的面试</span>
        <img src="../../../static/images/arrow.svg" alt />
      </li>
      <li>
        <icon type="info" size="18" />
        <span>客服中心</span>
        <img src="../../../static/images/arrow.svg" alt />
      </li>
    </ul>
  </main>
    <button  v-if="!phoneNumber" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号</button>
    <button  v-if="showSetting" open-type="openSetting">设置</button>
</div>
  
</template>
<script>
import {encrypteData} from "../../servers"
export default {
  props: {},
  components: {},
  data() {
    return {
       hasPhone: false,
      showSetting: false,
      phoneNumber: "",
      phone:""
    };
  },
  computed: {
    
  },
  methods: {
    add() {
      wx.navigateTo({ url: "/pages/list/main" });
    },
    async getPhoneNumber(e) {
      if (e.target.errMsg != "getPhoneNumber:fail user deny") {
        //1.2.1获取授权成功
        let data = await encrypteData({
          encryptedData: e.target.encryptedData,
          iv: e.target.iv
        });
        this.phoneNumber = data.data.phoneNumber;
        this.phone=this.replaces(this.phoneNumber, 2, 6, "****")
      } else {
        //1.2.2用户授权失败,打开设置页面
        this.showSetting = true;
      }
    },
    replaces(str, start, end, replaceStr) {
        return str.substring(0, end - 3) + replaceStr + str.substring(end + 1);
      }

  },
  created() {
    let that = this;
    //1. 获取用户授权
    wx.getSetting({
      success(res) {
        if (res.authSetting["scope.userInfo"]) {
          // 1.1用户已经授权
          wx.getUserInfo({
            withCredentials: true,
            success: function(res) {
              //1.1.1调用api获取用户信息
              that.hasPhone = true;
              console.log("userInfor...", res);
            }
          });
        } else {
          // 1.2用户没有授权
          that.hasPhone = false;
        }
      }
    });
  },
  mounted() {}
}
</script>
<style scoped lang="scss">
.top {
  width: 100%;
  height: 140px;
  display: flex;
  flex-direction: column;
  background: #f4f6f9;
  box-sizing: border-box;
  padding: 20px 0;
  align-items: center;
  justify-content: space-around;
  h5 {
    width: 60px;
    height: 60px;
    background: #fff;
    border-radius: 50%;
    text-align: center;
    img {
      width: 50px;
      height: 50px;
    }
  }
  p {
    padding-top: 10px;
  }
}
ul li {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  span {
    flex: 1;
    margin-left: 20px;
  }
  img {
    width: 20px;
    height: 20px;
  }
}
</style>