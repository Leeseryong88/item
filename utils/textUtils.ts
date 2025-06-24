
// Parses a JSON string that might be wrapped in markdown code fences (```json ... ```)
export function parseGeminiJsonResponse<T,>(jsonString: string): T | null {
  if (!jsonString || typeof jsonString !== 'string') {
    console.error("Invalid input: jsonString must be a non-empty string.");
    return null;
  }

  let cleanedJsonString = jsonString.trim();

  // Regex to detect and extract content from markdown code fences for JSON
  // It handles optional language specifier (e.g., ```json) and varying newlines
  const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
  const match = cleanedJsonString.match(fenceRegex);

  if (match && match[2]) {
    cleanedJsonString = match[2].trim(); // Extracted content from the fence
  }

  try {
    const parsedData = JSON.parse(cleanedJsonString);
    return parsedData as T;
  } catch (error) {
    console.error("Failed to parse JSON string:", error);
    console.error("Original string (cleaned):", cleanedJsonString);
    console.error("Original string (raw):", jsonString);
    return null;
  }
}
