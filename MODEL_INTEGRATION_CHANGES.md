# Teachable Machine Code Snippet Integration - Summary of Changes

## Overview

Successfully refactored the Smart Archaeology demo to use **Google Teachable Machine code snippets** instead of file uploads. Managers can now paste the complete export code from Teachable Machine directly into the admin panel, and the system validates and uses it automatically.

## Files Modified

### 1. **src/context/ContentContext.tsx**

✅ Added new field to `ContentState` interface:

```tsx
teachableMachineCode: string;
```

- Initialized to empty string in initial state
- Allows global state management of the model code snippet

### 2. **src/components/AdminPanel/ModelUpload.tsx**

Complete rewrite from file upload to code snippet validator:

**New Functions:**

- `extractModelUrl()`: Extracts the model URL from code snippet using regex patterns
- `validateCode()`: Validates that code contains `init()`, `predict()`, `tmImage`, and model URL

**UI Changes:**

- Replaced file drag-drop with textarea for pasting code
- Added "Save Code" and "Clear Code" buttons
- Added informational box with steps to get code from Teachable Machine
- Displays success/error/info messages in Hebrew
- Shows confirmation that model is saved and ready

**Validation Logic:**

- Checks for presence of `init()` function
- Checks for presence of `predict()` function
- Checks for `tmImage` library reference
- Extracts model URL using regex
- Provides clear error messages for missing elements

### 3. **src/pages/SmartArchaeologyPage/index.tsx**

Refactored model loading and inference:

**Model Loading:**

- Removed TensorFlow.js-based model loading
- Now loads tmImage library from CDN
- Parses Teachable Machine code snippet from context
- Extracts and validates model URL
- Executes code in isolated function scope
- Makes `init()` and `predict()` functions available globally

**Inference:**

- Updated `handleAnalyze()` to use Teachable Machine's `predict()` function
- Handles both array-based and object-based prediction formats
- Converts predictions to standardized format with class names and probabilities
- Sorts results by confidence

**Validation:**

- Checks if `teachableMachineCode` is available in context
- Provides clear error message if code hasn't been saved
- Gracefully handles missing functions

## Workflow

### For Admins

1. Go to Admin Panel → Archaeology Tab → Model Code section
2. Open Google Teachable Machine project
3. Click "Export Model" → "Tensorflow.js" tab
4. Select "Upload my Model"
5. Copy the HTML code provided
6. Paste into the textarea in admin panel
7. Click "Save Code" button
8. See confirmation: "Model loaded successfully! URL: [model-url]"

### For Users

1. Model automatically loads from saved code snippet
2. Click camera button to start camera
3. Take a photo or analyze existing image
4. Click "Analyze" button
5. Results show with confidence percentages

## Technical Details

### Code Snippet Format Expected

The component validates that code contains:

```javascript
const URL = "https://teachablemachine.withgoogle.com/models/[model-id]";
async function init() {
  /* ... */
}
async function predict(canvas) {
  /* ... */
}
// ... tmImage library usage ...
```

### Model URL Extraction

Uses two regex patterns to support different export formats:

1. `const URL = "[url]"` pattern
2. Direct Teachable Machine URL pattern

### Error Handling

- Missing `init()` function → validation error
- Missing `predict()` function → validation error
- Missing `tmImage` reference → validation error
- Invalid/missing URL → extraction error
- Invalid code → clear error message with requirements

## Benefits

✅ **No Backend Needed**: Code snippet approach doesn't require file uploads or backend storage
✅ **Simpler Setup**: Just paste export code, no complex model conversion needed
✅ **Instant Updates**: Changes to Teachable Machine model reflected immediately upon re-export
✅ **Validation Built-in**: Component validates code quality before saving
✅ **User-Friendly**: Clear instructions and feedback in Hebrew
✅ **Secure**: Code executed in isolated scope with proper error handling

## Testing Checklist

- [ ] Admin can paste valid Teachable Machine code
- [ ] Validation correctly rejects invalid code
- [ ] Model URL is correctly extracted
- [ ] SmartArchaeologyPage loads model from context
- [ ] Camera capture and analysis works with pasted model
- [ ] Clear functionality works with confirmation
- [ ] Error messages display in Hebrew
- [ ] Mobile responsiveness maintained
