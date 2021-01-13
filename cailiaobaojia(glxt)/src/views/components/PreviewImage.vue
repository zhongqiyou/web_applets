<template>
    <div>
        <el-image
            style="width: 100px; height: 100px"
            :src="urlImage"
            :preview-src-list="srcList"
            :z-index="zIndex"
            @error="error"
        >
        </el-image>
    </div>
</template>

<script>
    export default {
        name: "PreviewImage",
        props: {
            /**
             * @PrincessSnow 缩略图主图
             */
            url: {
                type: String,
                default: 'data:image/jpg;base64,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'
            },
            /**
             * @PrincessSnow 缩略图副图组
             */
            srcList: {
                type: Array,
                default: () => {
                    return []
                }
            },
            zIndex: {
                type: Number,
                default: 2000
            }
        },
        data() {
            return {
                urlImage: null
            }
        },
        methods: {
            /**
             * @PrincessSnow 默认的图片赋值
             */
            defaultImage() {
                this.urlImage = 'data:image/jpg;base64,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'
            },
            /**
             * @PrincessSnow 图片加载失败时候给他一个默认图片
             * @param err
             */
            error(err) {
                this.defaultImage()
            },

            isPicture() {
                //判断是否是图片 - strFilter必须是小写列举
                let strFilter=".jpeg|.gif|.jpg|.png|.bmp|.pic|"
                if (this.url == null) {
                    return
                }
                if(this.url.indexOf(".")>-1) {
                    let p = this.url.lastIndexOf(".");
                    let strPostfix=this.url.substring(p,this.url.length) + '|';
                    strPostfix = strPostfix.toLowerCase();
                    if(strFilter.indexOf(strPostfix)>-1) {
                        return true;
                    }
                }
                return false;
            },
            isHttpUrl()
            {
              return /^((http|https):\/\/)/.test(this.url)
            },
        },
        /**
         * @PrincessSnow 判断父组件传递的值是否是一个图片url
         */
        created: function (){
            if (this.isPicture() !== true) {
                this.defaultImage()
            } else {
                if (!this.isHttpUrl()) {
                  this.urlImage = `${process.env.VUE_APP_IMAGE_URL}` + this.url
                } else {
                  this.urlImage = this.url
                }
            }
        }
    }
</script>

<style scoped>

</style>
