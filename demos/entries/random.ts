import { createRandom, RandomInstance } from "@ruff-web/data-random";

const random = createRandom()
console.log(random);

console.log(random.province());

console.log(random.range(1, 10, 2));
console.log(random.character());
console.log(random.echo("String"));

console.log(random.color('red'));
console.log(random.hex());
console.log(random.rgb());
console.log(random.rgba());
console.log(random.hsl());

console.log(random._datePattern)
console.log(random.now());
console.log(random.now('h'));
console.log(random.datetime());
console.log(random.time());

console.log(random.image(300, "#ff0000", "#ffff00", "Hello,Ruff"));
console.log(random.dataImage("100x20", "Hello,Ruff"));


console.log(random.uuid());
console.log(random.id());
console.log(random.inc(), random.inc(), random.inc(2), random.inc(), random.inc());
const increment = random._genIncrement(1024)
const keys = random.repeat(() => increment(2), 10)
console.log(keys, random.pick(keys), random.pick(keys), random.pick(keys))

console.log(random.name());
console.log(random.name(true));
console.log(random.cname(), random.cname());

console.log(random.word());
console.log(random.cword(5));
console.log(random.paragraph());
console.log(random.cparagraph());

console.log(random.domain());
console.log(random.email());

const random2 = random.extends({
    userLevel(this: RandomInstance) {
        const arr = ["Admin", "Member", "Operator"];
        return this.pick(arr);
    },
})
console.log(random2.userLevel())


// console.log(
//     Mock.mock({
//         data: {
//             ["content|3"]: [
//                 {
//                     "id|+1": 1024,
//                     name: tmpls.基站名称,
//                     alertType: tmpls.告警类型,
//                     createdAt: tmpls.日期时间,
//                     level: "@alertLevel",
//                     regionalLevel: "@province @city @county",
//                     state: "@alertState",
//                     type: "@deviceType",
//                     results: "@cword(5, 10)",
//                 },
//             ],
//             totalCount: 25,
//         },
//         status: 200,
//         message: "OK",
//     })
// );