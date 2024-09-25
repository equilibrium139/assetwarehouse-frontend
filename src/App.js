import logo from "./images/shitty_logo.webp";
import './App.css'

function Header() {
  return (
    <header>
      <div>
        <img className="logo" src={logo} alt="Logo"></img>
      </div>

      <div>
        <select>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
          <option>Option 4</option>
        </select>
      </div>

      <div>
        <button>Sign In</button>
        <button>Register</button>
      </div>
    </header>
  );
}

function ThumbnailGrid() {
  return (
    <div className="gridContainer">
      {sampleItems.map((item, idx) => {
       return ( 
       <div className="gridItem">
          <img className="thumbnail" src={item.thumbnail} alt={item.title}/>

          <div>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        </div> )
      })}
    </div>
  )
}

const sampleItems = [
  {
    thumbnail: "thumbnail1.jpg",
    title: "Asset 1",
    description: "Description of Asset 1",
  },
  {
    thumbnail: "thumbnail2.jpg",
    title: "Asset 2",
    description: "Description of Asset 2",
  },
  {
    thumbnail: "thumbnail3.jfif",
    title: "Asset 3",
    description: "Description of Asset 3",
  },
  {
    thumbnail: "thumbnail4.jfif",
    title: "Asset 4",
    description: "Description of Asset 4",
  },
  {
    thumbnail: "thumbnail4.jfif",
    title: "Asset 4",
    description: "Description of Asset 4",
  },
  {
    thumbnail: "thumbnail4.jfif",
    title: "Asset 4",
    description: "Description of Asset 4",
  },
  {
    thumbnail: "thumbnail4.jfif",
    title: "Asset 4",
    description: "Description of Asset 4",
  },
  {
    thumbnail: "thumbnail4.jfif",
    title: "Asset 4",
    description: "Description of Asset 4",
  },
  {
    thumbnail: "thumbnail4.jfif",
    title: "Asset 4",
    description: "Description of Asset 4",
  },
  {
    thumbnail: "thumbnail4.jfif",
    title: "Asset 4",
    description: "Description of Asset 4",
  },
  {
    thumbnail: "thumbnail4.jfif",
    title: "Asset 4",
    description: "Description of Asset 4",
  },
  {
    thumbnail: "thumbnail4.jfif",
    title: "Asset 4",
    description: "Description of Asset 4",
  },
];

function App() {
  return (
    <div>
      <Header />
      <ThumbnailGrid />
    </div>
  );
}

export default App;
