import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    apartment: {
      type: String,
      required: [true, 'please provide details of aparment'],
    },
    comment: {
      type: String,
      required: [true, 'please provide review'],
    },

    helpful: {
      type: Number,
      default: 0,
    },
    reviewer: {
      type: mongoose.Types.ObjectId,
    },
    media: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Review', ReviewSchema);
