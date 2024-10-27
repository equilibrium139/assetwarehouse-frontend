import { useState, useEffect } from "react";
import { Asset, User } from "./types";
import Gallery from "./Gallery";
import "./App.css";

interface HomePageProps {
  openModal: (children: React.ReactNode, width?: string, height?: string) => void;
  closeModal: () => void;
  user: User | undefined;
}

function HomePage({ openModal, closeModal, user }: HomePageProps) {
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    async function loadPopularAssets() {
      const response = await fetch("http://localhost:8080/api/assets/popular/10");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const assets = await response.json();
      setAssets(assets);
    }
    loadPopularAssets();
  }, []);

  return <div>{assets && <Gallery openModal={openModal} closeModal={closeModal} assets={assets} setAssets={setAssets} user={user} />}</div>;
}

export default HomePage;
