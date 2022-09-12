import CallableResource from "./CallableResource"
import StatelessResource from "./StatelessResource"

export default function registerResources<
  R extends string = any,
  C extends string = any
>(
  resources: RuffClientResourcesConfigs<R>,
  calls: RuffClientCallersConfigs<C>,
  client: Record<R | C, StatelessResource | RuffResourceCaller>
) {
  (Object.keys(calls) as C[]).forEach((callname) => {
    const { prefix, ...call } = calls[callname];
    client[callname] = CallableResource.defineCallApi(callname, {
      call,
      prefix: [prefix],
      client: client as RuffClient,
    });
  });
  (Object.keys(resources) as R[]).forEach((resourcename) => {
    const { prefix, ...resource } = resources[resourcename];
    client[resourcename] = StatelessResource.defineResource(resourcename, {
      resource,
      prefix,
      client: client as RuffClient,
    });
  });
}
