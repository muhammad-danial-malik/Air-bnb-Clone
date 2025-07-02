import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Room from "../models/room.model.js";

export const addRoom = asyncHandler(async (req, res) => {
  const roomImagesLocalPaths = req.files?.map((file) => file.path);

  if (roomImagesLocalPaths.length === 0) {
    throw new ApiError(400, "At least one room image is required");
  }

  const roomImages = await Promise.all(
    roomImagesLocalPaths.map((path) => uploadOnCloudinary(path))
  );

  // const roomImages = [];

  // for (let i = 0; i < roomImagesLocalPaths.length; i++) {
  //   const imagePath = await uploadOnCloudinary(roomImagesLocalPaths[i]);
  //   roomImages.push(imagePath);
  // }

  if (!roomImages || roomImages.length === 0) {
    throw new ApiError(400, "Failed to upload room images on Cloudinary");
  }

  const {
    name,
    type,
    city,
    cityMapUrl,
    price,
    guests,
    bedrooms,
    beds,
    bathrooms,
  } = req.body;

  const imageData = roomImages.map((img) => ({
    url: img.secure_url,
    public_id: img.public_id,
  }));

  const newRoom = await Room.create({
    name,
    type,
    city,
    cityMapUrl,
    price,
    guests,
    bedrooms,
    beds,
    bathrooms,
    images: imageData,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Room added successfully", newRoom));
});

export const getAllRooms = asyncHandler(async (req, res) => {
  const rooms = await Room.find();

  const message =
    rooms.length === 0 ? "No rooms found" : "Rooms fetched successfully";

  return res.status(200).json(new ApiResponse(200, message, rooms));
});

export const getRoom = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    throw new ApiError(404, "No Room Found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Room fetched Successfully", room));
});

export const deleteRoom = asyncHandler(async (req, res) => {
  const room = await Room.findByIdAndDelete(req.params.id);

  if (!room) {
    throw new ApiError(404, "no room found ");
  }

  await Promise.all(
    room.images.map((img) => deleteFromCloudinary(img.public_id))
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Room deleted successfully", room));
});

export const categoriesByCity = asyncHandler(async (req, res) => {
  const rooms = await Room.find();

  const roomsByCity = {};

  rooms.forEach((room) => {
    const city = room.city || "others";

    if (!roomsByCity[city]) {
      roomsByCity[city] = [];
    }

    roomsByCity[city].push(room);
  });

  // const roomsByCity = rooms.reduce((acc, room) => {
  //     const city = room.city || 'others';
  //     if (!acc[city]) {
  //       acc[city] = [];
  //     }
  //     acc[city].push(room);
  //     return acc;
  //   }, {});

  return res
    .status(200)
    .json(new ApiResponse(200, "Rooms grouped by city.", roomsByCity));
});
