import { useCallback, useEffect, useState, useRef } from 'react'
import { supabase } from '../../api/supabase'
import MenuCard from './MenuCard'
import { MantineProvider } from '@mantine/core'

import classes from './Menu.module.css'

export const Menu = () => {
  const [menuItems, setMenuItems] = useState([])
  const [activeTab, setActiveTab] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const tabs = ['Appetizer', 'Dessert', 'Entree', 'Alcohol', 'Beverage']
  const sectionRefs = useRef([])

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

  const filteredItems = useCallback(
    type =>
      menuItems.filter(
        item =>
          item.type.toLowerCase() === type.toLowerCase() && item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [menuItems, searchQuery],
  )

  return (
    <div className={classes.container}>
    <div className={classes.searchBar}>
        <input
          type="text"
          placeholder="Search menu items..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className={classes.searchInput}
        />
      </div>
      {menuItems.length > 0 ? (
        <>
          <div className={classes.tabs}>
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`${classes.tab} ${activeTab === index && classes.active}`}
                onClick={() => scrollToSection(index)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div>
            {tabs.map((tab, index) => (
              <div key={index} ref={el => (sectionRefs.current[index] = el)}>
                <h2>{tab}</h2>
                <div className={classes.menuItemsGrid}>
                {filteredItems(tab).length > 0 ? (
                  filteredItems(tab).map(item => (
                    <MantineProvider key={item.id}>
                      <MenuCard name={item.name} description={item.description} price={item.price} id={item.id} />
                    </MantineProvider>
                  ))
                ) : (
                  <p>No items found.</p>
                )}
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
