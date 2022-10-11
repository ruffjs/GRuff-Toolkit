import createRDO from "@ruff-web/rdo/src/classes"
import { createRandom, RandomInstance } from "@ruff-web/data-random";

const random = createRandom()

class User {
    static [createRDO.generate] = {
        [createRDO.prototype]: User.prototype,
        uid: 0,
        username: 'email',
        name: 'cname'
    }
}

class Task {
    static [createRDO.generate] = {
        id: 1111222233334444,
        name: 'ctitle 5 10',
        state: false,
    }
}

class Device {
    id: string;
    name: string;
    static [createRDO.generate]() { return new Device }

    constructor() {
        this.id = random.id()
        this.name = random.string()
    }
}

const rdo = createRDO({
    "locateType": ["Auto", "Auto"],
    "coordSys": ["autonavi1", "autonavi2", "autonavi1"],
    "location": "121.339435, 31.199995",
    "cloudProvider": "pick Aliyun AWS",
    "name": "cword 3 5",
    "productId": 111,
    "projectId": [0, 1, 2, 3],
    "sn": "string 10 10 ABCDEFGH",
    "value": "string",
    "gatewaySn": "uuid",
    "referId": 0,
    "remark": "sentence",
    "address": "address",
    "desc": "echo this is a static sentence",
    "users": [User, 5, 10],
    "devices": [Device, 3],
    "tasks": [Task],
    "region": {
        type: 'str',
        template: "{0} {1} {2}",
        inputs: ["province", "city", "county"]
    }
})

console.log(rdo)
console.log(rdo[createRDO.generate](random))
console.log(rdo[createRDO.generate](random))

export default {}