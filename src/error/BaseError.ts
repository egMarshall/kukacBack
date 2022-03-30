export abstract class BaseError extends Error {
    constructor(
        public message: string,
        public code: number
        ){
            super(message)
        }
}