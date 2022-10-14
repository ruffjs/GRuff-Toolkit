# 终极集成配置：ResourceModel

## 指定设备列表长度和页数

> 查询 5 条数据
>
> 对应 HTTP 操作: GET /api/v1/device?pageSize=5&pageIndex=1

```typescript
const res: HttpResourcesList<Device, any> = await client.device.list(5);
// print res.$raw;
```

> 查询第 2 页，每页 8 条数据
>
> 对应 HTTP 操作:
>
> GET /api/v1/device?pageSize=8&pageIndex=2

```typescript
const res: HttpResourcesList<Device, any> = await client.device.list(8, 2);
// print res.$raw;
```

## 设置查询条件

> 查询在线子设备，按lastReport逆序
>
> 对应 HTTP 操作: GET /api/v1/device?type=Device&online=true&sort=lastReport&order=desc

```typescript
const res: HttpResourcesList<Device, any> = await client.device
      .query({ type: "Device", online: true })
      .query("sort=lastReport&order=desc")
      .list();
// print res.$raw;
```

## 使用pick()方法

> 实质是query({[idskey]: []}).list()的语法糖
>
> 查询 5 条数据
> 对应 HTTP 操作: GET /api/v1/device?pageSize=9999&pageIndex=1&ids=2231&ids=2232&ids=2166

```typescript
const res: HttpResourcesList<Device, any> = await client.device.pick([2231, 2232, 2166]);
// or
const res: HttpResourcesList<Device, any> = await client.query({ids: [2231, 2232, 2166]}).list();
// print res.$raw;
```

## 演示
