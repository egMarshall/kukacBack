export class ExchangeData {
    constructor(
        private purchaseValue: number,
        private purchaseExchange: number,
        private bills: number[]
    ){}

    getPurchaseValue(): number {
        return this.purchaseValue
    }

    getPurchaseExchange(): number {
        return this.purchaseExchange
    }

    getBills(): number[] {
        return this.bills
    }

    static toExchangeDataModel(purchase: any):ExchangeData {
        return new ExchangeData(
            purchase.purchaseValue,
            purchase.purchaseExchange,
            purchase.bills
        )
    }

}

export interface ExchangeInputDTO {
    purchaseValue: number,
    userMoney: number
}

