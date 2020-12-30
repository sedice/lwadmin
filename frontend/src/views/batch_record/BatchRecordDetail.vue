<template>
  <div>
    <x-header
      :left-options="{ preventGoBack: true, backText: '返回' }"
      @on-click-back="$router.back()"
      style="position:fixed; top:0;width:100%; z-index:1"
      >{{ isOut ? "出库批次详情" : "入库批次详情" }}</x-header
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
        <group v-if="curData.nums.length > 0">
          <x-input
            v-for="index in curData.nums.length"
            :key="genKey(index)"
            :title="`${index}`"
            label-width="50px"
            style="height:16px;font-size:18px;"
            v-model="curData.nums[index - 1]"
            :show-clear="false"
            disabled
          ></x-input>
        </group>
        <div v-else class="no-batch-data">
          没有相应的批次号
        </div>
      </div>
    </div>
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
      batchCount: 10,
      curIndex: 0,
      datagroup: []
    };
  },
  computed: {
    isOut() {
      return this.$route.query.type === "out" ? true : false;
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
      const id = this.$route.params.serchId;
      const url = `/api/batch_record/${id}?type=${this.isOut ? "out" : "in"}`;
      this.$http.get(url).then(({ data }) => {
        data.datagroup.forEach(item => {
          item.nums = item.nums.filter(a => !!a);
        });
        this.datagroup = data.datagroup;
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

.no-batch-data {
  display: flex;
  justify-content: center;
  margin: 20px;
}
</style>
