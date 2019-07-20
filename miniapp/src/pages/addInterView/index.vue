<template>
  <div>
    <main>
      <form report-submit="true" @submit="submit" @reset="formReset">
        <p>面试信息</p>
        <ul>
          <li>
            <label for="text">公司名称</label>
            <input id="text" name="text" type="text" placeholder="请输入公司名称" />
          </li>
          <li>
            <label for="tel">公司电话</label>
            <input id="tel" name="tel" type="text" placeholder="请输入面试联系人电话" />
          </li>
          <li>
            <label for="time">面试时间</label>
            <picker
              mode="multiSelector"
              class="time"
              :value="multiIndex"
              :range="newMultiArray"
              @change="bindMultiPickerChange"
              @columnchange="columnchange"
            >
              <span>{{time}}</span>
            </picker>
            <icon class="icon" @click="alert" type="info" size="22" />
            <van-toast id="van-toast" />
          </li>
          <li>
            <label for="url">面试地址</label>
            <input
              @click="add"
              :value="address.address"
              disabled
              name="url"
              placeholder="请输入公司名称"
            />
          </li>
        </ul>
        <p>备注信息</p>
        <textarea name="textarea" placeholder="备注信息(可选,100字以内)"></textarea>
        <button form-type="submit">确认</button>
      </form>
    </main>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Toast from "@/../static/vant/toast/toast";
export default {
  props: {},
  components: {

  },
  data() {
    return {
      time: "1",
      multiArray: [],
      multiIndex: [0, 0, 0, 0],
      year: "",
      month: "",
      day: "",
      hour: ""
    };
  },
  computed: {
    ...mapState({
      address: state => state.add.address
    }),
    newMultiArray() {
      let array = [];
      const date = new Date();
      const months = [];
      const days = [];
      const hours = [];
      const minutes = [];
      let minhour =
        this.multiIndex[0] === 0 && this.multiIndex[1] === 0 ? this.hour : 0;
      let minDay = this.multiIndex[0] === 0 ? this.day : 1;
      if (minhour === 23) {
        minhour = 0;
        minDay = this.day + 1;
      }
      for (let i = date.getMonth() + 1; i <= 12; i++) {
        if (i < 10) {
          i = "0" + i;
        }
        months.push("" + i + "月");
      }
      array.push(months);
      for (let i = minDay; i <= 31; i++) {
        if (i < 10) {
          i = i;
        }
        days.push("" + i + "号");
      }
      array.push(days);
      for (let i = minhour; i < 24; i++) {
        if (i < 10) {
          i = "0" + i;
        }
        hours.push("" + i + "点");
      }
      array.push(hours);
      for (let i = 0; i < 6; i++) {
        minutes.push(`${i * 10 || "00"}分`);
      }
      array.push(minutes);
      return array;
    }
  },
  methods: {
    //去选择地址页面
    add() {
      wx.navigateTo({ url: "/pages/selectAddress/main" });
    },
    alert() {
      Toast("在面试前一小时提醒你");
    },
    ...mapActions({
      formSubmit: "add/formSubmit"
    }),
    async submit(e) {
      if (!e.mp.detail.value.text) {
        Toast("请输入公司名称");
        return;
      }
      // 判断手机号是否符合规范
      if (
        !/^1(3|4|5|7|8)\d{9}$/.test(e.mp.detail.value.tel) ||
        !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(e.mp.detail.value.tel)
      ) {
        Toast("请输入面试人手机或者座机");
        return;
      }
      // 判断公司地址
      if (!this.address) {
        Toast("请输入公司地址");
        return;
      }
      let data = await this.formSubmit({ e, time: this.time });
      if (data.code === 0) {
        Toast.success(data.msg);
         wx.navigateTo({ url: "/pages/list/main" });
      } else {
        Toast.fail("添加失败");
      }
    },
    columnchange(e) {
      const { column, value } = e.mp.detail;
      const oldLength = this.newMultiArray[2].length;
      this.$set(this.multiIndex, column, value);
      const newLength = this.newMultiArray[2].length;
      if (newLength !== oldLength) {
        this.$set(
          this.multiIndex,
          2,
          newLength - oldLength + this.multiIndex[2]
        );
      }
    },
    //获取时间日期
    bindMultiPickerChange(e) {
      if (e) {
        this.multiIndex = e.target.value;
      }
      console.log("当前选择的时间", this.multiIndex);
      const index = this.multiIndex;
      const year = this.year;
      const month = this.newMultiArray[0][index[0]];
      const day = this.newMultiArray[1][index[1]];
      const hour = this.newMultiArray[2][index[2]];
      const minute = this.newMultiArray[3][index[3]];
      this.time =
        year +
        "-" +
        month.slice(0, -1).padStart(2, 0) +
        "-" +
        day.slice(0, -1).padStart(2, 0) +
        " " +
        hour.slice(0, -1) +
        ":" +
        minute.slice(0, -1);
    }
  },
  created() {},
  mounted() {
    const today = new Date();
    this.year = today.getFullYear();
    this.month = today.getMonth() + 1;
    this.day = today.getDate();
    this.hour = today.getHours() + 1;
    this.bindMultiPickerChange();
  }
};
</script>
<style scoped lang="scss">
main {
  flex: 1;
  overflow: hidden;
  form p {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    background: #eee;
    font-size: 17px;
  }
  ul {
    padding-left: 20px;
    li {
      display: flex;
      height: 44px;
      align-items: center;
      border-bottom: 1px solid #eee;
      font-size: 15px;
      input {
        height: 100%;
        padding: 0 20px;
        flex: 1;
      }
      h6 {
        padding: 0 20px;
      }
    }
  }
}
textarea {
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  width: 85%;
  height: 100px;
  padding: 10px;
  resize: none;
  margin: 10px auto;
  font-size: 15px;
}
button {
  background: #ccc;
  color: #fff;
}
.time {
  padding-left: 20px;
  width: 65%;
}
</style>