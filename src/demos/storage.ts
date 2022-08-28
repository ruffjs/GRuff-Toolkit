import { allocateStorage } from "@ruff-web/data-storage";


const storage = allocateStorage('testStorage', {
    strings: ['str', 'string', 'text'],
    numbers: ['num', 'number', 'integer', 'float'],
    booleans: ['bool', 'boolean'],
    others: ['obj', 'struct']
})

storage.write('str', 'str')
storage.write('text', 'text')
storage.write('float', 3.14)
storage.write('integer', '2014' as unknown as number)
storage.write('bool', true)
storage.write('boolean', 'FALSE')
storage.write('struct', {
    foo: 'bar'
})

console.log(storage.read('text'))
console.log(storage.read('integer'))
console.log(storage.read('boolean'))
console.log(storage.read<AnyRecord>('struct'))

storage.delete('text')

console.log(storage.bool)

const myBucket = storage.createBucket<{
    data1: Object
}>('bucket')

myBucket.data1 = { type: 'test-data', value: 2022 }
console.log(myBucket.data1)