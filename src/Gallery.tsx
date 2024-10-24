import { Asset } from "./types";
import "./App.css";

function FormatTimestampTZ(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
}

interface GalleryProps {
  onThumbnailClicked: (asset: Asset) => void;
  assets: Asset[];
}

function Gallery({ onThumbnailClicked, assets }: GalleryProps) {
  return (
    <div className="gridContainer">
      {assets.map((asset, idx) => {
        return (
          <div className="gridItem" key={asset.id}>
            <img
              onClick={() => onThumbnailClicked(asset)}
              className="thumbnail"
              src={
                "http://localhost:8080/assets/thumbnails/" + asset.thumbnail_url
              }
              alt={asset.name}
            />
            <div>
              <h4>{asset.name}</h4>
              <p>{asset.description}</p>
              <p>{asset.username}</p>
              <p>Views: {asset.views}</p>
              <p>Downloads: {asset.downloads}</p>
              <p>Created {FormatTimestampTZ(asset.created_at)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Gallery;
