import { MappingLike } from "@ruff-web/http/src/helpers/DataPool";
import { tryLikeGo } from "@ruff-web/utils/src/async";
import { Ref, ref } from "vue";

export interface BatchQueryPool<T extends RuffHttpResource> {
  read(query: RuffHttpQueryModel): Promise<MappingLike<T>[]>;
}

export interface DefineTableDataSourceOptions<T extends RuffHttpResource> {
  dataPool: BatchQueryPool<T>;
}
export default function defineTableDataSource<T extends RuffHttpResource>({
  dataPool,
}: DefineTableDataSourceOptions<T>) {
  const dataSource = ref<T[]>([]) as Ref<T[]>;

  const updateData = async (query?: RuffHttpQueryModel) => {
    const [data, err] = await tryLikeGo(dataPool.read(query || {}));
    if (err) {
      console.error("update table data error:", err);
    }
    dataSource.value = data || [];
  };
  return { dataSource, updateData };
}
