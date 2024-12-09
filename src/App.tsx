import React, { useState } from "react";
import { Upload, Send, FileCheck, AlertCircle } from "lucide-react";

interface ApiResponse {
  status: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

function App() {
  const [industry, setIndustry] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError("");
    }
  };

  const handleSubmit = async () => {
    if (!industry) {
      setError("Please select an industry");
      return;
    }
    if (!file) {
      setError("Please upload a document");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("industry", industry);
    formData.append("document", file);

    try {
      // Replace with your actual API endpoint
      const response = await fetch("http://localhost:3000/llm", {
        method: "GET",
      });

      const data = await response.json();
      setResponse(data);
    } catch (err) {
      setError("Failed to process the document. Please try again.");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Document Processor
          </h1>

          <div className="space-y-6">
            {/* Industry Selection */}
            <div>
              <label
                htmlFor="industry"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Industry
              </label>
              <select
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              >
                <option value="">Select an industry</option>
                <option value="Banking">Banking</option>
                <option value="Insurance">Insurance</option>
                <option value="WAM">WAM</option>
              </select>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Upload
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-500 transition-colors">
                <div className="space-y-2 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {file ? file.name : "PDF, DOC up to 10MB"}
                  </p>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Process Document
                </>
              )}
            </button>

            {/* API Response */}
            {response && (
              <div className="mt-6 bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileCheck className="h-6 w-6 text-green-500" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Response
                  </h2>
                </div>
                <pre className="bg-white p-4 rounded-md overflow-auto max-h-60 text-sm">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
