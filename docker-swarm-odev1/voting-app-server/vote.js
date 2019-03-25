const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VoteSchema = new Schema(
  {
    vote: {
        type: String,
        enum : ['iOS','Android']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vote", VoteSchema);
