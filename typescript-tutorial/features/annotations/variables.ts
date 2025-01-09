let apples = 5;

let speed:string = 'fast';

let hasName: boolean = false;
let nothingMuch: null = null;
let nothing:undefined = undefined;

// built in objects
let now:Date = new Date();

// Array
let colors: string[] = ['red', 'green', 'blue', 'yellow'];
let myNumbers: number[] = [1,2,3,4,5,6,7,8,9,10];
let truths: boolean[] = [true,false];

//Classes
class Car {

}
let car: Car = new Car();

// Object literal
let point:{x:number;y:number} = {
  x: 10,
  y:20
};

//Function type annotations
const logNumber:(i:number) => void = (i:number) =>{
    console.log(i)
}


// When to use annotations

// 1) Function that returns an 'any' type
const json = '{"x":10,"y":20}';
const coordinates:{x:number,y:number} = JSON.parse(json);
console.log(coordinates);

// 2) When we declare a variable on one line and initialize it later, Here typescript gives us a warning for foundWord
let words = ['red','green','blue'];
let foundWord:boolean = false;
for(let i = 0;i<words.length;i++)
{
    if(words[i]==="green"){
        foundWord = true;
    }
}

// 3) Variable whose type cannot be inferred correctly
//Type annotation is required in case of union types
let numbers = [-10,-1,12];
let numbersAboveZero: boolean | number   = false;
for(let i = 0;i<numbers.length;i++)
{
    if(numbers[i] > 0){
        numbersAboveZero = numbers[i];
    }
}
