import { Request, Response } from "express";
import { ChallengeBusiness } from "../business/ChallengeBusiness";
import { BaseError } from "../error/BaseError";
import { CEPIsInputDTO } from "../model/CEPs";
import { ExchangeInputDTO } from "../model/Exchange";
import { PalindromesInputDTO } from "../model/Palindromes";
import { VehicleInputDTO } from "../model/Vehicle";

export class ChallengeController {
    async palindromos(req: Request, res: Response) {
        try {
            const input: PalindromesInputDTO = {
                firstNumber: req.body.firstNumber,
                secondNumber: req.body.secondNumber
            }

            const challengeBusiness = new ChallengeBusiness()

            const response = await challengeBusiness.checkPalindromes(input)

            res.status(200).send({response})
            
        } catch (error) {
            if (error instanceof BaseError) {
                res.status(error.code).send({message: error.message})
            } else {
                res.status(500).send({message: "Unexpected error!"})
            }
        }
    }

    async purchaseExchange(req: Request, res: Response) {
        try {

            const input: ExchangeInputDTO = {
                userMoney: req.body.userMoney,
                purchaseValue: req.body.purchaseValue
            }
            const challengeBusiness = new ChallengeBusiness()

            const response = await challengeBusiness.checkExchange(input)

            res.status(200).send({response})
            
        } catch (error) {
            if (error instanceof BaseError) {
                res.status(error.code).send({message: error.message})
            } else {
                res.status(500).send({message: "Unexpected error!"})
            }
        }
    }

    async insertVehicle(req: Request, res: Response) {
        try {

            const input: VehicleInputDTO = {
                model: req.body.model,
                yearOfManufacture: req.body.yearOfManufacture,
                doors: req.body.doors,
                brand: req.body.brand,
                wheel: req.body.wheel,
            }

            const challengeBusiness = new ChallengeBusiness()
            
            await challengeBusiness.createVehicle(input)

            res.status(201).send({message: `Vehicle sucessfuly added to the garage!`})
            
        } catch (error) {
            if (error instanceof BaseError) {
                res.status(error.code).send({message: error.message})
            } else {
                res.status(500).send({message: "Unexpected error!"})
            }
        }
    }

    async getAllVehicles(req: Request, res: Response) {
        try {

            const challengeBusiness = new ChallengeBusiness()
            
            const vehicles = await challengeBusiness.getAllVehicles()

            res.status(200).send(vehicles)
            
        } catch (error) {
            if (error instanceof BaseError) {
                res.status(error.code).send({message: error.message})
            } else {
                res.status(500).send({message: "Unexpected error!"})
            }
        }
    }

    async getFiveCEPs(req: Request, res: Response) {
        try {

            const input: CEPIsInputDTO = {
                ceps: req.body.ceps
            }

            const challengeBusiness = new ChallengeBusiness()

            const response = await challengeBusiness.getCEPs(input)
  
             res.status(200).send({response})
            
        } catch (error) {
            if (error instanceof BaseError) {
                res.status(error.code).send({message: error.message})
            } else {
                res.status(500).send({message: "Unexpected error!"})
            }
        }
    }
}