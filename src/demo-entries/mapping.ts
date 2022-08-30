import { readonly, defineMapping, constant } from "@ruff-web/data-mapping";

const data = {
  key: "1",
  name: "Mike",
  age: 32,
  phone: "18612345678",
  add: "10 Downing Street",
  hobbies: ["Dancing", "Singing", "Reading", "Surfing"],
};
type _Data = typeof data;

const dataview = defineMapping<{
  name: string;
}>(
  {
    id: "key",
    name: readonly<_Data>("name"),
    fullname: ({ name }: _Data) => name + " Smith",
    age: "age",
    yearOfBirth: {
      get(data: _Data) {
        return 2022 - data.age;
      },
      set(year: number, data: _Data) {
        if (year > 2022) {
          data.age = 0;
        } else {
          data.age = 2022 - year;
        }
      },
    },
    phone: {
      get(data: _Data) {
        return "+86" + data.phone;
      },
      set(phone: string, data: _Data) {
        data.phone = phone;
      },
    },
    address: "add",
    hobbies: ({ hobbies }: _Data) => hobbies?.join(", ") || "",
    remark: constant("这个人很懒"),
  },
  data
);

console.log(dataview);
console.log(dataview.id);
console.log(dataview.name);
console.log(dataview.fullname);
console.log(dataview.age);
console.log(dataview.yearOfBirth);
console.log(dataview.phone);
console.log(dataview.address);
console.log(dataview.hobbies);
console.log(dataview.remark);

data.name = "Michael";
dataview.yearOfBirth = 1997;

console.log(dataview.fullname);
console.log(dataview.age);
console.log(dataview.yearOfBirth);
console.log(data);

dataview.updateTarget({
  add: "11 Downing Street",
  hobbies: ["Dancing", "Singing", "Reading"],
});

dataview.updateTarget("phone", "15987654321");

console.log(dataview.phone);
console.log(dataview.address);
console.log(dataview.hobbies);

dataview.phone = "13666668888";

console.log(data.phone);
