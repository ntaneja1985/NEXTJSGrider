interface Vehicle {
   name: string;
   year: Date;
   broken: boolean;
   summary(): string;
}

interface Reportable {
    summary():string;
}

const drink = {
    color:'brown',
    carbonated: true,
    sugar: 40,
    summary(): string {
        return `My drink has sugar of ${this.sugar} grams`;
    }
}

const oldCivic:Vehicle = {
    name: "civic",
    year: new Date(),
    broken:true,
    summary(): string {
        return `${this.name} is ${this.year} broken: ${this.broken}`
    }
};

const printVehicle = (vehicle:Vehicle):void => {
    console.log(vehicle.summary())
}

const printReport=(item:Reportable):void => {
    console.log(item.summary());
}

//Valid since both old civic and drink objects have summary functions
//Note these are 2 different objects
//Encourages us to write generic looking interfaces
printReport(oldCivic);
printReport(drink);

printVehicle(oldCivic);