export interface VehicleInputDTO {
    model: string,
    yearOfManufacture: number,
    doors: number,
    brand: string,
    wheel: number,
}

export interface Vehicle {
    model: string,
    yearOfManufacture: number,
    doors: number,
    brand: string,
    wheel: number,
}

export class Car implements Vehicle {
    model: string;
    yearOfManufacture: number;
    doors: number;
    brand: string;
    wheel: number;

    constructor(
        model: string,
        yearOfManufacture: number,
        doors: number,
        brand: string,
        wheel: number
    ){
        this.model = model;
        this.yearOfManufacture = yearOfManufacture;
        this.doors = doors;
        this.brand = brand;
        this.wheel = wheel;
    }

    getModel(): string {
        return this.model
    }
        
    getYear(): number {
        return this.yearOfManufacture
    }

    getDoors(): number {
        return this.doors
    }

    getBrand(): string {
        return this.brand
    }

    getWheels(): number {
        return this.wheel
    }

    static toCarModel(car: any):Car {
        return new Car(
            car.model,
            car.yearOfManufacture,
            car.doors,
            car.brand,
            car.wheel
        )
    }
}

export class Motorcycle implements Vehicle {
    model: string;
    yearOfManufacture: number;
    doors: number;
    brand: string;
    wheel: number;

    constructor(
        model: string,
        yearOfManufacture: number,
        doors: number,
        brand: string,
        wheel: number,
    ){
        this.model = model;
        this.yearOfManufacture = yearOfManufacture;
        this.doors = doors;
        this.brand = brand;
        this.wheel = wheel;
    }

    getModel(): string {
        return this.model
    }
        
    getYear(): number {
        return this.yearOfManufacture
    }

    getDoors(): number {
        return this.doors
    }

    getBrand(): string {
        return this.brand
    }

    getWheels(): number {
        return this.wheel
    }

    static toMotorcycleModel(motorcycle: any):Motorcycle {
        return new Motorcycle(
            motorcycle.model,
            motorcycle.yearOfManufacture,
            motorcycle.doors,
            motorcycle.brand,
            motorcycle.wheel
        )
    }

}
