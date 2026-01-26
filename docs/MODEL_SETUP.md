# Teachable Machine Model Directory

This directory is where you should place your Teachable Machine model files for the Smart Archaeology demo.

## Setup Instructions

1. **Train a Model** (Free):
   - Visit [Google Teachable Machine](https://teachablemachine.withgoogle.com/)
   - Create a new "Image Project"
   - Add classes for different archaeological periods (Bronze Age, Iron Age, Roman, etc.)
   - Upload 20-30+ artifact images for each period to train the model

2. **Export the Model**:
   - Click "Export" button
   - Select "TensorFlow.js" format
   - Download the model files

3. **Add Files to This Directory**:
   - Extract the downloaded files
   - Copy these files to this folder:
     - `model.json` - The model architecture and metadata
     - `weights.bin` - The neural network weights (may have multiple .bin files)
4. **Verify Setup**:
   - Ensure `model.json` is directly in this folder (not in a subdirectory)
   - The weight files should be in the same directory as `model.json`
   - Restart your development server: `npm run dev`

## File Structure Example

    ```public/tm_model/
    ├── model.json
    ├── weights.bin
    └── weights.bin (if multiple weight files)
    ```

## Testing the Model

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:5173/fll_group/archaeology`
3. You should see "✓ המודל טעון ויצור לשימוש" (Model loaded and ready)
4. Upload an artifact image and click "נתח ממצא" (Analyze Artifact)

## Troubleshooting

- **Model won't load**: Check that `model.json` exists in this directory and has valid content
- **CORS errors**: Make sure files are served from the public folder
- **Predictions are wrong**: The model may need more training data or the classes may need adjustment
- **File not found errors**: Verify the exact filenames match what Teachable Machine exported

## Model Performance Tips

1. **Data Quality**: Use clear, well-lit photos of artifacts
2. **Class Balance**: Try to have similar number of images for each period
3. **Diversity**: Include various angles, lighting conditions, and artifact sizes
4. **Labeling**: Be consistent with class names (Hebrew names are fine for display)

## Resources

- [Google Teachable Machine Docs](https://teachablemachine.withgoogle.com/faq)
- [TensorFlow.js Documentation](https://www.tensorflow.org/js)
- [GovMap - Israeli Data Repository](https://mapping.gov.il/)

---

**Model File Size Note**: Typical Teachable Machine models are 5-20MB. Keep this in mind for web deployment.
