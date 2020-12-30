<template>
  <div>
    <x-header
      :right-options="{ showMore: datagroup.length > 0 }"
      :left-options="{ preventGoBack: true, backText: '返回' }"
      @on-click-more="showMenuPop = !showMenuPop"
      @on-click-back="clickBack"
      style="position:fixed; top:0;width:100%; z-index:1"
      >新建{{ isOut ? "出" : "入" }}批次统计单</x-header
    >

    <div style="margin-top:50px;" v-if="curData">
      <div class="content-top">
        <x-button
          mini
          type="primary"
          @click.native="curIndex -= 1"
          :disabled="curIndex === 0"
          >上一条</x-button
        >
        <p>{{ processStr }}</p>
        <x-button
          mini
          type="primary"
          @click.native="curIndex += 1"
          :disabled="curIndex === datagroup.length - 1"
          >下一条</x-button
        >
      </div>

      <p class="item-title">{{ curData.name }}</p>
      <!-- 获取成功 -->
      <div>
        <group>
          <x-input
            v-for="index in batchCount"
            :key="genKey(index)"
            :title="`${index}`"
            placeholder="点击输入批次号"
            label-width="50px"
            style="height:16px;font-size:18px;"
            v-model="curData.nums[index - 1]"
            :show-clear="false"
          ></x-input>
        </group>
      </div>
    </div>

    <popup v-model="showMenuPop">
      <div class="popupItem">
        <x-button @click.native="clickCommit" type="primary">提交</x-button>
        <x-button @click.native="showMenuPop = false">取消</x-button>
      </div>
    </popup>
  </div>
</template>

<script>
import {
  XTable,
  XButton,
  XHeader,
  LoadMore,
  Popup,
  XInput,
  Group,
  Cell,
  Confirm,
  Toast
} from "vux";

export default {
  components: {
    XTable,
    XButton,
    XHeader,
    LoadMore,
    Popup,
    XInput,
    Group,
    Cell,
    Confirm,
    Toast
  },
  data() {
    return {
      isNum: function(value) {
        return {
          valid: /^(0|[1-9][0-9]*)$/.test(value),
          msg: "您输入的值必须是零或者不以零开头的整数"
        };
      },
      batchCount: 10,
      goods: [],
      showModifyPop: false,
      showMenuPop: false,
      curIndex: 0,
      modifyItem: {
        name: "",
        index: -1,
        numgroup: [1, 1, 1, 1, 1, 1]
      }
    };
  },
  computed: {
    isOut() {
      return this.$route.query.type === "out" ? true : false;
    },
    datagroup() {
      return this.goods.map(goods => ({
        name: goods.name,
        nums: []
      }));
    },
    processStr() {
      return `${this.curIndex + 1} / ${this.datagroup.length}`;
    },
    curData() {
      return this.datagroup[this.curIndex];
    }
  },
  methods: {
    genKey(index) {
      return `${this.curIndex}-${index}`;
    },
    getDataFromServer: function() {
      this.$http
        .get(`/api/batch_record/template?type=${this.isOut ? "out" : "in"}`)
        .then(({ data }) => {
          this.goods = data;
        });
    },
    clickCommit() {
      this.$http
        .post(`/api/batch_record?type=${this.isOut ? "out" : "in"}`, {
          datagroup: this.datagroup
        })
        .then(res => {
          this.$vux.toast.show({
            text: "提交成功"
          });
          this.$router.replace("/");
        });
    },
    clickBack() {
      this.$vux.confirm.show({
        title: "提示",
        content: "确定要返回吗?",
        onCancel: () => {
          this.$vux.confirm.hide();
        },
        onConfirm: () => {
          this.$vux.confirm.hide();
          this.$router.replace("/");
        }
      });
    }
  },
  created() {
    this.getDataFromServer();
  }
};
</script>

<style lang="less" scoped>
.GoodsItem {
  margin-bottom: 10px;
}

.GoodsItem:first-child {
  margin-top: 48px;
}

.prompt {
  margin-top: 100px;
  font-size: 30px;
  background-color: #fff;
  text-align: center;
}

.popupItem {
  margin: 20px 15px;
  background-color: #eee;
}

.inputItem {
  height: 15px;
}

.content-top {
  display: flex;
  justify-content: space-between;
  vertical-align: center;
  padding: 3px 10px;

  & > button {
    margin: 0;
    box-sizing: border-box;
  }

  & > p {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.item-title {
  text-align: center;
  margin: 10px 0 0px 0;
  color: red;
  font-size: 20px;
}
</style>
