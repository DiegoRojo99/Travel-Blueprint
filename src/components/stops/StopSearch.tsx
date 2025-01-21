import { GoogleSearchResult, StopSearchProps } from "@/types/search";
import { Stop } from "@/types/trip";
import { getAuth } from "firebase/auth";
import React, { useState } from "react";

const StopSearch: React.FC<StopSearchProps> = ({ onStopAdded }) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<GoogleSearchResult[]>([]);
  const auth = getAuth();

  const handleSearch = async () => {
    try {
      const user = auth.currentUser;
      if (user) {

        const res = await fetch(`/api/stops/search?query=${query}`, {
          headers: { 'x-user-id': user.uid },
        });
        if (!res.ok) throw new Error("Failed to fetch search results");  

        console.log("Response: ", res);
        const data: GoogleSearchResult[] = await res.json();
        console.log("Data: ", data);
        setResults(data);
      }
      else {
        alert("You must be logged in to search for stops.");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    }
  };

  function formatGoogleResult(result: GoogleSearchResult): Stop {
    return {
      name: result.name,
      location: result.location,
      type: "Landmark",
      date: new Date().toISOString(),
      notes: "",
    };
  }


  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for stops..."
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map((result) => (
          <li key={result.id}>
            <div>
              <strong>{result.name}</strong>
              <p>{result.address}</p>
              <button onClick={() => onStopAdded(formatGoogleResult(result))}>Add Stop</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StopSearch;
