type RuffResourcePath = string[] | string;

interface RuffHttpRecord extends AnyRecord {}

type RuffBatchModels<T extends RuffDataModel = RuffDataModel> = T[];

type RuffDataModel = RuffHttpRecord | string | bool | number | null | AnyArray;

type RuffReferencesDescription = RuffHttpResource;
