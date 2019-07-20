import QQMap from "../../utils/qqMap"
// 原始数据
const state={
   val:"",
   markers:[],
}

//派生数据
const getters={

}
//异步改变
const actions={
  
}
//同步改变
const mutations={
   searchVal(state,{e}) {
    let qqmapsdk = new QQMap({
        key: "X7RBZ-MMOKR-UQEWJ-WSCXC-IVXVK-IFFLL"
      });
    // 调用接口
    qqmapsdk.search({
      keyword: e.mp.detail.value, //搜索关键词
      // region:"北京",
      // location: `${latitude},${longitude}`, //设置周边搜索中心点
      success: function(res) {
        state.markers=res.data
      }
    });
 }
}

export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}