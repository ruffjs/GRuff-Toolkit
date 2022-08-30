import Client from "@ruff-web/http/src/Client/Client";

export default function (c: Client) {
  return {
    // 站点
    addSite: (data: AnyRecord) => c.post(`api/v1/site`, data),
    getSite: (params: AnyRecord) => c.get(`api/v1/site${c.withQuery(params)}`),
    getSiteItem: (id: number) => c.get(`api/v1/site/${id}`),
    updateSite: (id: number, data: AnyRecord) =>
      c.put(`api/v1/site/${id}`, data),
    deleteSite: (id: number) => c.delete(`api/v1/site/${id}`),

    // 储罐
    addTank: (data: AnyRecord) => c.post(`api/v1/tank`, data),
    getTank: (params: AnyRecord) => c.get(`api/v1/tank${c.withQuery(params)}`),
    getTankItem: (id: number) => c.get(`api/v1/tank/${id}`),
    updateTank: (id: number, data: AnyRecord) =>
      c.put(`api/v1/tank/${id}`, data),
    deleteTank: (id: number) => c.delete(`api/v1/tank/${id}`),
  };
}
