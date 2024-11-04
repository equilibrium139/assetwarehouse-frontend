import { Asset, User } from "./types";
import "./App.css";
import AssetViewer from "./AssetViewer";
import EditForm from "./EditForm";

function FormatTimestampTZ(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
}

interface GalleryProps {
  openModal: (children: React.ReactNode, width?: string, height?: string) => void;
  closeModal: () => void;
  assets: Asset[];
  setAssets: (assets: Asset[]) => void;
  user?: User;
}

function Gallery({ openModal, closeModal, assets, setAssets, user }: GalleryProps) {
  function handleThumbnailClicked(assetClicked: Asset) {
    openModal(<AssetViewer asset={assetClicked} />, "800px", "600px");
  }

  function handleEditClicked(assetClickedIdx: number) {
    openModal(<EditForm onClose={closeModal} assetIdx={assetClickedIdx} assets={assets!} setAssets={setAssets} />, "600px", "400px");
  }

  return (
    <div className="gridContainer">
      {assets.map((asset, idx) => {
        return (
          <div className="gridItem" key={asset.id}>
            <img
              onClick={() => handleThumbnailClicked(asset)}
              className="thumbnail"
              src={process.env.REACT_APP_SPACES_URL + "/thumbnails/" + asset.created_by + "/" + asset.thumbnail_url}
              alt={asset.name}
            />
            <div>
              <h4>{asset.name}</h4>
              <p>{asset.description}</p>
              <p>{asset.username}</p>
              <p>Views: {asset.views}</p>
              <p>Downloads: {asset.downloads}</p>
              <p>Created {FormatTimestampTZ(asset.created_at)}</p>
              {asset.created_by === user?.id && <button onClick={() => handleEditClicked(idx)}>Edit</button>}
              <a href={process.env.REACT_APP_SPACES_URL + "/assets/" + asset.created_by + "/" + asset.file_url} download>
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
