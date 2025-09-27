import mongoose from "mongoose";

const mediaLibrarySchema = new mongoose.Schema({
    folderTitle: {
        type: String,
        required: true
    },
    files: [{
        fileUrl: { type: String, required: true },
        publicId:{ type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }],
    __v: {
        type: Number,
        select: false
    }
}, { timestamps: true });

const MediaLibrary = mongoose.model("MediaLibrary", mediaLibrarySchema);

export default MediaLibrary;
