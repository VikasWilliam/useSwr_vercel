import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export function useCryptoData() {
  // Fetch data with SWR
  const { data, error, isValidating } = useSWR(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false",
    fetcher,
    { refreshInterval: 10000 } // Revalidate every 10 seconds
  );

  return {
    data,
    isLoading: !error && !data,
    error,
    isValidating,
  };
}


// import useSWR from "swr";

// // Define a fetcher function
// const fetcher = (url) => fetch(url).then((res) => res.json());

// // Custom SWR hook
// export function useData() {
//   // Use SWR with revalidation every 5 seconds
//   const { data, error, isValidating } = useSWR("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd", fetcher, {
//     refreshInterval: 5000, // Revalidate every 5 seconds
//   });

//   return {
//     data,
//     isLoading: !error && !data,
//     error,
//     isValidating,
//   };
// }
