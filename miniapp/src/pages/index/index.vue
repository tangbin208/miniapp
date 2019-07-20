<template>
  <div class="page">
    <main>
      <Location />
      <!-- <i @click="clickLocation">
          <img src="../../../static/images/location.png" alt />
      </i>-->
      <p class="bg" @click="add()">
        <img src="../../../static/images/my.png" alt />
      </p>
    </main>
    <footer @click="addInterView">添加面试</footer>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import Location from "@/components/getLocation";
import { getLocation, getAuth } from "@/utils/index.js";
export default {
  props: {},
  components: {
    Location
  },
  data() {
    return {
      reLocation: false,
      markers: []
    };
  },
  computed: {},
  methods: {
    //跳到添加试题页面
    addInterView() {
      wx.navigateTo({ url: "/pages/addInterView/main" });
    },
    //跳到个人中心
    add() {
      wx.navigateTo({ url: "/pages/order/main" });
    },
    ...mapActions({
      getLocation: "index/getLocation"
    }),
    clickLocation() {
      this.getLocation();
      console.log("重新定位");
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped  lang="scss">
main {
  flex: 1;
  display: flex;
  position: relative;
  div.map {
    width: 100%;
    height: 100%;
  }
  p {
    width: 40px;
    height: 40px;
    display: inline-block;
    padding: 3px;
    box-sizing: border-box;
    position: absolute;
    right: 30px;
    bottom: 30px;
    background: #000;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

footer {
  width: 100%;
  height: 44px;
  background: #000;
  line-height: 44px;
  text-align: center;
  color: #fff;
}
</style>