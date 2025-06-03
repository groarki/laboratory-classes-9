const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [1, "First name must be at least 1 character long"],
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [1, "Last name must be at least 1 character long"],
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

authorSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

authorSchema.index({ firstName: 1, lastName: 1 });

module.exports = mongoose.model("Author", authorSchema);
