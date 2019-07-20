<template>
  <div class="page">
    <main>
      <Location :markers="markers" :updateDistance="updateDistance"></Location>
    </main>
    <footer @click="clockIn">打卡</footer>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Location from "@/components/getLocation";
import getDistance from "@/utils/distance";
export default {
  props: {},
  components: {
    Location
  },
  data() {
    return {
      distance: 0
    };
  },
  computed: {
    ...mapState({
      info: state => state.list.item  //获取数据
    }),
    distance() {  
      return getDistance(this.info.latitude, this.info.longitude);
    },
    markers() {
      if (this.info && Object.keys(this.info)) {
        return [
          {
            iconPath: "/static/images/job.png",
            latitude: this.info.latitude,
            longitude: this.info.longitude,
            title: this.info.company,
            width: 30,
            height: 30
          }
        ];
      } else {
        return [];
      }
    }
  },
  methods: {
    ...mapActions({
      clock: "list/clock"
    }),
    updateDistance(distance) {
      this.distance = distance;
    },
    //点击打卡
    async clockIn() {
      let distance = this.distance;
      if (this.distance < 100) {
        let result = await this.clock({
          id: this.info.id,
          params: {
            status: 0,
            sign_time: +new Date()
          }
        });
        wx.showToast({
          title: "打卡成功", //提示的内容,
          icon: "none" //图标,
        });
      } else {
        if (this.distance > 1000) {
          distance = (this.distance / 1000).toFixed(2) + "公里";
        } else {
          distance = this.distance + "米";
        }
        wx.showToast({
          title: `你距目的地还有${distance},暂时还不能打卡`, //提示的内容
          icon: "none"
        });
      }
    }
  },
  created() {

  },
  mounted() {
    
  },
  onShow() {
    wx.setNavigationBarTitle({
      title: `打卡：${this.info.company}`
    });
  }
};
</script>
<style scoped lang="scss">
main {
  flex: 1;
  position: relative;
  overflow: hidden;
  p {
    position: absolute;
    height: 40px;
    width: 100%;
    left: 0;
    bottom: 30px;
    padding: 0 25px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
    i {
      width: 40px;
      height: 40px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
footer {
  height: 44px;
  background: #000;
  line-height: 44px;
  text-align: center;
  color: #fff;
}
</style>