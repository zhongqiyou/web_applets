<!-- @PrincessSnow element-ul 实现的图片上传组件 -->
<template>
    <div>
        <el-upload
            ref="emptyUpload"
            :action="action"
            list-type="picture-card"
            :drag="true"
            :on-success="success"
            :limit="limit"
            :on-exceed="exceed"
            :on-remove="remove"
            :on-preview="handlePictureCardPreview"
            :before-upload="upload"
            :file-list="imagePath"
            :headers="headers"
        >

            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
            <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
            >
              <i class="el-icon-zoom-in"></i>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props: {
            action: {
                type: String,
            },
            limit: {
                type: Number,
                default: 5,
            },
            // 是否通知父组件上传或者删除图片
            solelyMarking: {
                type: String,
                default: null
            },
            type: {
                type: Array,
                default: () => {
                    return ['png', 'jpeg', 'gif']
                },
            },
            fileList: {
                type: Array,
                default: () => {
                    return []
                }
            },
            headers: {
                type: Object,
                default: () => {
                  return {}
                }
            },
            url: {
              type: String,
              default: ''
            }
        },
        name: 'UploadImage',
        data() {
          return {
              dialogImageUrl: '',
              dialogVisible: false,
              dataImageUrl: [],
              imagePath: [],
          }
        },
        created: function() {
            this.isImage()

            /*if (this.fileList.length !== 0) {
                this.isImage()
            }*/
        },
        methods: {
            isImage() {
                if (this.url) {
                  this.imagePath = [{
                    url: this.url
                  }]
                }
                if (this.fileList == null) {
                    return
                }
                if (this.fileList.length == 0) {
                    return
                }
                let imagePathArr = []
                this.fileList.forEach((val, index) => {
                    if (val.hasOwnProperty('path')) {
                        imagePathArr.push({
                            url: val.path
                        })
                    } else if(val.hasOwnProperty('url')) {
                        imagePathArr.push({
                            url: val.url
                        })
                    } else {
                        imagePathArr.push({
                            url: val
                        })
                    }
                })
                this.imagePath = this.dataImageUrl = imagePathArr
            },
            /**
             * PrincessSnow 清空当前上传的所有图片或者文件
             */
            clearFiles () {
                // this.dataImageUrl = Object.assign(this.dataImageUrl, this.$options.data().dataImageUrl)
                this.$refs['emptyUpload'].clearFiles();
                this.dataImageUrl = []
                this.dataImageUrl = ''
            },
            /**
             * PrincessSnow 判断上传是否符合类型
             * @param file 当前上传的文件信息
             */
            upload: function (file) {
                if (this.type.includes(file.type.split('/')[1])) {
                    return true
                }
                return false
            },
            /**
             * PrincessSnow 上传成功后返回参数
             * @param res 后端返回的结果
             * @param file 图片临时目录
             * @param fileList 图片临时目录和后端返回的结果
             */
            success: function (res, file, fileList) {
                let arr = []
                fileList.forEach((data, index) => {
                    if (data.hasOwnProperty('response')) {
                        if (data.response.status == 200) {
                            arr.push(data.response.data)
                        }
                    } else {
                        arr.push(data)
                    }
                })
                this.dataImageUrl = arr

                if (this.solelyMarking !== null) {
                    this.$emit('solelyMarking', this.solelyMarking)
                }
            },
            /**
             * PrincessSnow 如果上传超过最大值的时候给个提示
             * @param files
             * @param fileList
             */
            exceed: function (files, fileList) {
                this.$message.error(`出错咯！已超过${this.limit}最大限制`);
            },
            /**
             * PrincessSnow 删除当前所选的图片
             * @param file 当前图片的临时目录信息
             * @param fileList 图片临时目录和后端返回的结果
             */
            remove: function (file, fileList) {
                let arr = []
                fileList.forEach((data, index) => {
                    if (data.hasOwnProperty('response')) {
                        if (data.response.status == 200) {
                            arr.push(data.response.data)
                        }
                    } else {
                        arr.push(data)
                    }
                })
                this.dataImageUrl = arr

                if (this.solelyMarking !== null) {
                    this.$emit('solelyMarking', this.solelyMarking)
                }
            },
            /**
             * PrincessSnow 图片预览
             * @param file 当前点击的图片的所有信息
             */
            handlePictureCardPreview: function (file) {
                this.dialogImageUrl = file.url
                this.dialogVisible = true
            }
        }
    }
</script>

<style>
    .el-upload__input {
        display: none !important;
    }
    .el-upload-dragger {
        width: 100% !important;
        height: 100% !important;
    }
</style>
