
import {Routes, Route} from 'react-router-dom';
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
            <h1 className="header-font">restaurant sushi fantastic</h1>
            <span className="header-font">Restoran yang menyediakan aneka makanan sushi</span>
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
        <a href="/" class="active">Makanan</a>
        <a href="/Drinks">Minuman</a>
    </div>
  )
}

export function Layout({children}) {
  return (
    <>
    <Header/>
    <Search/>
    <Categories/>
    {children}
    </>
  )
}

export function Main() {
  return(
    <>
    <Layout/>
    <Routes>
      <Route path="/" element={<Foods />}/>
      <Route path="/drinks" element={<Drinks />}/>

    </Routes>
    </>
  )
}

export function Foods() {
  return (
    <div className="list-menu">
        <div className="menu">
            <img className="img-menu" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/%E5%88%BA%E8%BA%AB%E6%8B%BC%E7%9B%A4_(3253764826).jpg/1200px-%E5%88%BA%E8%BA%AB%E6%8B%BC%E7%9B%A4_(3253764826).jpg" alt=""/>
            <div className="title-menu">
                Sashimi
            </div>
            <div className="price-menu">
                <span>Rp 50.000</span>
                <button>order</button>
            </div>
        </div>
    </div>
  );
}

export function Drinks() {
  return (
    <div className="list-menu">
        <div className="menu">
            <img className="img-menu" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/%E5%88%BA%E8%BA%AB%E6%8B%BC%E7%9B%A4_(3253764826).jpg/1200px-%E5%88%BA%E8%BA%AB%E6%8B%BC%E7%9B%A4_(3253764826).jpg" alt=""/>
            <div className="title-menu">
                Sashimi
            </div>
            <div className="price-menu">
                <span>Rp 150.000</span>
                <button>order</button>
            </div>
        </div>

        <div className="menu">
            <img className="img-menu" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/%E5%88%BA%E8%BA%AB%E6%8B%BC%E7%9B%A4_(3253764826).jpg/1200px-%E5%88%BA%E8%BA%AB%E6%8B%BC%E7%9B%A4_(3253764826).jpg" alt=""/>
            <div className="title-menu">
                Sashimi
            </div>
            <div className="price-menu">
                <span>Rp 150.000</span>
                <button>order</button>
            </div>
        </div>
    </div>
  );
}

// export default App;
// export default Header;
