import axios, { AxiosInstance } from "axios";
import { joinPath as $, withQueryString as q, toObjectiveQuery as _ } from "../../utils/formatters";
import AbstractBaseClient from "../core/AbstractClient";
import { GetterMethod, ResourceMethod } from "../../utils/resource-methods";

export default abstract class WithAxiosClient<R extends string = any, C extends string = any> extends AbstractBaseClient<R, C> implements RuffClientResourceBaseAPIs {
    protected _endpoint: string = "/";
    protected _axiosInstance: AxiosInstance;

    protected constructor(
        options: (RuffCreateClientOptions & Partial<RuffClientHooks>),
        config: RuffClientRequestConfig<any> = {},
        resources?: RuffClientResourcesConfigs<R>,
        calls?: RuffClientCallersConfigs<C>
    ) {
        super(options, resources, calls)
        this._endpoint = (options.host + "/").replace(/\/+$/, "/");
        this._timeout = options.timeout;

        this._axiosInstance = axios.create({
            ...config,
            baseURL: this._endpoint,
            timeout: this._timeout,
        });
        // console.log(this.__hooks)
        this._axiosInstance.interceptors.request.use(
            this.__requestFulfilled.bind(this),
            this.__requestRejected.bind(this)
        );
        this._axiosInstance.interceptors.response.use(
            this.__responseFulfilled.bind(this),
            this.__responseRejected.bind(this)
        );
    }

    get isMock() { return false }

    async $_create_resource<T extends RuffDataModel = any, D = any>(
        pathname: string,
        payload: D,
        query?: RuffHttpQueryCondition,
        config?: RuffClientRequestConfig<D>
    ) {
        return this.post<T, D>(pathname + q(query), payload, config);
    }

    async $_get_resource<T extends RuffDataModel = any, D = any>(
        pathname: string,
        query?: RuffHttpQueryCondition,
        config?: RuffClientRequestConfig<D>
    ) {
        return this.get<T, D>(pathname + q(query), config);
    }

    async $_get_pageable_resource<T extends RuffDataModel = any, D = any>(
        pathname: string,
        query?: RuffPageableResourcesQueryModel,
        config?: RuffClientRequestConfig<D>
    ) {
        return this.get<RuffHttpPageableResources<T>, D>(pathname + q(query), config);
    }


    async $_set_resource<T extends RuffDataModel = any, D extends RuffDataModel = any>(
        pathname: string,
        data: Partial<D>,
        query?: RuffHttpQueryCondition,
        config?: RuffClientRequestConfig<D>,
        partially = false
    ) {
        if (partially) {
            return this.patch<T, D>(pathname + q(query), data, config);
        }
        return this.put<T, D>(pathname + q(query), data as D, config);
    }

    async $_remove_resource<T extends RuffDataModel = any, D = any>(
        pathname: string,
        query?: RuffHttpQueryCondition,
        config?: RuffClientRequestConfig<D>
    ) {
        return this.delete<T, D>(pathname + q(query), config);
    }

    async $_call<T extends RuffDataModel = any, D extends RuffDataModel = any>(
        apiId: string,
        params: RuffClientResourceCallParams<D>,
        config?: RuffClientRequestConfig<D>
    ): Promise<RuffClientResponseContent<T | RuffHttpPageableResources<T>>> {

        if (typeof apiId === 'string') {
            const [resc, port] = apiId.split(":").map(str => str.trim())
            const { payload, query, idOrKeys, subIdOrKeys } = params
            console.log(1234678765, resc, payload, idOrKeys, subIdOrKeys, query)
            const rescMethod = parseInt(port) as GetterMethod
            const rescPathname = $([resc.replace("/**/", `/${$(idOrKeys)}/`), $(subIdOrKeys)])
            console.log(8652789240, rescPathname, rescMethod ? ResourceMethod[rescMethod] : "NULL")
            switch (rescMethod) {
                case ResourceMethod.LIST:
                    return this.$_get_pageable_resource(rescPathname, _(query) as RuffPageableResourcesQueryModel, config)

                case ResourceMethod.GET:
                    return this.$_get_resource(rescPathname, query, config)

                default:
                    throw new Error(
                        "This method in Http Client only supports LIST and GET method, only in the Mock Client it supports all Resource Methods."
                    );
            }

        }

        throw new Error(
            "You must provide an apiId to invock this method."
        );
    }

    async request<T extends RuffHttpResource = any, D = any>(
        config: RuffClientRequestConfig<D>
    ): Promise<RuffClientResponseContent<T>> {
        if (this._axiosInstance)
            return (this._axiosInstance as AxiosInstance).request<
                T,
                RuffClientResponseContent<T>,
                D
            >(config);
        return Promise.reject("Axios Instance not found.");
    }
    async get<T extends RuffHttpResource = any, D = any>(
        url: string,
        config?: RuffClientRequestConfig<D>
    ): Promise<RuffClientResponseContent<T>> {
        if (this._axiosInstance)
            return (this._axiosInstance as AxiosInstance).get<
                T,
                RuffClientResponseContent<T>,
                D
            >(url, config);
        return Promise.reject("Axios Instance not found.");
    }
    async post<T extends RuffHttpResource = any, D = any>(
        url: string,
        data?: D,
        config?: RuffClientRequestConfig<D>
    ): Promise<RuffClientResponseContent<T>> {
        if (this._axiosInstance) {
            try {
                return (this._axiosInstance as AxiosInstance).post(url, data, config)
            } catch (error) {
                console.log(error)
            }
        }
        return Promise.reject("Axios Instance not found.");
    }
    async put<T extends RuffHttpResource = any, D = any>(
        url: string,
        data?: D,
        config?: RuffClientRequestConfig<D>
    ): Promise<RuffClientResponseContent<T>> {
        if (this._axiosInstance)
            return (this._axiosInstance as AxiosInstance).put(url, data, config);
        return Promise.reject("Axios Instance not found.");
    }
    async patch<T extends RuffHttpResource = any, D = any>(
        url: string,
        data?: Partial<D>,
        config?: RuffClientRequestConfig<Partial<D>>
    ): Promise<RuffClientResponseContent<T>> {
        if (this._axiosInstance)
            return (this._axiosInstance as AxiosInstance).patch(url, data, config);
        return Promise.reject("Axios Instance not found.");
    }
    async delete<T extends RuffHttpResource = any, D = any>(
        url: string,
        config?: RuffClientRequestConfig<D>
    ): Promise<RuffClientResponseContent<T>> {
        if (this._axiosInstance)
            return (this._axiosInstance as AxiosInstance).delete(url, config);
        return Promise.reject("Axios Instance not found.");
    }
}
