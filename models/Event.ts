import mongoose, { Schema } from "mongoose";

const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: false,
  },
  price: {
    type: String,
    required: true,
    default: "0",
  },
  city: {
    type: String,
    required: true
  }
});

EventSchema.set("collection", "Events");

const Event =
  mongoose.models.Events || (mongoose.model("Events", EventSchema) as any);

export default Event;
