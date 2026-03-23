<template>
    <div class="pagination">
        <!-- 上面部分 -->
        <button :disabled="currentPage == 1" @click="handleChange(currentPage - 1)">
            上一页
        </button>
        <button v-if="startNumAndEndNum.start > 1" :class="currentPage == 1 ? 'active' : ''" @click="handleChange(1)">
            1
        </button>
        <button v-if="startNumAndEndNum.start > 2">···</button>
        <!-- 中间部分 -->
        <button v-for="(page, index) in pageRange" :key="index" :class="currentPage == page ? 'active' : ''"
            @click="handleChange(page)">
            {{ page }}
        </button>
        <!-- 下面部分 -->
        <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
        <button v-if="startNumAndEndNum.end < totalPage" @click="handleChange(totalPage)"
            :class="currentPage == totalPage ? 'active' : ''">
            {{ totalPage }}
        </button>
        <button :disabled="currentPage == totalPage" @click="handleChange(currentPage + 1)">下一页</button>
        <button style="margin-left: 10px">共 {{ total }} 条</button>
    </div>
</template>

<script>

export default {
    name: "Pagination",
    props: ['pageNo', 'pageSize', 'continuousPages', 'total'],
    data() {
        return {
            currentPage: 0
        }

    },
    mounted() {
        this.currentPage = this.pageNo;
    },
    watch: {
        // 监听父组件 pageNo 变化，同步到子组件
        pageNo(newVal) {
            this.currentPage = newVal;
        }
    },
    computed: {
        totalPage() {
            return Math.ceil(this.total / this.pageSize)
        },
        // 修正拼写错误（star→start）与保留字Prop（continue→continuousPages）
        startNumAndEndNum() {
            let start = 0, end = 0;
            if (this.totalPage < this.continuousPages) {
                start = 1;
                end = this.totalPage;
            } else {
                start = this.currentPage - Math.floor(this.continuousPages / 2);
                end = this.currentPage + Math.floor(this.continuousPages / 2);
                if (start < 1) {
                    start = 1;
                    end = this.continuousPages;
                }
                if (end > this.totalPage) {
                    end = this.totalPage;
                    start = this.totalPage - this.continuousPages + 1;
                }
            }

            return { start, end }
        },
        pageRange() {
            const { start, end } = this.startNumAndEndNum;
            const range = [];
            for (let i = start; i <= end; i++) {
                range.push(i);
            }
            return range;
        },
    },
    methods: {
        handleChange(page) {
            this.currentPage = page;
            this.$emit('changePage', page)
        }
    }

};
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}

.active {
    background-color: skyblue;
}
</style>