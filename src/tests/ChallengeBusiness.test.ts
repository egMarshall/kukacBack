import axios from "axios"
import { InvalidInputError } from "../error/InvalidInputError"
import { CEPIsInputDTO } from "../model/CEPs"
import { ExchangeData, ExchangeInputDTO } from "../model/Exchange"
import { PalindromesInputDTO } from "../model/Palindromes"

const ChallengeBusiness = {
    checkPalindromes: jest.fn(async (input: PalindromesInputDTO) => {
        let palindromes = new Array()
        let numLength
        let numString
    
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