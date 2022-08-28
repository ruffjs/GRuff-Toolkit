import Entity from "@ruff-web/http/src/apis/Entity";
import userResource from "@ruff-web/entities/src/presets/user/user.http";
import clients from "../../http/clients";
import Random from "@ruff-web/data-random/src";

console.log(clients, clients.mock.network);
const tmpls = {
  告警类型: "@alertType",
  中文名: "@cname",
  中文短文本: "@cword(2, 8)",
  中文长文本: "@cword(8, 20)",
  Base64图片: "@dataImage(64x64)",
  日期时间: "@datetime",
  设备名称: "@deviceName",
  电子邮件: "@email",
  FSU名称: "@fsuName",
  自增ID: "@increment(1)",
  手机号: "@integer(13000000000,19099999999)",
  自然数: "@natural(2, 10)",
  基站名称: "@stationName",
  序列号: "@string('number',10)",
  用户等级: "@userLevel",
};

// Random.extend({
//   userLevel: function () {
//     const arr = ["Admin", "Member", "Operator"];
//     return this.pick(arr);
//   },
//   stationName: function () {
//     const arr = [
//       "智宏-太行大街正无路",
//       "智宏-市区国泰宾馆搬迁",
//       "智宏-太行大街正无路",
//     ];
//     return this.pick(arr);
//   },
//   fsuName: function () {
//     const arr = [
//       "智宏-308国道与方兴路FSU",
//       "智宏-市区国泰宾馆搬迁FSU",
//       "智宏-太行大街正无路FSU",
//     ];
//     return this.pick(arr);
//   },
//   deviceName: function () {
//     const arr = ["开关电源-联通", "开关电源-电信", "开关电源-移动"];
//     return this.pick(arr);
//   },
//   deliveryState: function () {
//     const arr = ["Pending", "Working"];
//     return this.pick(arr);
//   },
//   deviceType: function () {
//     const arr = ["38", "06"];
//     return this.pick(arr);
//   },
//   alertState: function () {
//     const arr = ["Finished", "Created"];
//     return this.pick(arr);
//   },
//   alertLevel: function () {
//     // const arr = ["One", "Two", "Three", "Four"];
//     const arr = [1, 2, 3, 4];
//     return this.pick(arr);
//   },
//   alertType: function () {
//     const arr = ["交流输入缺相告警 1", "FSU 离线告警"];
//     return this.pick(arr);
//   },
// });

const userEntity = Entity.createEntity("user", {
  resource: userResource,
  client: clients.mock,
  prefix: "api/v1",
});

const res = await userEntity.post({
  name: "string",
  email: "string",
  phone: "string",
  password: "string",
  remark: "string",
  roleIds: [0],
  projectIds: [0],
  allProject: false,
});

console.log(res, res.data.data);
