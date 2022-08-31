import MainResource from "../resource/MainResource";

export function registerResources<E extends string = any>(
  resources: RuffClientResourcesConfigs<E>,
  client: Record<E, MainResource>
) {
  (Object.keys(resources) as E[]).forEach((resourceName) => {
    const { prefix, ...resource } = resources[resourceName]
    client[resourceName] = MainResource.createResource(resourceName, {
      resource,
      prefix,
      client: client as unknown as RuffClientBasicMethods & RuffResourceRequestors,
    });
  });
}
