import express from "express"

export const challengeRouter = express.Router()

challengeRouter.post("/palindromos")
challengeRouter.post("/troco-caixa")
challengeRouter.post("/cria-veiculos")
challengeRouter.post("/confere-cep")