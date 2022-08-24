export default class EntityRef<
  CH extends string = any,
  CO extends string = any
> {
  static createEntityRef<CH extends string = any, CO extends string = any>(
    name: string,
    options: Readonly<RuffEntityOptions<CH, CO>>
  ) {
    const entity = new EntityRef();
  }
}
