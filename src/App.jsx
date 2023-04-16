import './App.css'
import HomePage from './HomePage'
import CollisionCenter from './CollisionCenter'
import logo from './assets/GEICO-logo.png'
import { Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <div className="topBar">
        Header
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collisioncenter" element={<CollisionCenter />} />
      </Routes>
      <div className='footer'>
        <Link to="/" className="pageswap">
          Home
        </Link>
        <Link to="/collisioncenter" className="pageswap">
          Collision Centers
        </Link>
      </div>
    </div >
  )
}

export default App;
