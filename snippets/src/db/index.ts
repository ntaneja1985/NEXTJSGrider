import {PrismaClient} from "@prisma/client";

//Will be used to perform CRUD operations
export const db = new PrismaClient();
// db.snippet.create({
//     data:{
//         title:'Title!',
//         code: 'const abc = () => {}'
//     }
// })