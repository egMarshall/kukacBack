import express from "express"
import { ChallengeController } from "../controller/challengeController"

export const challengeRouter = express.Router()
const challengeController = new ChallengeController()

challengeRouter.post("/palindromos", challengeController.palindromos)
challengeRouter.post("/troco-caixa", challengeController.purchaseExchange)
challengeRouter.post("/veiculos/inserir", challengeController.insertVehicle)
challengeRouter.get("/veiculos/mostrar", challengeController.getAllVehicles)
challengeRouter.post("/confere-cep", challengeController.getFiveCEPs)