import Entity from "../resource/Entity";

export default function registerEntities<E extends string = any>(
  entitis: RuffClientEntitisConfigs<E>,
  client: Record<E, Entity>
) {
  (Object.keys(entitis) as E[]).forEach((entityName) => {
    const { prefix, ...resource } = entitis[entityName]
    client[entityName] = Entity.createEntity(entityName, {
      resource,
      prefix,
      client: client as unknown as RuffResourceRequestor,
    });
  });
}
