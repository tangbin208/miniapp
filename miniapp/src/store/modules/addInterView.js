import {addView} from "../../servers"
// 原始数据
const state={
    address:'',
}

//派生数据
const getters={

}
//异步改变
const actions={
    async formSubmit({state},{e,time}){
         let data= await addView({
             company:e.mp.detail.value.text,
             phone:e.mp.detail.value.tel,
             form_id:e.mp.detail.formId,
             longitude:state.address.location.lng,
             latitude:state.address.location.lat,
             start_time:new Date(time).getTime(),
             address:JSON.stringify(state.address),
             description:e.mp.detail.value.textarea
         })
         return data
      }
}
//同步改变
const mutations={
    add(state,payload){
        state.address=payload;
        wx.navigateBack({url:"pages/addInterView/main"})
    }
}

export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}