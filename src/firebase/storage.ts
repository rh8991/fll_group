import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";
import { storage } from "./config";

/**
 * Upload an image to Firebase Storage
 * @param file - The image file to upload
 * @param folder - The folder path (e.g., "gallery", "team")
 * @returns The download URL of the uploaded image
 */
export const uploadImage = async (
  file: File,
  folder: string = "images",
): Promise<string> => {
  try {
    // Create a unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `${folder}/${filename}`);

    // Upload the file
    console.log(`Uploading ${filename} to ${folder}...`);
    const snapshot = await uploadBytes(storageRef, file);
    console.log("Upload successful!");

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("Download URL:", downloadURL);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

/**
 * Delete an image from Firebase Storage
 * @param imageUrl - The full URL of the image to delete
 */
export const deleteImage = async (imageUrl: string): Promise<void> => {
  try {
    // Extract the path from the URL
    const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.app.options.storageBucket}/o/`;
    const imagePath = imageUrl.replace(baseUrl, "").split("?")[0];
    const decodedPath = decodeURIComponent(imagePath);

    const imageRef = ref(storage, decodedPath);
    await deleteObject(imageRef);
    console.log("Image deleted successfully");
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

/**
 * Get all images from a folder
 * @param folder - The folder path to list images from
 * @returns Array of download URLs
 */
export const listImages = async (
  folder: string = "images",
): Promise<string[]> => {
  try {
    const folderRef = ref(storage, folder);
    const result = await listAll(folderRef);

    const urls = await Promise.all(
      result.items.map((itemRef) => getDownloadURL(itemRef)),
    );

    return urls;
  } catch (error) {
    console.error("Error listing images:", error);
    throw error;
  }
};
