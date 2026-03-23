import request from './request'
import mockRequest from './mockAjax'

export const getCategoryList = () => {
    // 由于是本地文件，直接返回Promise包装的数据
    return Promise.resolve({
        code: 200,
        message: '成功',
        data: require('../local/category.json').data
    })
}
export const reqGetBannerList = () => mockRequest.get("/banner");
export const reqGetFloorList = () => mockRequest.get("/floor");
export const reqGetSearchList = () => mockRequest.get("/search");
export const reqGetDetailList = () => mockRequest.get("/detail");
export const reqPostAddCart = () => mockRequest.get("/addCart");
export const reqGetShopCartList = () => mockRequest.get("/shopcart");
export const reqDeleteCart = () => mockRequest.get("/deleteCart");
export const reqCartState = () => mockRequest.get("/cartState");
export const reqGetCode = () => mockRequest.get("/code");
export const reqRegister = () => mockRequest.post("/register");
export const reqLogin = () => mockRequest.post("/login");
export const reqGetUserInfo = () => mockRequest.post("/userInfo");
export const reqGetAddressList = () => mockRequest.post("/address");
export const reqGetOrderList = () => mockRequest.post("/order");
export const reqSubmitOrder = () => mockRequest.post("/submitOrder");
export const reqPayInfo = () => mockRequest.post("/payInfo");
export const reqPayStatus = () => mockRequest.post("/payState")
export const reqMyOrderList = () => mockRequest.post("/myOrder")


// export const getCategoryList = () => {
// return request({
//     url: '/product/getCategoryList',
//     method: 'get',
// })
// }