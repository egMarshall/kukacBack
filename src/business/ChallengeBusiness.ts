import axios from "axios"
import { InvalidInputError } from "../error/InvalidInputError"
import { CEPIsInputDTO } from "../model/CEPs"
import { ExchangeData, ExchangeInputDTO } from "../model/Exchange"
import { PalindromesInputDTO } from "../model/Palindromes"
import { Car, Motorcycle, Vehicle, VehicleInputDTO } from "../model/Vehicle"


export class ChallengeBusiness {

    async checkPalindromes(input: PalindromesInputDTO):Promise<number[]> {
    
        let palindromes = new Array()
        let numLength
        let numString

        console.log(`firstNumber:`, input.firstNumber)
        console.log(`secondNumber:`, input.secondNumber)

        if (input.firstNumber > input.secondNumber) {
            throw new InvalidInputError(`The second number should be higher than the first one!`)
        }

            for (let number = input.firstNumber; number <= input.secondNumber; number++) {
                numString = number.toString()
                numLength = numString.length

                if (numLength > 1) {
                    if (number == parseInt(numString.split('').reverse().join(''))) {
                        palindromes.push(number)
                    }
                }
            }
            return palindromes
    }

    async checkExchange(input: ExchangeInputDTO):Promise<ExchangeData> {

        let count = new Array()

        let value = input.userMoney - input.purchaseValue

        if (value < 1) {
            throw new InvalidInputError(`You need to have more money than the product value!`)
        }

        let count1Bills = value%10
        let count10Bills = ((value%100) - count1Bills)/10
        let count100Bills = (value - (count1Bills + count10Bills * 10))/100 

        count.push(count1Bills, count10Bills, count100Bills)

        const response = ExchangeData.toExchangeDataModel({
            purchaseValue: input.purchaseValue,
            purchaseExchange: value,
            bills: count
        })

        return response
    }

    async createVehicle(input: VehicleInputDTO):Promise<void> {
        const fs = require('fs')

        const finished = (err: any) => { 
            if (err) { 
              console.log(err); 
            } 
        }

        if(input.doors > 5) {
            throw new InvalidInputError(`More than 5 doors is not a valid Car!`)
        }

        let data = fs.readFileSync('./src/data/vehicles.json')
        let vehicles: Vehicle[] = JSON.parse(data)

        for (let vehicle of vehicles) {
            if (vehicle.model === input.model && 
                vehicle.yearOfManufacture === input.yearOfManufacture) {
                    throw new InvalidInputError(`You already have this vehicle in your garage!`)
            }
        }

        if (input.doors !== 0) {
            const vehicle = Car.toCarModel({
                model: input.model,
                yearOfManufacture: input.yearOfManufacture,
                doors: input.doors,
                brand: input.brand,
                wheel: input.wheel
            })
            let data = JSON.stringify(vehicle, null , 2)
            fs.appendFile('./src/data/vehicles.json', `\,${data}`, finished)

        } else {
            const vehicle = Motorcycle.toMotorcycleModel({
                model: input.model,
                yearOfManufacture: input.yearOfManufacture,
                doors: 0,
                brand: input.brand,
                wheel: input.wheel,
            })
            vehicles.push(vehicle)
            let data= JSON.stringify(vehicles, null, 2)
            fs.writeFile('./src/data/vehicles.json',data, finished)
        }
    }

    async getAllVehicles() {
        const fs = require('fs')
        let data = fs.readFileSync('./src/data/vehicles.json')
        let vehicles = JSON.parse(data)

        return vehicles
    }

    async getCEPs(input: CEPIsInputDTO):Promise<Object[]> {

        const requests = []

        if (input.ceps.length !== 5) {
            throw new InvalidInputError(`There must be 5 CEP's!`)
        }

        for (let cep of input.ceps) {
            const address = await axios(`https://viacep.com.br/ws/${cep}/json`)
            requests.push(address.data)
        }

       return requests
    }    

}