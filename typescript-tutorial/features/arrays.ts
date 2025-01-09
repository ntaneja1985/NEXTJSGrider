const carMakers : string[] = ['ford','toyota','chevy'];
const carMakers1 = [];

const dates = [new Date(), new Date()];

const carsByMake: string[][] = [
    ['f150'],
    ['camaro'],
    ['corolla']
];

//Help with inference when extracting values
const car = carMakers[0];
const myCar = carMakers.pop();

// Prevent incompatible values
//carMakers.push(100);

// Help with map,foreach, reduce
carMakers.map((car):string=>{
    return car.toUpperCase();
})

// Flexible Types
const importantDates: (Date | string)[] = [new Date,'2030-10-10'];
importantDates.push('fdfd');
importantDates.push(new Date());


