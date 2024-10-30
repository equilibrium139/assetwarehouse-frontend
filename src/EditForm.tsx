import { Asset } from "./types";

interface EditFormProps {
  onClose: () => void;
  assetIdx: number;
  assets: Asset[];
  setAssets;
}

function EditForm({ onClose, assetIdx, assets, setAssets }: EditFormProps) {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const assetID = assets[assetIdx].id;
    const url = process.env.REACT_APP_API_URL + "/api/assets/" + assetID;
    const response = await fetch(url, {
      credentials: "include",
      method: "PUT",
      body: formData,
    });
    if (!response.ok) {
      console.log("Error updating asset: ", response.status, response.statusText);
    } else {
      setAssets(
        assets.map((asset, idx) => {
          if (idx == assetIdx) {
            return {
              ...asset,
              name: formData.get("name"),
              description: formData.get("description"),
            };
          } else {
            return asset;
          }
        })
      );
    }
    onClose();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Asset</h2>

      <label>
        Name:
        <input type="text" name="name" defaultValue={assets[assetIdx].name} required></input>
      </label>

      <label>
        Description:
        <input type="text" name="description" defaultValue={assets[assetIdx].description} required></input>
      </label>

      <button className="submitButton" type="submit">
        Upload
      </button>
    </form>
  );
}

export default EditForm;
