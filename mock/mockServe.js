import Mock from "mockjs";
import banner from './banner.json'
import floor from './floor.json'
import search from "./search.json";
import detail from "./detail.json";
import shopcart from "./shopcart.json";
import address from "./address.json";
import order from "./order.json";

Mock.mock("/mock/banner", { code: 200, data: banner });
Mock.mock('/mock/floor', { code: 200, data: floor });
Mock.mock('/mock/search', { code: 200, data: search });
Mock.mock('/mock/detail', { code: 200, data: detail });
Mock.mock('/mock/addCart', { code: 200, data: null });
Mock.mock('/mock/shopcart', { code: 200, data: shopcart });
Mock.mock('/mock/deleteCart', { code: 200, data: null });
Mock.mock('/mock/cartState', { code: 200, data: null });
Mock.mock('/mock/code', { code: 200, data: 1234 });
Mock.mock('/mock/register', { code: 200, data: null });
Mock.mock('/mock/login', { code: 200, data: { token: '123456789' } });
Mock.mock('/mock/userInfo', { code: 200, data: { name: '张三', avatar: 'https://img2.baidu.com/it/u=3422224222,2822222222&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500' }, token: '123456789' });
Mock.mock('/mock/address', { code: 200, data: address });
Mock.mock('/mock/order', { code: 200, data: order });
Mock.mock('/mock/submitOrder', { code: 200, data: { orderNo: '1234' } });
Mock.mock('/mock/payInfo', { code: 200, data: { codeUrl: 'weixin://wxpay/bizpayurl?prmFsw2mzz', totalFee: 100 } });
Mock.mock('/mock/payState', { code: 200, data: { payStatus: 1 } });
Mock.mock('/mock/myOrder', { code: 200, data: order });
