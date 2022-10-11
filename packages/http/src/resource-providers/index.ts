import CallableResourceProvider from "./CallableResourceProvider"
import StatelessResourceProvider from "./StatelessResourceProvider"

export default function registerResources<
  R extends string = any,
  C extends string = any
>(
  resources: RuffClientResourcesConfigs<R>,
  calls: RuffClientCallersConfigs<C>,
  client: Record<R | C, StatelessResourceProvider | RuffResourceCaller>
) {
  (Object.keys(calls) as C[]).forEach((name) => {
    const { prefix, ...call } = calls[name];
    client[name] = CallableResourceProvider.defineCallApi(name, {
      call,
      prefix: [prefix],
      client: client as RuffClient,
    });
  });
  (Object.keys(resources) as R[]).forEach((name) => {
    const { prefix, ...resource } = resources[name];
    client[name] = StatelessResourceProvider.defineProvider(name, {
      resource,
      prefix,
      client: client as RuffClient,
    });
  });
}
