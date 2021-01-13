<template>
  <div class="btnBox">
    <div class="btnItem" v-for="(radioItem,index) in list" :key="index" @click="clickBtn(index,radioItem.id)">
      <Icon
        v-if="isChange == index"
        type="ios-radio-button-on"
        :color="ban ?'#cccccc': '#2d8cf0' "
        size="0.14rem"
      />
      <Icon v-else type="md-radio-button-off" :color="ban ?'#e0e2e5': '#f3f3f3' " size="0.14rem" />
      <span>{{radioItem.name}}</span>
      <div v-if="radioItem.showContent" class="solt">
        {{radioItem.contentTextLeft}}
        <Input
          class="other"
          :style="{width:radioItem.contentTextWidth}"
          v-model="radioItem.otherContent"
          type="textarea"
          :autosize="{minRows: 1 }"
          @on-blur="getOtherContent(index,radioItem.otherContent,radioItem.id)"
          :disabled="ban"
        />
        {{radioItem.contentTextRight}}
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "KRadio",
  data() {
    return {
      list: [],
      isChange: -1,
      ban: false,
      onValue: ""
    };
  },
  props: {
    radioList: Array,
    radioBan: Boolean,
    radioValue: [Number, String]
  },
  created() {
    this.getRadio();
  },
  mounted() {
    setTimeout(res =>{
      this.$set(this, "onValue", this.radioBan);
    },100);

    this.list = this.radioList;
    this.ban = this.radioBan;
    this.onValue = this.radioValue;
    console.log("jiahg", this.radioValue);
  },
  methods: {
    getRadio() {
      this.onValue = this.radioValue;
      if (this.onValue > 0) {
        this.isChange = this.onValue - 1;
      }
    },
    clickBtn(index, value) {
      if (this.ban) {
        return;
      } else {
        if (index != this.isChange) {
          this.isChange = index;
          this.onValue = value;
          this.$emit("radioFunc", value);
        } else {
          this.isChange = -1;
          this.onValue = "";
          this.$emit("radioFunc", "");
        }
      }
    },
    getOtherContent(index, value, id) {
      this.$emit("contentFunc", { index, value, id });
    }
  }
};
</script>
<style lang="less">
//单选框样式
.btnBox {
  font-size: 0.14rem;
  display: flex;
  align-items: center;
  background: #fff;
  .btnItem {
    display: flex;
    align-items: center;
    margin: 0 0.2rem;
    span {
      margin-left: 0.05rem;
    }
    .solt {
      display: flex;
      align-items: center;
      .other {
        height: 100%;
        text-align: left;
        font-size: 0.14rem;
      }
    }
  }
}
</style>