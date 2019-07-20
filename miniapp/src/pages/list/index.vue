<template>
  <div>
    <div class="title">
      <span
        v-for="(item,index) in list"
        :key="index"
        :class="ind===index?'active':''"
        @click="tabs({index,status:item.status})"
      >{{item.title}}</span>
    </div>
    
    <div class="list">
      <div v-if="!data.length" class="tips">
      <h5>当前分类还没有面试!</h5>
      </div>
      <template v-if="data.length" >
         <div class="connext" v-for="item in data" :key="item.id" @click="getDetail(item.id)">
        <dl>
          <dt>{{item.company}}</dt>
          <dd>北京上地街道</dd>
          <dd>
            面试时间:
            <span>{{item.create_time}}</span>
          </dd>
        </dl>
        <p>
          <span :class="item.status===-1?'first':'status'">{{status[item.status]}}</span>
          <span :class="item.status===-1?'last':'status'">未提醒</span>
        </p>
      </div>
      </template>
     
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  props: {},
  components: {},
  data() {
    return {
     
    };
  },
  computed: {
    ...mapState({
      list: state => state.list.list,
      ind: state => state.list.ind,
      data: state => state.list.data,//总数据
      status:state=>state.list.status,
    }),
  },
  methods: {
    //获取数据
    ...mapActions({
      load:"list/load",
      down:'list/down',
      getData:'list/getData',
      tabs:"list/tabs",
      getDetail:"list/getDetail"
    }),
  },
  created() {
  },
  onShow(){
    this.getData();
   
  },
  mounted() {
  },
  //上拉触底事件
  onReachBottom () {
    this.load()
  },
  //下拉刷新
  onPullDownRefresh () {
    this.down()
  },
};
</script>
<style scoped lang="scss">
.title {
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  background: #fff;
  span {
    flex: 1;
    height: 38px;
    text-align: center;
  }
}
.list{
  padding-top: 40px;
}
.active {
  border-bottom: 1px solid #f90;
  color: #f90;
}
.connext {
  padding: 5px 15px;
  border-top: 10px solid #eee;
  background: #fff;
  height: 100px;
  display: flex;
  justify-content: space-between;
  dl {
    width: 70%;
    line-height: 30px;
  }
  dd {
    font-size: 14px;
    span {
      font-size: 16px;
    }
  }
  p {
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    span {
      margin-bottom: 10px;
      padding: 3px 6px;
      &.first {
        background-color: hsla(220, 4%, 58%, 0.1);
        border-color: hsla(220, 4%, 58%, 0.2);
        color: #909399;
      }
      &.last {
        background-color: hsla(0, 87%, 69%, 0.1);
        border-color: hsla(0, 87%, 69%, 0.2);
        color: #f56c6c;
      }
      &.status {
        background-color: rgba(64, 158, 255, 0.1);
        color: #409eff;
      }
    }
  }
}
.tips {
  width: 100%;
  height: 60px;
  h5 {
    height: 60px;
    line-height: 50px;
    text-align: center;
  }
}
</style>