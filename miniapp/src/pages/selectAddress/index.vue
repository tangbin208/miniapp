<template>
  <div>
    <ul>
      <li>
        <label for="text">北京</label>
        <input @input="(e)=>getUrl(e)" :value="val" v-model="val" placeholder="面试地址" />
      </li>

      <li v-for="item in markers" :key="item.id" @click="add(item)">
        <img src="../../../static/images/location.svg" alt />
        <p>
          <span>{{item.title}}</span>
          <span class="last">{{item.address}}</span>
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  props: {},
  components: {},
  data() {
    return {
      val:''
    };
  },
  computed: {
    ...mapState({
      markers: state => state.search.markers,
    })
  },
  methods: {
    ...mapMutations({
      searchVal: "search/searchVal",
      add: "add/add"
    }),
    getUrl(e) {
      let timer=null;
      clearTimeout(timer);
       timer = setTimeout(() => {
        this.searchVal({
          e
        });
      }, 500);
    }
  },
  created() {},
  updated() {},
  mounted() {}
};
</script>
<style scoped lang="scss">
form {
  flex: 1;
  overflow: hidden;
}
ul {
  li {
    display: flex;
    min-height: 44px;
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
    font-size: 16px;
    align-items: center;
    label {
      width: 60px;
      text-align: center;
    }
    input {
      height: 100%;
      padding: 0 20px;
      flex: 1;
    }
    img {
      width: 30px;
      height: 30px;
      margin-left: 20px;
    }
    p {
      display: flex;
      flex: 1;
      flex-direction: column;
      padding-left: 10px;
      padding-right: 30px;
      font-size: 16px;
      .last {
        font-size: 12px;
        color: silver;
      }
    }
  }
}
</style>