import CallableAPIs from "../resource/CallableAPIs";
import MainResource from "../resource/MainResource";

export function registerResources<
  R extends string = any,
  C extends string = any
>(
  resources: RuffClientResourcesConfigs<R>,
  calls: RuffClientRPCConfigs<C>,
  client: Record<R | C, MainResource | CallableAPI>
) {
  (Object.keys(calls) as C[]).forEach((callname) => {
    const { prefix, ...call } = calls[callname];
    client[callname] = CallableAPIs.createApi(callname, {
      call,
      prefix,
      client: client as unknown as RuffClientBasicMethods &
        RuffResourceRequestors,
    });
  });
  (Object.keys(resources) as R[]).forEach((resourcename) => {
    const { prefix, ...resource } = resources[resourcename];
    client[resourcename] = MainResource.createResource(resourcename, {
      resource,
      prefix,
      client: client as unknown as RuffClientBasicMethods &
        RuffResourceRequestors,
    });
  });
}
