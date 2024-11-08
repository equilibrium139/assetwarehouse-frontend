import { useEffect, useState } from "react";
import { User, Asset } from "./types";
import Gallery from "./Gallery";
import "./App.css";

interface ProfilePageProps {
  openModal: (children: React.ReactNode, width?: string, height?: string) => void;
  closeModal: () => void;
  user: User;
}

// CONTINUE: finish profile page
function ProfilePage({ openModal, closeModal, user }: ProfilePageProps) {
  const [userAssets, setUserAssets] = useState<Asset[]>([]);

  useEffect(() => {
    async function fetchUserAssets() {
      const response = await fetch(process.env.REACT_APP_API_URL + "/api/user/assets", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const assets = await response.json();
      setUserAssets(assets);
    }

    try {
      fetchUserAssets();
    } catch (error) {
      console.log(`Error fetching user assets: ${error}`);
    }
  }, []);

  return (
    <div>
      <h1>{user.username}</h1>
      <Gallery openModal={openModal} closeModal={closeModal} assets={userAssets} setAssets={setUserAssets} user={user}></Gallery>
    </div>
  );
}

export default ProfilePage;
