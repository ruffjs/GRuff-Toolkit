interface IStorage {
  write: (key: string, data: any) => void
  read: <T = any>(key: string) => T
  delete: (key: string) => void
  clear: () => void
  createBucket: (namespace: string) => AnyRecord
}
