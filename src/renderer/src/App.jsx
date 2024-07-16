import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import Welcome from './components/Welcome/Welcome'
import SignIn from './components/Welcome/SignIn'
import Dashboard from './components/Dashboard/Dashboard'
import MyMinimies from './components/Dashboard/MyMinimies'
import ExploreMore from './components/Dashboard/ExploreMore'

function App() {
  return (
    <Router>
      <div className="px-7 pt-5 h-auto">
        <Header />
        <div className="mt-20">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="myminimies" element={<MyMinimies />} />
              <Route path="explore" element={<ExploreMore />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
