import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quality: {
      type: Number,
      default:1
    },
    desc: String,
  },
  { versionKey: false, timestamps: true }
);

productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);
