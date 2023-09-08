import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

const decisionSchema = new Schema({
  title: {
    type: String,
    default: null,
    required: true,
  },
  decisions: {
    type: [String],
    default: null,
    required: true,
  },
  guid: {
    type: String,
    default: null,
    required: true,
  },
  finalDecision: {
    type: String,
    default: null,
  },
  colorScheme: {
    type: Number,
    default: 0
  },
  createdAt : {
    type: Date,
  }
});

const decision = model("decision", decisionSchema, "decision-maker-collection");
export default decision;