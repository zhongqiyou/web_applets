<template>
    <div>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            :pager-count="singular || isSingular"
            :hide-on-single-page="hideOnSinglePage"
            @current-change="handleCurrentChange"
        >
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props: {
            /**
             * @PrincessSnow 每页显示多少条数据
             * @default 默认显示10条数据
             */
            pageSize: {
                type: Number,
                default: 10
            },
            /**
             * @PrincessSnow 总页码
             */
            total: {
                type: Number,
            },
            /**
             * @PrincessSnow 页码按钮超过设置的值时 自动隐藏多余的按钮
             * @default 默认11
             */
            pagerCount: {
                type: Number,
                default: 11,
            },
            /**
             *  @PrincessSnow 当前页码只有一页的时候是否隐藏分页
             *  @default 默认隐藏
             */
            hideOnSinglePage: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                page: 1,
                singular: 11
            }
        },
        methods: {
            /**
             * @PrincessSnow 获取当前点击的页码
             * @param val 当前页码
             * TODO @PrincessSnow 暂时不晓得是否需要保存当前页码数量
             * 虽然可以通过父组件直接拿子组件数据 但是好像不能做到点击的时候就获取
             * 所以用子组件通知父组件去获取点击时候的值
             */
            handleCurrentChange(val) {
                this.page = val
                this.$emit('handleCurrentChange', this.page)
            }
        },
        filters: {
            /**
             * @PrincessSnow 判断传递过来的参数是否大于等于5并且小于等于21的奇数
             * @returns {number} 如果参数是偶数的话 返回默认的参数
             */
            isSingular() {
                if (this.pagerCount >= 5 && this.pagerCount >= 21) {
                    if (this.pagerCount % 2 != 0) {
                        this.singular = this.pagerCount
                    }
                }
                return this.singular
            }
        }
    }
</script>

<style scoped>

</style>
