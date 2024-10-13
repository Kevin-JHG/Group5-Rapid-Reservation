import { useCallback, useEffect, useState, useRef } from 'react'
import { supabase } from '../../api/supabase'
import './menu.css'
import Demo from './Cards'
import { MantineProvider } from '@mantine/core'

export const Menu = () => {
  const [menuItems, setMenuItems] = useState([])
  const [activeTab, setActiveTab] = useState(0)
  const tabs = ['Appetizer', 'Dessert', 'Entree', 'Alcohol', 'Beverage']
  const sectionRefs = useRef([])
  const [restaurantName, setRestaurantName] = useState('')

  const scrollToSection = index => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' })
    setActiveTab(index)
  }

  const fetchData = useCallback(async () => {
    try {
      const { data, error } = await supabase.from('menu_item').select('*')

      if (error) throw error
      setMenuItems(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex(ref => ref === entry.target)
            if (index !== -1) {
              setActiveTab(index)
            }
          }
        })
      },
      { threshold: 0.5 },
    )

    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref)
    })

    return () => {
      sectionRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  const filteredItems = type => menuItems.filter(item => item.type.toLowerCase() === type.toLowerCase())

  return (
    <div className="container">
      {menuItems.length > 0 ? (
        <>
          <input
            type="text"
            value={restaurantName}
            onChange={e => setRestaurantName(e.target.value)}
            placeholder="Enter Restaurant Name"
            className="restaurant-input"
          />
          <div className="tabs">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`tab ${activeTab === index ? 'active' : ''}`}
                onClick={() => scrollToSection(index)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="menu-sections">
            {tabs.map((tab, index) => (
              <div key={index} ref={el => (sectionRefs.current[index] = el)} className="menu-section">
                <h2>{tab}</h2>
                <div className="menu-items-grid">
                  {filteredItems(tab).map(item => (
                    <MantineProvider key={item.id}>
                      <Demo name={item.name} description={item.description} price={item.price} id={item.id} />
                    </MantineProvider>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  )
}
