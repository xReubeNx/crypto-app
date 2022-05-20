import Head from "next/head";
import { useEffect, useState } from "react";
import { getCoins } from "./api/hello";
import ClipLoader from "react-spinners/ClipLoader";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [maxPages, setMaxPages] = useState([]); // array with last element being max pages
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    getAllCoins();
  }, []);

  async function getAllCoins() {
    setLoading(true);
    const { data } = await getCoins();
    if (data === "Error") {
      setError(true);
      setLoading(false);
    } else {
      setError(false);

      let arr = [];
      let pages = [];

      response.data.forEach((coin, index) => {
        if (index % 1000 === 0) {
          pages.push(index / 1000);
        }
        arr.push(coin);
      });

      setMaxPages(pages);
      setLoading(false);
      setCoins(arr);
      setFilteredCoins(arr);
    }
  }

  function filterHandler(e) {
    const filter = coins.filter(
      (coin) => coin.name.toUpperCase().includes(e.target.value.toUpperCase()) //matches case insensitive
    );
    setFilteredCoins(filter);
    setMaxPages(Array.from(Array(1 + Math.floor(filter.length / 1000)).keys()));
  }

  return (
    <div className="wrapper">
      <Head>
        <title>Crypto App</title>
      </Head>

      {loading && <p>LOADING</p>}
      <ClipLoader loading={loading} size={400} />

      <div className="pages">
        {maxPages.map((page, index) => {
          return (
            <p
              key={index}
              className={index === currentPage ? "selectedPage" : undefined}
              onClick={() => {
                setCurrentPage(index);
              }}
            >
              {page + 1}
            </p>
          );
        })}
      </div>

      <div className="input">
        {!loading && !error && (
          <input
            type="text"
            placeholder="Filter coins..."
            onChange={(e) => {
              setCurrentPage(0);
              filterHandler(e);
            }}
          />
        )}
      </div>

      <div className="coins">
        {!error &&
          coins &&
          filteredCoins
            .slice(currentPage * 1000, currentPage * 1000 + 1000) //1000 coins per page
            .map((coin, index) => {
              return (
                <div key={index} className="coins-div">
                  <p className="name">{coin.name}</p>
                  <p className="symbol">{coin.symbol}</p>
                </div>
              );
            })}
      </div>

      {!loading && (
        <div className="error">
          <p>There was an error displaying the coins, please try again.</p>
          <button
            onClick={() => {
              getAllCoins();
            }}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
