import { useState, useEffect } from "react";
import { Asset, User } from "./types";
import Gallery from "./Gallery";
import "./App.css";
import { useLocation } from "react-router-dom";

interface SearchPageProps {
  openModal: (children: React.ReactNode, width?: string, height?: string) => void;
  closeModal: () => void;
  user: User | undefined;
}

function SearchPage({ openModal, closeModal, user }: SearchPageProps) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    async function loadSearchResults() {
      const response = await fetch(`http://localhost:8080/api/search?query=${query}`);
      if (!response.ok) {
        console.log(`HTTP error! Status: ${response.status}`);
      } else {
        const assets = await response.json();
        setAssets(assets);
      }
    }
    loadSearchResults();
  }, [query]);

  return <div>{assets && <Gallery openModal={openModal} closeModal={closeModal} assets={assets} setAssets={setAssets} user={user} />}</div>;
}

export default SearchPage;
