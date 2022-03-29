import { InvalidInputError } from "../error/InvalidInputError";
import { ExchangeData, ExchangeInputDTO } from "../model/Exchange";
import { PalindromesInputDTO } from "../model/Palindromes";

export class ChallengeBusiness {

  async checkPalindromes(input: PalindromesInputDTO) {
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
    }

    async checkExchange(input: ExchangeInputDTO) {
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

}