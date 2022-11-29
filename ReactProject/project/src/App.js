
import React from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Home, Contact, Header, Services, About, Footer } from "./Components"

const App = () => {
  return (
    <BrowserRouter >
      {/* URL-Independed Components -Means It doesn't matter URL kiya he? Ye To Render Hoga Hee Hoga..! */}
      <Header />


      <main className='container m-auto'>

        <Routes>

          {/* URL-Depended Components -Means Ye Components "/example" Par Depend karty hen */}
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/Services' element={<Services />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App