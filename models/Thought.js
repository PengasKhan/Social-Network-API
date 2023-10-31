const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      min: 1,
      max: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => date.toLocaleDateString(),
    },
    username: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      min: 15,
      max: 500,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
