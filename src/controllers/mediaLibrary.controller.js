import { isValidObjectId } from "mongoose";
import MediaLibrary from "../models/mediaLibrary.model.js";
import appError from "../utils/appError.js";
import STATUS from "../constants/httpStatus.constant.js";
import cloudinary from "../utils/cloudinary.js";
import { clearTempFile } from "../utils/clearTempFile.js";

const getMediaLibrary = async (req, res, next) => {
  const mediaLibrary = await MediaLibrary.find({
    folderTitle: { $ne: "profile_pictures" },
  });
  res.status(200).json({
    status: "success",
    data: {
      mediaLibrary,
    },
  });
};
const getFolders = async (req, res, next) => {
  const folders = await MediaLibrary.find({
    folderTitle: { $ne: "profile_pictures" },
  }).select("-files");
  res.status(200).json({
    status: "success",
    data: {
      folders,
    },
  });
};
const getFolder = async (req, res, next) => {
  const { folderId } = req.params;
  const folder = await MediaLibrary.findById(folderId);
  if (!folder) {
    return next(appError.create("Folder not found", 404, STATUS.FAIL));
  }
  res.status(200).json({
    status: "success",
    data: {
      folder,
    },
  });
};

const uploadFiles = async (req, res, next) => {
  const { media } = req.files;
  const { folderId } = req.params;
  const arrOfMedia = Array.isArray(media) ? media : [media];
  if (!isValidObjectId(folderId)) {
    const err = appError.create("Invalid folder id", 400, STATUS.FAIL);
    return next(err);
  }
  const folder = await MediaLibrary.findById(folderId);
  if (!folder) {
    const err = appError.create("Folder not found", 404, STATUS.FAIL);
    return next(err);
  }
  if (!media) {
    const err = appError.create("No files uploaded", 400, STATUS.FAIL);
    return next(err);
  }
  if (folder.folderTitle === "profile_pictures") {
    const err = appError.create(
      "You cannot upload files to this folder",
      400,
      STATUS.FAIL
    );
    return next(err);
  }
  // upload files to cloudinary
  const arrOfFilesPaths = Promise.all(
    arrOfMedia.map(async (file) => {
      const filePath = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: folder.folderTitle,
      });
      clearTempFile(file.tempFilePath);
      return { fileUrl: filePath.secure_url, publicId: filePath.public_id };
    })
  );
  // save file urls to media library on db
  folder.files.push(...(await arrOfFilesPaths));
  await folder.save();
  res.status(200).json({
    status: STATUS.SUCCESS,
    data: folder,
    message: "Files uploaded successfully",
  });
};

const createFolder = async (req, res, next) => {
  const { folderTitle } = req.body;
  const lowerFolderTitle = folderTitle?.toLowerCase()?.trim();
  if (!lowerFolderTitle) {
    const err = appError.create("Folder title is required", 400, STATUS.FAIL);
    return next(err);
  }
  const existingFolder = await MediaLibrary.findOne({
    folderTitle: lowerFolderTitle,
  });
  if (existingFolder) {
    const err = appError.create("Folder already exists", 400, STATUS.FAIL);
    return next(err);
  }
  const newFolder = await MediaLibrary.create({
    folderTitle: lowerFolderTitle,
  });
  res.status(201).json({
    status: "success",
    message: "Folder created successfully",
    data: {
      folder: newFolder,
    },
  });
};

const deleteFiles = async (req, res, next) => {
  const { folderId } = req.params;
  const { fileIds } = req.body; // array of file ids to be deleted
  if (
    !isValidObjectId(folderId) ||
    !Array.isArray(fileIds) ||
    !fileIds.every(isValidObjectId)
  ) {
    const err = appError.create(
      "Invalid folder id or file ids",
      400,
      STATUS.FAIL
    );
    return next(err);
  }
  const folder = await MediaLibrary.findById(folderId);
  if (!folder) {
    const err = appError.create("Folder not found", 404, STATUS.FAIL);
    return next(err);
  }
  // Check if files exist in folder
  const filesToDelete = folder.files.filter((file) =>
    fileIds.includes(file._id.toString())
  );
  if (filesToDelete.length === 0) {
    const err = appError.create("No files found to delete", 404, STATUS.FAIL);
    return next(err);
  }
  // Delete files from cloudinary
  await Promise.all(
    filesToDelete.map((file) => cloudinary.uploader.destroy(file.publicId))
  );
  // Remove files from folder
  folder.files = folder.files.filter(
    (file) => !fileIds.includes(file._id.toString())
  );
  await folder.save();
  res.status(204).end();
};

const deleteFolder = async (req, res, next) => {
  const { folderId } = req.params;
  if (!isValidObjectId(folderId)) {
    const err = appError.create("Invalid folder id", 400, STATUS.FAIL);
    return next(err);
  }
  const folder = await MediaLibrary.findOneAndDelete({ _id: folderId });
  if (!folder) {
    const err = appError.create("Folder not found", 404, STATUS.FAIL);
    return next(err);
  }
  if (folder.folderTitle === "profile_pictures") {
    const err = appError.create(
      "You cannot delete this folder",
      400,
      STATUS.FAIL
    );
    return next(err);
  }
  // delete all folder from cloudinary
  await cloudinary.api.delete_resources_by_prefix(folder.folderTitle + "/");
  await cloudinary.api.delete_folder(folder.folderTitle);
  res.status(204).end();
};

export {
  getMediaLibrary,
  getFolders,
  getFolder,
  uploadFiles,
  createFolder,
  deleteFiles,
  deleteFolder,
};
