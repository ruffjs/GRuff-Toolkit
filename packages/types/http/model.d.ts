type identity = number | string;
type Id = identity;
type IdOrKeys = identity | identity[];

type RuffResourcePath = string[] | string;

interface RuffHttpRecord extends AnyRecord {}

type RuffBatchModels<T extends RuffDataModel = RuffDataModel> = T[];

type RuffDataModel = RuffHttpRecord | ScalarValue | AnyArray;

type RuffReferencesDescription = RuffHttpResource;
