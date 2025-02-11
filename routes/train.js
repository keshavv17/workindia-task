const express = require('express');
const router = express.Router();
const { getTrainsByRoutes, createTrain } = require("../services/trainService");

