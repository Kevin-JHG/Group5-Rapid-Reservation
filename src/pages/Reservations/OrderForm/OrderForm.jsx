import { useEffect, useState } from 'react'
import { supabase } from '../../../api/supabase'
import { Title, Text, Divider, Loader } from '@mantine/core'

import classes from './OrderForm.module.css'
import ItemCard from './ItemCard'

// Order Items: List items & allow user to pick quantities of them. Show subtotal, tax, and total cost.
const OrderForm = () => {
  // TODO: make this global state so only fetched once
  const [menuItems, setMenuItems] = useState(null)

  // TODO: remove sample data
  const [cart, setCart] = useState([
    { id: 20, quantity: 2 },
    { id: 2, quantity: 3 },
  ])

  const itemTypes = ['Appetizer', 'Beverage', 'Entree', 'Alcohol', 'Dessert']

  useEffect(() => {
    const selectMenuItems = async () => {
      try {
        const { data, error } = await supabase.from('menu_item').select('*')

        if (error) throw error

        setMenuItems(itemTypes.map(type => ({ type, items: data.filter(itm => itm.type === type.toLowerCase()) })))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    selectMenuItems()
  }, [])

  return (
    <div>
      {/* 
        Cards of menu items: Image, price, add to cart button
        - Separate into secitons based on category
        - When item added, highlight border & replace add to cart button with quantity - <qty> + buttons

        Order summary (list of items & quantities)

        IF ORDER IS TAKE-OUT: user must have at least one item in cart
      */}

      <Title order={2} mt="lg" ta="center">
        Order menu items
      </Title>
      <Text c="dimmed" mt="sm" ta="center">
        Select the items you&apos;d like to order, they&apos;ll be ready when you arive!
      </Text>

      {!menuItems && (
        <div className={classes.loaderContainer}>
          <Loader />
        </div>
      )}

      {menuItems?.map(itemCategory => (
        <div key={itemCategory.type}>
          <Title order={3} mt="xl">
            {itemCategory.type}
          </Title>

          <Divider mt="sm" mb="lg" />

          <div className={classes.itemsGrid}>
            {itemCategory?.items.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                itemInCart={cart.find(({ id }) => item.id === id)}
                cart={cart}
                setCart={setCart}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderForm
