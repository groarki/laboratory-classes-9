const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [1, "Title must be at least 1 character long"],
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: [1000, "Year must be at least 1000"],
      max: [
        new Date().getFullYear() + 10,
        "Year cannot be in the distant future",
      ],
      validate: {
        validator: Number.isInteger,
        message: "Year must be an integer",
      },
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: [true, "Author is required"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

bookSchema.index({ title: 1 });
bookSchema.index({ year: 1 });
bookSchema.index({ author: 1 });

module.exports = mongoose.model("Book", bookSchema);
