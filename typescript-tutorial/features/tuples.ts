const drink = {
    color: 'brown',
    carbonated:true,
    sugar:40
};
type Drink = [string,boolean,number];

//This is an array of union types, we can easily the order of elements and it will break our data model
const pepsi = ['brown',true,40];

//This is a tuple, and it ensures order of element types is preserved
const pepsi1:Drink = ['brown',true,40];
const sprite: Drink = ['clear', false, 0];
//This cannot be done now
//pepsi1[0] = 40;


//Tuples don't convey much meaning about this, and it is difficult to understand
const carSpecs:[number,number] = [400,3354];

//Objects convey a lot of meaning about this data structure
const carStats = {
    horsepower: 400,
    weight: 3354
}