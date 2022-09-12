import { ResourceMethod as M } from "@ruff-web/http/src/utils/resource-methods";
import { combineApiHubs, defineApiHub } from "@ruff-web/http/src/helpers/ApiHub";
import clients from "../clients";

class A { }
class B {
    static model = A.prototype
}
const apihub1 = defineApiHub<{
    login: {
        type: A,
        model: B
    }
}>("api/v1", clients.user, {
    login: {
        method: M.POST,
        path: "user/login",
    }
} as const)

const apihub2 = defineApiHub("api/v1", clients.user, {
    login2: {
        method: M.POST,
        type: B.prototype,
        model: B.model,
        path: "user/login",
    },
} as const)

const apihub3 = clients.user.defineApiHub("api/v1", {
    login3: {
        method: M.POST,
        type: B.prototype,
        model: B.model,
        path: "user/login",
    },
} as const)

const busHub = {
    ...combineApiHubs(apihub1, apihub2, apihub3),
    getSthById(a: string, b: number) {
        return clients.user.post('')
    }
}

apihub1.login
apihub2.login2
apihub3.login3

busHub.login
busHub.login2
busHub.login3

busHub.login({
    payload: {
        loginName: "tank_test",
        password: "nanchao.org",
        clientType: "Web",
    },
}).then(res => {
    console.log('busHub.login res:', res)
}).catch(err => {
    console.log('busHub.login err:', err, err.toJSON())
});
busHub.getSthById("", 1).then(res => {
    console.log('busHub.getSthById res:', res)
}).catch(err => {
    console.log('busHub.getSthById err:', err, err.toJSON())
});