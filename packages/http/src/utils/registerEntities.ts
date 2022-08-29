import Entity from "../apis/Entity";

export default function registerEntities<E extends string = any>(
  entitis: Record<E, RuffEntityConfiguration>,
  client: Record<E, Entity>
) {
  (Object.keys(entitis) as E[]).forEach((entityName) => {
    client[entityName] = Entity.createEntity(entityName, {
      resource: entitis[entityName],
      client: client as unknown as RuffResourceRequestor,
      prefix: "api/v1",
    });
  });
}
