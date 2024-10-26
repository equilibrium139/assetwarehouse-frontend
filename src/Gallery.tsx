import { Asset, User } from "./types";
import "./App.css";

function FormatTimestampTZ(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
}

interface GalleryProps {
  onThumbnailClicked: (asset: Asset) => void;
  onEditClicked: (assetIdx: number) => void;
  assets: Asset[];
  user?: User;
}

function Gallery({
  onThumbnailClicked,
  onEditClicked,
  assets,
  user,
}: GalleryProps) {
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
              {asset.created_by === user?.id && (
                <button onClick={() => onEditClicked(idx)}>Edit</button>
              )}
              <a
                href={"http://localhost:8080/assets/models/" + asset.file_url}
                download
              >
                <button>Download</button>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Gallery;
