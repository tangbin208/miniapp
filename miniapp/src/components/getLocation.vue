<template>
  <div class="map">
    <map
      id="map"
      :longitude="longitude"
      :latitude="latitude"
      scale="14"
      subkey="X7RBZ-MMOKR-UQEWJ-WSCXC-IVXVK-IFFLL"
      show-location
      show-compass
      :circle="circle"
      :include-points="points"
      :markers="markers"
      @markertap="markertap"
      @regionchange="regionChange"
      style="width:100%;height:100%"
    ></map>
    <p @click="clickLocation">
      <img src="../../static/images/location.png" alt />
    </p>
  </div>
</template>
<script>
import { getLocation, getAuth } from "@/utils/index.js";
import getDistance from "@/utils/distance";
export default {
  props: {},
  components: {},
  data() {
    return {
      // 用户当前位置
      location: {
        latitude: 40.03298,
        longitude: 116.29891
      },
      distance: 0
    };
  },
  computed: {
    points() {
      return [this.location, ...this.markers];
    },
    circle() {
      if (!this.markers.length) {
        return [];
      } else {
        return [
          {
            ...this.markers[0],
            color: this.distance > 100 ? "#C9394A" : "#197DBF",
            fillColor: "rgba(0,0,0, .3)",
            radius: 100,
            strokeWidth: 2
          }
        ];
      }
    }
  },
  watch: {
    reLocation() {
      // 检测重新定位当前位置
      this.clickLocation();
    }
  },
  props: {
    markers: {
      type: Array,
      default: []
    },
    markertap: {
      type: Function,
      default: () => {}
    },
    reginonChange: {
      type: Function,
      default: () => {}
    },
    reLocation: {
      type: Boolean,
      default: false
    },
    updateDistance: {
      typef: Function,
      default: () => {}
    }
  },
  mounted() {
    this.clickLocation();
  },
  methods: {
    clickLocation() {
      getAuth("scope.userLocation", async () => {
        let location = await getLocation();
        this.location = location;

        console.log("scope.userLocation...", this.location, this.markers[0]);
        // 重新计算距离
        if (this.updateDistance) {
          this.distance = getDistance(
            this.location.latitude,
            this.location.longitude,
            this.markers[0].latitude,
            this.markers[0].longitude
          );
          this.updateDistance(this.distance);
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.map {
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
    left: 30px;
    bottom: 30px;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>