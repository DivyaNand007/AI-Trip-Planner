import { useState } from 'react'
import {Button} from './components/ui/button.jsx'
import './App.css'
import Hero from './components/custom/Hero.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='gap-10'>
        <Hero  />
        {/* <Button className='mb-10 mt-3'>Suscribe</Button> */}
         <Footer />

      </div>
      
    </>
    
  )
}

export default App
