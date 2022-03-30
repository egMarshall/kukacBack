import express from "express"
import { ChallengeController } from "../controller/challengeController"

export const challengeRouter = express.Router()
const challengeController = new ChallengeController()

challengeRouter.get("/palindromos", challengeController.palindromos)
challengeRouter.get("/troco-caixa", challengeController.purchaseExchange)
challengeRouter.post("/veiculos/inserir", challengeController.insertVehicle)
challengeRouter.get("/veiculos/mostrar", challengeController.getAllVehicles)
challengeRouter.get("/confere-cep", challengeController.getFiveCEPs)