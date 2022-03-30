import axios from "axios"
import { InvalidInputError } from "../error/InvalidInputError"
import { CEPIsInputDTO } from "../model/CEPs"
import { ExchangeData, ExchangeInputDTO } from "../model/Exchange"
import { PalindromesInputDTO } from "../model/Palindromes"
import { Car, Motorcycle, Vehicle, VehicleInputDTO } from "../model/Vehicle"

const ChallengeBusiness = {

    checkPalindromes: jest.fn(async (input: PalindromesInputDTO) => {

        let palindromes = new Array()
        let numLength
        let numString

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
    }),

    createVehicle: jest.fn(async(input: VehicleInputDTO) => {

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
    }),

    checkExchange: jest.fn(async(input: ExchangeInputDTO) => {

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
    }),

    getCEPs: jest.fn(async(input: CEPIsInputDTO) => {
        
        const requests = []

        if (input.ceps.length !== 5) {
            throw new InvalidInputError(`There must be 5 CEP's!`)
        }

        for (let cep of input.ceps) {
            const address = await axios(`https://viacep.com.br/ws/${cep}/json`)
            requests.push(address.data)
        }

       return requests  
    })
}

describe("Fist Exercise Test Flow", () => {
    test("Should return error when second number is lower than the first one", async() => {
        expect.assertions(2)

        const input = {
            firstNumber: 30,
            secondNumber: 10
        } as PalindromesInputDTO

        try {
            await ChallengeBusiness.checkPalindromes(input)
        } catch (error: any) {
            expect(error.message).toBe("The second number should be higher than the first one!")
            expect(error.code).toBe(422)
        }   
    })
})

describe("Second Exercise Test Flow", () => {
    test("Should return error when the Product costs more than what you have", async() => {
        expect.assertions(2)

        const input = {
            purchaseValue: 200,
            userMoney: 100
        } as ExchangeInputDTO

        try {
            await ChallengeBusiness.checkExchange(input)
        } catch (error: any) {
            expect(error.message).toBe(`You need to have more money than the product value!`)
            expect(error.code).toBe(422)
        }
    })
})

describe("Third Exercise Test Flow", () => {
    test("Should return error when the vehicle has more than 5 doors", async() => {
        expect.assertions(2)

        const input = {
            model: "Test Vehicle",
            yearOfManufacture: 2022,
            doors: 8,
            brand: "Test Enterprises",
            wheel: 6
        }

        try {
            await ChallengeBusiness.createVehicle(input)
        } catch (error: any) {
            expect(error.message).toBe(`More than 5 doors is not a valid Car!`)
            expect(error.code).toBe(422)
        }
    })

    test("Should return error when the user already have the input vehicle", async() => {
        expect.assertions(2)

        const input = {
            model: "F 850 Adventure Premium",
            yearOfManufacture: 2019,
            doors: 0,
            brand: "BMW Motorrad",
            wheel: 2
        }

        try {
            await ChallengeBusiness.createVehicle(input)
        } catch (error: any) {
            expect(error.message).toBe(`You already have this vehicle in your garage!`)
            expect(error.code).toBe(422)
        }
    })
})

describe("Fourth Exercise Test Flow", () => {
    test("Should return error when User inser other than five CEPs", async() => {
        expect.assertions(2)

        const input = {
            ceps: [90620170, 90620170]
        } as unknown as CEPIsInputDTO

        try {
            await ChallengeBusiness.getCEPs(input)
        } catch (error: any) {
            expect(error.message).toBe(`There must be 5 CEP's!`)
            expect(error.code).toBe(422)
        }
    })
})