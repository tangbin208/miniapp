<template>
  <main>
    <ul>
      <li>
        <label>面试地址 :</label>
        <span>{{address}}</span>
      </li>
      <li>
        <label>面试时间 :</label>
        <span>{{data.create_time}}</span>
      </li>
      <li>
        <label>联系方式 :</label>
        <span>{{data.phone}}</span>
      </li>
      <li>
        <label>是否提醒 :</label>
        <span>{{data.remind===0?"已提醒":"未提醒"}}</span>
      </li>
      <li>
        <label>面试状态 :</label>
        <span>{{status[data.status]}}</span>
      </li>
      <li v-if="data.status===-1">
        <label>取消提醒</label>
        <van-switch :checked="checked" @change="change(data.id,checked)" />
      </li>
    </ul>
    <p v-if="data.status===-1">
      <button class="goClock" @click="goClock(data.id)">去打卡</button>
      <button class="abandon" @click="giveUpDia(data.id)">放弃面试</button>
    </p>
    <van-dialog id="van-dialog" />
  </main>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Dialog from "@/../static/vant/dialog/dialog";
export default {
  props: {},
  components: {},
  data() {
    return {
      address: "",
      checked: false
    };
  },
  computed: {
    ...mapState({
      data: state => state.list.item,
      list: state => state.list.list,
      status: state => state.list.status
    })
  },
  methods: {
    //改变取消提醒
    ...mapActions({
      switchChange: "list/switchChange",
      giveUp: "list/giveUp"
    }),
    //去打卡
    goClock(id) {
      wx.navigateTo({ url: "/pages/clock/main" });
    },
    async change(id, checked) {
      let data = await this.switchChange({ id, checked: !checked });
      this.checked = !checked;
      if (data.code === 0) {
        if (this.checked) {
          wx.showToast({
            title: "您已取消消息提醒", //提示的内容,
            icon: "none" //图标,
          });
        } else {
          wx.showToast({
            title: "您已开启消息提醒", //提示的内容,
            icon: "none" //图标,
          });
        }
      }
    },
    //放弃面试弹框
    giveUpDia(id) {
      Dialog.confirm({
        title: "温馨提示",
        message: "确定要放弃本次面试"
      })
        .then(() => {
          this.giveUp(id);
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  created() {},
  mounted() {
    this.address = JSON.parse(this.data.address).address;
  },
  onShow() {
    this.checked = this.data.remind === 1 ? true : false;
    wx.setNavigationBarTitle({
      title: this.data.company
    });
  }
};
</script>
<style scoped lang="scss">
ul {
  padding-left: 20px;
  width: 100%;
  box-sizing: border-box;
  li {
    display: flex;
    height: 44px;
    border-bottom: 1px solid #eee;
    align-items: center;
    label {
      color: #666;
      font-size: 15px;
      width: 80px;
    }
    span {
      flex: 1;
      font-size: 15px;
      color: #333;
      padding-right: 15px;
      box-sizing: border-box;
    }
  }
}
p {
  margin: 25px 8px;
  display: flex;
  button {
    flex: 1;
    color: #fff;
    margin: 4px;
  }
  .goClock {
    background: #197dbf;
  }
  .abandon {
    background: #dc4e42;
  }
}
</style>