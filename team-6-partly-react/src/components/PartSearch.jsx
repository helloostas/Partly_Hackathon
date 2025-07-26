import { useState, useEffect } from 'react';
import { fetchWorldTree } from './apiService';
import { partsSynonyms } from './partsSynonyms';

export default function PartSearch() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [partsTree, setPartsTree] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);

  useEffect(() => {
    // Load parts tree on component mount
    fetchWorldTree().then(data => setPartsTree(data));
  }, []);

  const handleSearch = (searchTerm) => {
    // Check synonyms first
    const synonymMatch = partsSynonyms[searchTerm.toLowerCase()];
    if (synonymMatch) {
      setSelectedPart(synonymMatch);
      return;
    }

    // Search in parts tree
    const matches = partsTree.filter(part => 
      part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSuggestions(matches);
  };

  return (
    <div className="part-search">
      <h2>Auto Parts Clarity Engine</h2>
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a part (e.g., 'fender')"
      />
      <button onClick={() => handleSearch(query)}>Search</button>
      
      {suggestions.length > 0 && !selectedPart && (
        <div className="suggestions">
          <h3>Did you mean:</h3>
          <ul>
            {suggestions.map((part) => (
              <li key={part.id} onClick={() => setSelectedPart(part)}>
                {part.name} (ID: {part.id})
                {part.description && <p>{part.description}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {selectedPart && (
        <div className="part-details">
          <h3>Standard Part Identified</h3>
          <p><strong>Name:</strong> {selectedPart.standard || selectedPart.name}</p>
          <p><strong>GHCA ID:</strong> {selectedPart.id}</p>
          <button onClick={() => setSelectedPart(null)}>Search Again</button>
        </div>
      )}
    </div>
  );
}