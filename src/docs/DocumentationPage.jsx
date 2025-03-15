import React, { useState } from 'react';

function DocumentationPage() {
    const [expandedExample, setExpandedExample] = useState(null);

    const toggleExample = (exampleName) => {
        setExpandedExample(expandedExample === exampleName ? null : exampleName);
    };

    return (
        <div className="container-fluid documentation-container">

        
            <div className="row hero-section justify-content-center align-items-center">
                <div className="col-md-8 text-center">
                    <h1 className="display-4">IntelliVibe AI API Documentation</h1>
                    <p className="lead">Access the power of our AI chatbot with our easy-to-use API.</p>
                

                    <a href="/" className="btn btn-primary btn-lg mt-3">
                        Get Your API Key
                    </a>

                </div>
            </div>

            
            <div className="row api-key-section justify-content-center">
                <div className="col-md-10">
                    <h2 className="section-title">Understanding API Keys</h2>
                    <p>
                        An API key is a unique identifier that authenticates requests to our AI service.  It's essential
                        for tracking usage, preventing abuse, and ensuring the security of our platform.  You need to include
                        your API key in every request.
                    </p>
                    <p>
                    <code>License and Usage:</code> This API is provided under a non-commercial license. You may use this API for personal projects, academic research, and non-profit initiatives. Commercial use, including but not limited to, resale, integration into commercial products, or use for profit generation, is strictly prohibited. We reserve the right to revoke access for any user found in violation of these terms.buse, and ensuring the security of our platform.You need to include your API key in every request.
                    </p>
                  
                </div>
            </div>

            <div className="row request-structure-section justify-content-center">
                <div className="col-md-10">
                    <h2 className="section-title">Making Requests</h2>
                    <p>
                        To interact with the IntelliVibe AI, send a <code>POST</code> request to the following URL:
                    </p>
                    <pre className="url-display">
                        <code>https://intellivibe-ai.onrender.com/intellivibe/chat/ai_access?api_key=YOUR_API_KEY</code>
                    </pre>
                    <p>
                        Replace <code>YOUR_API_KEY</code> with your actual API key.
                    </p>
                    <p>
                        The request body should be a JSON object with a <code>chat</code> parameter containing your question.
                    </p>
                    <div className="json-example">
                        <pre>
                            <code>
                                {`{
  "chat": "Your question to the AI here"
}`}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>

            <div className="row code-examples-section justify-content-center">
                <div className="col-md-10">
                    <h2 className="section-title">Code Examples</h2>

<div className="code-example">
    <button
        className={`btn btn-outline-light expand-button ${expandedExample === 'js' ? 'active' : ''}`}
        onClick={() => toggleExample('js')}
    >
        JavaScript (Fetch API)  {expandedExample === 'js' ? '▲' : '▼'}
    </button>
    <div className={`code-block ${expandedExample === 'js' ? 'expanded' : ''}`}>
        <pre>
            <code>
                {`const apiKey = 'YOUR_API_KEY'; // Replace with your API key
const url = 'https://intellivibe-ai.onrender.com/intellivibe/chat/ai_access?api_key=' + apiKey;

const data = {
  "chat": "What is the capital of France?"
};

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.status);
    }
    return response.json();
})
.then(data => {
  console.log(data); // Handle the AI's response here
})
.catch(error => {
  console.error('Error:', error);
});`}
            </code>
        </pre>
    </div>
</div>


                    <div className="code-example">
    <button
        className={`btn btn-outline-light expand-button ${expandedExample === 'python' ? 'active' : ''}`}
        onClick={() => toggleExample('python')}
    >
        Python (requests library)  {expandedExample === 'python' ? '▲' : '▼'}
    </button>
    <div className={`code-block ${expandedExample === 'python' ? 'expanded' : ''}`}>
        <pre>
            <code>
                {`import requests

apiKey = 'YOUR_API_KEY'  # Replace with your API key
url = 'https://intellivibe-ai.onrender.com/intellivibe/chat/ai_access?api_key=' + apiKey

data = {
  "chat": "What is the capital of France?"
}

response = requests.post(url, json=data)

if response.status_code == 200:
    print(response.json())  # Handle the AI's response here
else:
    print(f"Error: {response.status_code} - {response.text}")`}
            </code>
        </pre>
    </div>
</div>

                    <div className="code-example">
                        <button
                            className={`btn btn-outline-light expand-button ${expandedExample === 'curl' ? 'active' : ''}`}
                            onClick={() => toggleExample('curl')}
                        >
                            cURL  {expandedExample === 'curl' ? '▲' : '▼'}
                        </button>
                        <div className={`code-block ${expandedExample === 'curl' ? 'expanded' : ''}`}>
                            <pre>
                                <code>
                                    {`curl -X POST \\
  'https://intellivibe-ai.onrender.com/intellivibe/chat/ai_access?api_key=YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "chat": "What is the capital of France?"
  }'`}
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>

             <div className="row error-handling-section justify-content-center">
                <div className="col-md-10">
                    <h2 className="section-title">Error Handling</h2>
                    <p>
                        The API may return various error codes in case of issues. Here are some common ones:
                    </p>
                    <ul>
                        <li><strong>400 Bad Request:</strong>  The request body is invalid or missing required parameters.</li>
                        <li><strong>401 Unauthorized:</strong>  Your API key is invalid or missing.</li>
                        <li><strong>429 Too Many Requests:</strong> You have exceeded your rate limit.</li>
                        <li><strong>500 Internal Server Error:</strong>  An unexpected error occurred on the server.</li>
                    </ul>
                     <p>Check the response body for specific details error massage get it and parse them this massage always clear and help you to fix the issue.</p>
                </div>
            </div>

            <div className="row rate-limiting-section justify-content-center">
                <div className="col-md-10">
                    <h2 className="section-title">Rate Limiting</h2>
                    <p>
                        To ensure fair usage and prevent abuse, our API is rate-limited.  You are currently allowed
                        to make  <b>10</b> requests per <b>Second</b> (e.g., 600 requests per minute).  If you exceed this limit,
                        you will receive a <code>429 Too Many Requests</code> error.
                    </p>

                </div>
            </div>

            <div className="row support-section justify-content-center">
                <div className="col-md-10">
                    <h2 className="section-title">Support</h2>
                    <p>
                        If you encounter any issues or have questions, please contact us at <a
                            href="mailto:support@intellivibe-ai.com">support@Intellivibe.com</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default DocumentationPage;
