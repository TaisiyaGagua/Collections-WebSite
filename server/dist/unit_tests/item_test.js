"use strict";
// type MySchema = Record<
//     string,
//     "number" | "string" | "text" | "boolean" | "date"
// >;
// function createNewObject(schema: MySchema) {
//     const newData: Record<string, any> = {};
//     for (const key in schema) {
//         const dataType = schema[key];
//         let inputValue: string | null = null;
//         while (inputValue === null) {
//             inputValue = prompt(`Введите значение для ${key}:`);
//         }
//         switch (dataType) {
//             case "number":
//                 newData[key] = parseFloat(inputValue) || 0;
//                 break;
//             case "string":
//                 newData[key] = inputValue || "";
//                 break;
//             case "text":
//                 newData[key] = inputValue || "";
//                 break;
//             case "boolean":
//                 newData[key] = Boolean(inputValue);
//                 break;
//             case "date":
//                 const dateValue = new Date(inputValue);
//                 if (isNaN(dateValue.getTime())) {
//                     console.log(`Ошибка: Неверный формат даты для ${key}`);
//                     return null;
//                 }
//                 newData[key] = dateValue;
//                 break;
//             default:
//                 console.log(`Ошибка: Неизвестный тип данных для ${key}`);
//                 return null;
//         }
//     }
//     return newData as MySchema;
// }
// // сюда объект из БД в распаршенном виде 
// const userSelectedSchema: MySchema = {
//     age: "number",
//     name: "string",
//     description: "text",
//     isActive: "boolean",
//     birthdate: "date",
// };
// const newData = createNewObject(userSelectedSchema);
// console.log(newData);
//# sourceMappingURL=item_test.js.map