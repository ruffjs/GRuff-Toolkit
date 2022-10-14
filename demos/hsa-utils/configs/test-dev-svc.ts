import { ResourceMethod as M } from "@ruff-web/http/src/utils/resource-methods";

export default {
    device: {
        prefix: "api/v1",
        methods: [M.POST, M.LIST, M.GET, M.PUT, M.DELETE],
        pickable: "ids",
        pk: 'id',
        listKeys: ["content", "totalCount"],
    }
};