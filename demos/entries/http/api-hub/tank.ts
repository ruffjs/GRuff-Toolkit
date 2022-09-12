import clients from "../clients";

export default clients.tank.defineApiHub("api/v1", {}, (client) => ({
    addSite: (data: AnyRecord) => client.post(`api/v1/site`, data),
    getSite: (params: AnyRecord) => client.get(`api/v1/site${client.withQueryString(params)}`),
    getSiteItem: (id: number) => client.get(`api/v1/site/${id}`),
    updateSite: (id: number, data: AnyRecord) =>
        client.put(`api/v1/site/${id}`, data),
    deleteSite: (id: number) => client.delete(`api/v1/site/${id}`),

    // 储罐
    addTank: (data: AnyRecord) => client.post(`api/v1/tank`, data),
    getTank: (params: AnyRecord) => client.get(`api/v1/tank${client.withQueryString(params)}`),
    getTankItem: (id: number) => client.get(`api/v1/tank/${id}`),
    updateTank: (id: number, data: AnyRecord) =>
        client.put(`api/v1/tank/${id}`, data),
    deleteTank: (id: number) => client.delete(`api/v1/tank/${id}`),
}));
