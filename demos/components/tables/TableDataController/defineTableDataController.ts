import { reactive, ref } from "vue";
import defineTableDataSource, {
  BatchQueryPool,
} from "../TableWithDataPool/defineTableDataSource";

export interface PaginationConfig {
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  size?: number;
  pageSizeOptions?: string[];
}
export interface DefineTableDataControllerOptions<
  T extends RuffHttpResource,
  F = AnyRecord
> {
  dataPool: BatchQueryPool<T>;
  queries?: F;
  pageConf?: PaginationConfig;
}

export default function defineTableDataController<
  T extends RuffHttpResource,
  F = AnyRecord
>(options: DefineTableDataControllerOptions<T, F>) {
  const { dataPool, pageConf } = options;
  const queries = (options.queries || {}) as F;
  const updating = ref(true);
  const { dataSource, updateData: updateDataSource } = defineTableDataSource({
    dataPool,
  });
  const filterForm = reactive<Partial<F> & RuffPageableResourcesQueryModel>({
    sort: undefined,
    order: undefined,
    pageIndex: 1,
    pageSize: 10,
    ...queries,
  });
  const pagination = reactive({
    showSizeChanger:
      typeof pageConf?.showSizeChanger === "boolean"
        ? pageConf.showSizeChanger
        : true,
    showQuickJumper:
      typeof pageConf?.showQuickJumper === "boolean"
        ? pageConf.showSizeChanger
        : true,
    current:
      typeof filterForm.pageIndex === "number" ? filterForm.pageIndex : 1,
    pageSize:
      typeof filterForm.pageSize === "number" ? filterForm.pageSize : 10,
    pageSizeOptions:
      typeof pageConf?.pageSizeOptions === "object"
        ? pageConf.pageSizeOptions
        : ["10", "20", "30", "40"],
    total: 0,
  });

  const updateData = async () => {
    updating.value = true;
    await updateDataSource(filterForm);
    pagination.total = dataPool.total;
    updating.value = false;
  };

  const handlePageChange = (current: number) => {
    (filterForm as RuffPageableResourcesQueryModel).pageIndex = current;
    pagination.current = current;
    updateData();
  };

  const handlePageSizeChange = (current: number, pageSize: number) => {
    (filterForm as RuffPageableResourcesQueryModel).pageIndex = current;
    (filterForm as RuffPageableResourcesQueryModel).pageSize = pageSize;
    pagination.current = current;
    pagination.pageSize = pageSize;
    updateData();
  };

  return {
    dataSource,
    pagination,
    updateData,
    handlePageChange,
    handlePageSizeChange,
  };
}
