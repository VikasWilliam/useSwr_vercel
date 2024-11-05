import React, { useState } from "react";
import { useCryptoData } from "./hooks/useCryptoData";
import "./App.css";

function App() {
  const { data, isLoading, error, isValidating } = useCryptoData();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  // Handle search
  const filteredData = data?.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  // Handle sort
  const sortedData = filteredData?.sort((a, b) =>
    sortOrder === "asc" ? a.market_cap - b.market_cap : b.market_cap - a.market_cap
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="app">
      <h1>Cryptocurrency Dashboard</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search cryptocurrency..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Sort Button */}
      <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
        Sort by Market Cap ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>

      {/* Display Data */}
      <table>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Price (USD)</th>
            <th>Indian Rupee ₹</th>
            <th>Market Cap</th>
            <th>24h Change (%)</th>
          </tr>
        </thead>
        <tbody>
          {sortedData?.map((coin) => (
            <tr key={coin.id}>
              <td>
                <img src={coin.image} alt={coin.name} width={25} /> {coin.name}
              </td>
              <td>${coin.current_price.toLocaleString()}</td>
              <td>{(coin.current_price * 84).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
              <td>${coin.market_cap.toLocaleString()}</td>
              <td style={{ color: coin.price_change_percentage_24h > 0 ? "green" : "red" }}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Refresh Indicator */}
      <p style={{ fontStyle: "italic", color: "grey" }}>
        {isValidating ? "Refreshing data..." : "Data is up-to-date"}
      </p>
    </div>
  );
}

export default App;


// import React from "react";
// import { useData } from "./hooks/useCryptoData";

// function App() {
//   const { data, isLoading, error, isValidating } = useData();

//   console.log("data==>", data)

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading data</div>;

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Data from API</h1>
//       <p><strong>BITCOIN</strong></p>
//       <p><strong>USD: ${data?.bitcoin?.usd}</strong> {data.message}</p>
//       <p style={{ fontStyle: "italic", color: "grey" }}>
//         {isValidating ? "Refreshing data..." : "Data is up-to-date"}
//       </p>
//     </div>
//   );
// }

// export default App;
