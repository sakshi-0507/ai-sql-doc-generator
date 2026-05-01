import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [schema, setSchema] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateDocs = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/generate-doc", {
        schema
      });
      setResult(res.data.result);
    } catch (err) {
      setResult("Error generating documentation");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>AI SQL Documentation Generator</h1>
        <p className="subtitle">
          Convert raw SQL schema into clean documentation instantly
        </p>

        <textarea
          placeholder="Paste your SQL schema here..."
          value={schema}
          onChange={(e) => setSchema(e.target.value)}
        />

        <button onClick={generateDocs} disabled={loading}>
          {loading ? "Generating..." : "Generate Documentation"}
        </button>
      </div>

      <div className="output-card">
        <h2>Generated Output</h2>
        <pre>{result || "Your documentation will appear here..."}</pre>
      </div>
    </div>
  );
}

export default App;