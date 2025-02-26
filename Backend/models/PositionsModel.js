const mongoose = require("mongoose");
const PositionsSchema = require("../schemas/PositionsSchema"); // Import schema

const PositionsModel = mongoose.models.Positions || mongoose.model("Positions", PositionsSchema);

module.exports = { PositionsModel };
