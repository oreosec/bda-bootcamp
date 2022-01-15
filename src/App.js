import logo from './logo.svg';
import './App.css';
import './style.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export function Header() {
  return (
    <header className="container">
        <div className="block-container">
            <h1>restaurant sushi fantastic</h1>
            <span>Restoran yang menyediakan aneka makanan sushi</span>
        </div>
    </header>
  );
}

export function Search() {
  return (
    <form action="">
      <input type="search" name="search" id="" className="search" placeholder="Cari lebih banyak pilihan makanan"/>
    </form>
  )
}



export function Categories() {
  return (
    <div class="categories inline-display container">
        <a href="/Foods" class="active">Makanan</a>
        <a href="/Drinks">Minuman</a>
    </div>
  )
}

export function Foods() {
  return (
    <div class="list-menu container">
        <div class="menu">
            <img class="img-menu" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/%E5%88%BA%E8%BA%AB%E6%8B%BC%E7%9B%A4_(3253764826).jpg/1200px-%E5%88%BA%E8%BA%AB%E6%8B%BC%E7%9B%A4_(3253764826).jpg" alt=""/>
            <div class="title-menu">
                Sashimi
            </div>
            <div class="price-menu">
                <span>Rp 50.000</span>
                <button>order</button>
            </div>
        </div>
    </div>
  );
}

export function Drinks() {
  return (
    <div class="list-menu container">
        <div class="menu">
            <img class="img-menu" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/%E5%88%BA%E8%BA%AB%E6%8B%BC%E7%9B%A4_(3253764826).jpg/1200px-%E5%88%BA%E8%BA%AB%E6%8B%BC%E7%9B%A4_(3253764826).jpg" alt=""/>
            <div class="title-menu">
                Sashimi
            </div>
            <div class="price-menu">
                <span>Rp 50.000</span>
                <button>order</button>
            </div>
        </div>
    </div>
  );
}

// export default App;
// export default Header;
