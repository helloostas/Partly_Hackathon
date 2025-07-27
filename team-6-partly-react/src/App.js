import React, { useState } from 'react';
import './style.css';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const searchVehicle = async () => {
    try {
      const response = await fetch('https://api.partly.com/api/v1/vehicles.search', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5kZXY0LnBhcnRseS5wcm8vIiwic3ViIjoiMmJiOTJjNTktMGEzYi00MTViLThiMGMtMjkwODA0YjE2ZWU0IiwiaWF0IjoxNzUzNTYwNzEwLCJleHAiOjE3NTM2NjA4MDAsImp0aSI6ImFwaWtleTo2N2NhMzI5Yy05MTdjLTQyYTctODBjNy1lNDVjMDQyYjA1NWIiLCJhdXRob3JpemF0aW9uX2RldGFpbHMiOlt7Imlzc3VlciI6Ii9hcGkvdjEvcmVwYWlyZXJzLnZlcmlmeSIsInBhcmFtZXRlcnMiOnsicmVwYWlyZXJfaWQiOiIzYjUzMGMxYi0xY2M5LTRhNWEtYjVjMC0zMWVkYWFmZTBlZTMifSwiZGV0YWlscyI6eyJvcmdhbml6YXRpb25faWQiOiIwYmUwODYwNi01YjA5LTRmZjItYjhmNC1jZDk4NTNmYWU0NjMiLCJyZXBhaXJlcl9pZCI6IjNiNTMwYzFiLTFjYzktNGE1YS1iNWMwLTMxZWRhYWZlMGVlMyIsInNpdGVfaWRzIjpbXX19LHsiaXNzdWVyIjoiL2FwaS92MS9vcmdhbml6YXRpb25zLnZlcmlmeSIsInBhcmFtZXRlcnMiOnsib3JnYW5pemF0aW9uX2lkIjoiMGJlMDg2MDYtNWIwOS00ZmYyLWI4ZjQtY2Q5ODUzZmFlNDYzIn0sImRldGFpbHMiOnsiaWQiOiIwYmUwODYwNi01YjA5LTRmZjItYjhmNC1jZDk4NTNmYWU0NjMiLCJwZXJtaXNzaW9ucyI6W3sic2NvcGUiOiJvcmdhbml6YXRpb25fYWRtaW5zIiwiZW50aXR5IjoiMGJlMDg2MDYtNWIwOS00ZmYyLWI4ZjQtY2Q5ODUzZmFlNDYzIn0seyJzY29wZSI6ImJ1c2luZXNzX2FkbWlucyJ9XX19XX0.KifouEvuucUP4UeRht2Uj_2V7LA8O9D-1JSuQSVdGTlT1k3hMjIZIxM8vZQE9l13BREjIYCidRn9Mk0pKp_IUg', // Replace with your actual key
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          registration: input
        })
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error fetching vehicle:', error);
    }
  };

  return (
    <div className="App">
      <h1>Car Chat Translator</h1>
      <input 
        type="text" 
        placeholder="Enter license plate"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={searchVehicle}>Search</button>

      {result && (
        <div className="result">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
