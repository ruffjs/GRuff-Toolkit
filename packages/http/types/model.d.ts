type identity = number | string;
type Id = identity;
type UnionIdentity = identity[]; // Union keys as identity
type IdOrKeys = identity | UnionIdentity;

type RuffResourcePath = string[] | string;

interface RuffHttpRecord extends AnyRecord {}

type RuffBatchModels<T extends RuffDataModel = RuffDataModel> = T[];

type RuffDataModel = RuffHttpRecord | ScalarValue | AnyArray;

type RuffReferencesDescription = RuffHttpResource;
