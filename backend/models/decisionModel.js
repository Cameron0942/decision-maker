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
  }
});

const decision = model("decisions", decisionSchema);
export default decision;