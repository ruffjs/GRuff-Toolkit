import { ResourceMethod as M } from "@ruff-web/http/src/utils/resource-methods";
import { defineApiHub } from "@ruff-web/http/src/utils/api-hub";
import clients from "../clients";


class A { }
class B {
    static model = A
}
const apihub1 = defineApiHub<{
    login: A
}, {
    login: B
}>("api/v1", clients.user, {
    login: {
        method: M.POST,
        path: "user/login",
    }
} as const)

const apihub2 = clients.user.defineApiHub("api/v1", {
    login2: {
        method: M.POST,
        type: B.prototype,
        model: B.model,
        path: "user/login",
    },

} as const)

apihub1.login

apihub2.login2

const apihub = {
    ...apihub1,
    ...apihub2,
    getXXXByXXX(a: string, b: number) {
        return clients.user.post('')
    }
}

console.log(await apihub.login({
    payload: {
        loginName: "tank_test",
        password: "nanchao.org",
        clientType: "Web",
    },
}))

apihub.getXXXByXXX("", 1)