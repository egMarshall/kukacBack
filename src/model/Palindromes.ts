export class PalindromeResponse {
    constructor(
        private numbers: number[]
    ){}

    getNumbers():number[] {
        return this.numbers
    }
}

export interface PalindromesInputDTO {
    firstNumber: number,
    secondNumber: number
}