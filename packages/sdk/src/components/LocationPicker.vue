<template>
  <a-modal
    class="dev-map"
    title="地图选取"
    :visible="true"
    width="820px !important"
    @ok="$emit('pick', { address: address, position })"
    @cancel="$emit('close', 'cancle')"
  >
    <div id="container"></div>
    <div class="dis-space mt-10">
      <div style="width: 280px; margin-right: 40px">
        <div class="font-w5">自定义地址 :</div>
        <a-textarea auto-size placeholder="选取地址" v-model:value="address" />
      </div>
      <div class="flex-1 dis-space">
        <div>
          <div class="font-w5">经度</div>
          <a-input
            v-if="editPosition"
            placeholder="选取地址"
            v-model:value="positionEdit[0]"
          />
          <a-input v-else disabled placeholder="选取地址" v-model:value="position[0]" />
        </div>
        <div style="margin: 0 20px">
          <div class="font-w5">纬度</div>
          <a-input
            v-if="editPosition"
            placeholder="选取地址"
            v-model:value="positionEdit[1]"
          />
          <a-input v-else disabled placeholder="选取地址" v-model:value="position[1]" />
        </div>
        <div style="width: 60px; line-height: 32px">
          <div class="font-w5">&nbsp;</div>
          <div class="dis-space" v-if="editPosition">
            <ruff-icon
              type="close-outlined"
              style="line-height: 32px"
              @click="(editPosition = false), (positionEdit = position)"
            />
            <ruff-icon
              type="check-outlined"
              style="line-height: 32px"
              class="click-font"
              @click="editAddress"
            />
          </div>
          <div v-else @click="editPosition = true">
            <ruff-icon type="edit-outlined" class="click-font" />
          </div>
        </div>
      </div>
    </div>
    <div class="input-item">
      <div class="input-item-prepend">
        <span class="input-item-text">请输入关键字</span>
      </div>
      <input id="tipinput" type="text" />
    </div>
  </a-modal>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
import { message } from "ant-design-vue";
export default {
  props: { addressInfo: Object },
  data() {
    return {
      AMap: null,
      editPosition: false,
      address: "上海市浦东新区张江镇祥科路 111 号",
      positionEdit: [121.605856, 31.180911], //可编辑
      position: [121.605856, 31.180911], //中心点坐标
    };
  },
  watch: {
    AMap(AMap) {
      const map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: 20,
        center: this.position,
      });
      this._map = map;
      this._marker = new AMap.Marker({
        position: this.position,
        icon: new AMap.Icon({
          image:
            "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
          size: new AMap.Size(60, 60), //图标大小
          imageSize: new AMap.Size(26, 34),
        }),
        offset: new AMap.Pixel(-13, -30),
        // 设置是否可以拖拽
        // draggable: true,
        cursor: "pointer",
      });
      this._marker.setMap(this._map);
      // 标记点
      AMap.plugin(["AMap.ToolBar"], function () {
        map.addControl(
          new AMap.ToolBar({
            // 标尺缩放
            visible: true,
          })
        );
      });
      map.on("click", (e) => this.getAddress(e.lnglat.getLng(), e.lnglat.getLat()));

      // 地理编码
      this._geocoder = new AMap.Geocoder();

      // 筛选
      const autoComplete = new AMap.Autocomplete({
        input: "tipinput",
      });

      this._placeSearch = new AMap.PlaceSearch({
        map: map,
      }); //构造地点查询类
      AMap.event.addListener(autoComplete, "select", this.upadtaInput);
    },
    position() {
      try {
        this.positionEdit = JSON.parse(JSON.stringify(this.position));
      } catch (error) {
        this.positionEdit = [121.605856, 31.180911];
      }
    },
  },
  mounted() {
    const { address, latitude, longitude } = this.addressInfo;
    this.address = address || "上海市浦东新区张江镇祥科路 111 号";
    this.position = [latitude || 121.605856, longitude || 31.180911];
    if (window.AMap) {
      this.AMap = window.AMap;
    } else {
      this.loadMap();
    }
  },
  methods: {
    loadMap() {
      AMapLoader.load({
        key: "721d220f06ef4e10de62ae6c8a9ef036",
        plugins: [
          "AMap.Geocoder",
          "AMap.Geolocation",
          "AMap.Autocomplete",
          "AMap.PlaceSearch",
        ],
      })
        .then((AMap) => {
          this.AMap = AMap;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getAddress(lng, lat) {
      this._geocoder.getAddress([lng, lat], (status, result) => {
        if (status === "complete" && result.regeocode) {
          this.address = result.regeocode.formattedAddress;
          this.position = [lng, lat];
          this._marker.setPosition(this.position);
        } else {
          message.error("根据经纬度查询地址失败");
        }
      });
    },
    upadtaInput(e) {
      console.log(e);
      this.position = [e.poi.location.lng, e.poi.location.lat];
      this.address = e.poi.district + e.poi.name;
      this._marker.setPosition(this.position);
      // 添加事件监听, 使地图自适应显示到合适的范围
      // 第一个参数为空，表明用图上所有覆盖物 setFitview
      // 第二个参数为false, 非立即执行
      // 第三个参数设置上左下右的空白
      this._map.setFitView(null, false, [150, 60, 100, 60]);
    },
    editAddress() {
      this.getAddress(this.positionEdit[0], this.positionEdit[1]);
      this.editPosition = false;
    },
  },
};
</script>
<style lang="scss">
.dev-map {
  .font-w5 {
    line-height: 28px;
    font-weight: 500;
  }

  .ant-modal-body {
    position: relative;
    display: flex;
    flex-flow: column;

    #container {
      width: 100%;
      height: 400px;
    }

    .input-item {
      padding: 10px;
      border-radius: 5px;
      position: absolute;
      top: 34px;
      right: 34px;
      background-color: white;
      min-width: 300px;
      box-shadow: 0 2px 6px 0 rgb(114 124 245 / 50%);
      display: flex;
      align-items: center;

      .input-item-prepend {
        line-height: 28px;
        background-color: #e6e9ed;
        padding: 0 10px;
      }

      #tipinput {
        min-width: 100px;
        flex: 1;
        border: 1px solid #ccc;
      }
    }

    .dis-space {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .flex-1 {
      flex: 1;
    }
  }
}
</style>
