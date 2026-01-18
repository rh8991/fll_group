import { useState } from 'react'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import AdminPanel from '@/components/AdminPanel/AdminPanel'
import Hero from './sections/Hero'
import CoreValues from './sections/CoreValues'
import About from './sections/About'
import Gallery from './sections/Gallery'
import Team from './sections/Team'
import Project from './sections/Project'
import GameStrategy from './sections/GameStrategy'
import RobotDesign from './sections/RobotDesign'
import styles from './HomePage.module.css'

const HomePage = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false)

  return (
    <div className={styles.page}>
      <Header />
      <main>
        <Hero />
        <CoreValues />
        <About />
        <Gallery />
        <Team />
        <Project />
        <GameStrategy />
        <RobotDesign />
      </main>
      <Footer onAdminClick={() => setIsAdminOpen(true)} showAdminButton />
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  )
}

export default HomePage
