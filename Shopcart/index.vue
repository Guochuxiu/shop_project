<template>
    <div class="cart">
        <h4>全部商品</h4>
        <div class="cart-main">
            <div class="cart-th">
                <div class="cart-th1">全部</div>
                <div class="cart-th2">商品</div>
                <div class="cart-th3">单价（元）</div>
                <div class="cart-th4">数量</div>
                <div class="cart-th5">小计（元）</div>
                <div class="cart-th6">操作</div>
            </div>
            <div class="cart-body" v-for="cart in cartInfoList" :key="cart.id">
                <ul class="cart-list">
                    <li class="cart-list-con1">
                        <input type="checkbox" name="chk_list" v-model="cart.isChecked"
                            @change="handleCheck(cart, $event.target.checked)" />
                    </li>
                    <li class="cart-list-con2">
                        <img :src="cart.imgUrl" alt="pic" />
                        <div class="item-msg">{{ cart.skuName }}</div>
                    </li>
                    <li class="cart-list-con4">
                        <span class="price">{{ cart.skuPrice }}.00</span>
                    </li>
                    <li class="cart-list-con5">
                        <a href="javascript:void(0)" class="mins" @click="operateSkunum(cart, 'minus', -1)">-</a>
                        <input autocomplete="off" type="text" minnum="1" class="itxt" :value="cart.skuNum"
                            @change="operateSkunum(cart, 'change', $event.target.value * 1)" />
                        <a href="javascript:void(0)" class="plus" @click="operateSkunum(cart, 'plus', 1)">+</a>
                    </li>
                    <li class="cart-list-con6">
                        <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
                    </li>
                    <li class="cart-list-con7">
                        <a class="sindelet" @click="deleteCart(cart)">删除</a>
                        <br />
                        <a href="#none">移到收藏</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="cart-tool">
            <div class="select-all">
                <input class="chooseAll" type="checkbox" @change="handleCheckAll($event)" :checked="isAllChecked" />
                <span>全选</span>
            </div>
            <div class="option">
                <a @click="deleteChecked()">删除选中的商品</a>
                <a href="#none">移到我的关注</a>
                <a href="#none">清除下柜商品</a>
            </div>
            <div class="money-box">
                <div class="chosed">已选择 <span>{{ checkedNum }}</span>件商品</div>
                <div class="sumprice">
                    <em>总价（不含运费） ：</em>
                    <i class="summoney">{{ checkedPrice }}</i>
                </div>
                <div class="sumbtn">
                    <router-link class="sum-btn" to="/trade">结算</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import throttle from "lodash/throttle";
import { mapGetters } from "vuex";
export default {
    name: "ShopCart",
    data() {
        return {
            resultNum: 0,
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        // 获取购物车信息
        getData() {
            this.$store.dispatch('shopcart/getShopCartList');
        },
        operateSkunum: throttle(async function (cart, type, num) {
            switch (type) {
                case "minus":
                    console.log('减号点击', cart.skuNum);
                    if (cart.skuNum > 1) {
                        this.resultNum = -1;
                    } else {
                        this.resultNum = 0;
                    }
                    break;
                case "plus":
                    this.resultNum = 1;
                    break;
                case "change":
                    if (num == NaN) {
                        this.resultNum = 0;
                    } else if (num < 1) {
                        this.resultNum = 0;
                    } else {
                        this.resultNum = parseInt(num) - cart.skuNum;
                    }
                    break;

            }
            try {
                await this.$store.dispatch('detail/postAddCart', {
                    skuid: cart.skuId,
                    num: this.resultNum
                });
                this.getData();
            } catch (err) {
                console.log(err);
            }
            //调用商品数量改变接口
        }, 500),
        //删除商品
        async deleteCart(cart) {
            try {
                await this.$store.dispatch('shopcart/deleteCart', cart.skuId);
                this.getData();
            } catch (err) {
                console.log(err.message);
            }
        },
        //修改选中状态
        async handleCheck(cart, checked) {
            let isChecked = checked ? 1 : 0;
            try {
                await this.$store.dispatch('shopcart/cartState', {
                    skuId: cart.skuId,
                    isChecked: isChecked
                });
            } catch (err) {
                console.log(err.message);
            }
            this.getData();
        },
        //全选
        async handleCheckAll($event) {
            const checked = $event.target.checked;
            for (let item of this.cartInfoList) {
                try {
                    await this.handleCheck(item, checked);
                } catch (err) {
                    console.log(err.message);
                }
            }
            await this.getData();
        },
        //删除选中
        async deleteChecked() {
            for (let item of this.cartInfoList) {
                if (item.isChecked == 1) {
                    try {
                        await this.deleteCart(item);
                    } catch (err) {
                        console.log(err.message);
                    }
                }
            }
        }
    },
    computed: {
        ...mapGetters('shopcart', ['cartInfoList']),
        //全选状态
        isAllChecked() {
            return this.cartInfoList.every(item => item.isChecked == 1) && this.cartInfoList.length > 0;
        },
        //选中商品数量
        checkedNum() {
            return this.cartInfoList.filter(item => item.isChecked == 1).length;
        },
        //选中商品总价
        checkedPrice() {
            return this.cartInfoList.filter(item => item.isChecked == 1).reduce((pre, cur) => pre + cur.skuPrice * cur.skuNum, 0);
        },
    },


};
</script>

<style lang="less" scoped>
.cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
    }

    .cart-main {
        .cart-th {
            background: #f5f5f5;
            border: 1px solid #ddd;
            padding: 10px;
            overflow: hidden;

            &>div {
                float: left;
            }

            .cart-th1 {
                width: 25%;

                input {
                    vertical-align: middle;
                }

                span {
                    vertical-align: middle;
                }
            }

            .cart-th2 {
                width: 25%;
            }

            .cart-th3,
            .cart-th4,
            .cart-th5,
            .cart-th6 {
                width: 12.5%;
            }
        }

        .cart-body {
            margin: 15px 0;
            border: 1px solid #ddd;

            .cart-list {
                padding: 10px;
                border-bottom: 1px solid #ddd;
                overflow: hidden;

                &>li {
                    float: left;
                }

                .cart-list-con1 {
                    width: 15%;
                }

                .cart-list-con2 {
                    width: 35%;

                    img {
                        width: 82px;
                        height: 82px;
                        float: left;
                    }

                    .item-msg {
                        float: left;
                        width: 150px;
                        margin: 0 10px;
                        line-height: 18px;
                    }
                }

                .item-txt {
                    text-align: center;
                }
            }

            .cart-list-con4 {
                width: 10%;
            }

            .cart-list-con5 {
                width: 17%;

                .mins {
                    border: 1px solid #ddd;
                    border-right: 0;
                    float: left;
                    color: #666;
                    width: 6px;
                    text-align: center;
                    padding: 8px;
                }

                input {
                    border: 1px solid #ddd;
                    width: 40px;
                    height: 33px;
                    float: left;
                    text-align: center;
                    font-size: 14px;
                }

                .plus {
                    border: 1px solid #ddd;
                    border-left: 0;
                    float: left;
                    color: #666;
                    width: 6px;
                    text-align: center;
                    padding: 8px;
                }
            }

            .cart-list-con6 {
                width: 10%;

                .sum {
                    font-size: 16px;
                }
            }

            .cart-list-con7 {
                width: 13%;

                a {
                    color: #666;
                }
            }
        }
    }
}

.cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
            vertical-align: middle;
        }

        input {
            vertical-align: middle;
        }
    }

    .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
            float: left;
            padding: 0 10px;
            color: #666;
        }
    }

    .money-box {
        float: right;

        .chosed {
            line-height: 26px;
            float: left;
            padding: 0 10px;
        }

        .sumprice {
            width: 200px;
            line-height: 22px;
            float: left;
            padding: 0 10px;

            .summoney {
                color: #c81623;
                font-size: 16px;
            }
        }

        .sumbtn {
            float: right;

            a {
                display: block;
                position: relative;
                width: 96px;
                height: 52px;
                line-height: 52px;
                color: #fff;
                text-align: center;
                font-size: 18px;
                font-family: "Microsoft YaHei";
                background: #e1251b;
                overflow: hidden;
            }
        }
    }
}
</style>