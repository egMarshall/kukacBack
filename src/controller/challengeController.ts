import { Request, Response } from "express";
import { ChallengeBusiness } from "../business/ChallengeBusiness";
import { PalindromesInputDTO } from "../model/Palindromes";

export class ChallengeController {
    async palindromos(req: Request, res: Response) {
        try {
            const input: PalindromesInputDTO = {
                firstNumber: req.body.firstNumber,
                secondNumber: req.body.secondNumber
            }

            const challengeBusiness = new ChallengeBusiness()

            const response = await challengeBusiness.checkPalindromes(input)

            res.status(200).send(response)
            
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send({message: error.message})
            } else {
                res.status(500).send({message: "Unexpected error!"})
            }
        }
    }
}