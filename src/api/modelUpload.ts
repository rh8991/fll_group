/**
 * Model Upload API Handler
 *
 * Note: This is a client-side Vite app. For production model uploads,
 * you would need a backend server. This file demonstrates the expected endpoint.
 *
 * For development, users should:
 * 1. Download model.json and weight files from Google Teachable Machine
 * 2. Create /public/tm_model/ folder if it doesn't exist
 * 3. Place the files directly in that folder
 *
 * Once deployed with a backend server, this endpoint would handle:
 * - POST /api/upload-model
 * - Accept multipart/form-data with model files
 * - Save to /public/tm_model/
 */

export interface UploadModelRequest {
  files: File[];
}

export interface UploadModelResponse {
  success: boolean;
  message: string;
  uploadedFiles?: string[];
}
