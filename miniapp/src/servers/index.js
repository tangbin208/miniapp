import request from "../utils/request";

//用户登录接口
export function login(code){
    return request.post('/user/code2session',{
        code
    })
}

//获取面试列表
export function getListData(payload){
    console.log("payload",payload)
    if(payload.status===null){
        delete payload.status
    }
    return request.get("/sign",payload)
}

//添加面试
export function addView(payload){
    return request.post("/sign",payload)
}
//解密数据
export function encrypteData(data){
    console.log("server",data)
    return request.post("/user/decrypt",data)
}

//更改数据
export function updateData(payload){
    return request.put(`/sign/${payload.id}`,{
        remind:payload.remind,
        status:payload.status,
        sign_time:payload.sign_time
    })
}
//获取详情数据 
export function getDetailData(id){
    return request.get(`/sign/${id}`)
}