const mongoose = require("mongoose");

// Define schema with validations and default values
const roleSchema = new mongoose.Schema(
  {
    Rolename: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    }, // Field is required and trimmed
    Status: {
      type: String,
      enum: ["active", "unactive"],
      default: "active",
    }, // Default value is set
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Model creation
const Roles = mongoose.model("Roles", roleSchema);

module.exports = Roles;
