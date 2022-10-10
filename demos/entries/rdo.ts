import createRDO from "@ruff-web/rdo/src/classes"

class User {
    static [createRDO.generate] = {
        uid: 0,
        username: 'word',
        name: 'cname'
    }
}

class Device {
    static [createRDO.generate]() { return new Device }
}

console.log(createRDO({
    "locateType": ["Auto", "Auto"],
    "coordSys": ["autonavi1", "autonavi2", "autonavi1"],
    "location": "121.339435, 31.199995",
    "cloudProvider": "pick Aliyun AWS",
    "name": "cword",
    "productId": 111,
    "projectId": [0, 1, 2, 3],
    "sn": "string",
    "gatewaySn": "uuid",
    "referId": 0,
    "remark": "sentence",
    "address": "address",
    "desc": "echo this is a static sentence",
    "users": [User, 5, 10],
    "devices": [Device, 3],
}))

export default {}