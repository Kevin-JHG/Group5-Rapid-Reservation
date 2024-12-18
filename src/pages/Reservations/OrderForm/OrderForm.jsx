import { useEffect, useState } from 'react'
import { Title, Text, Divider, Loader, Group, Button } from '@mantine/core'

import ItemCard from './ItemCard'
import { supabase } from '../../../api/supabase'

import classes from './OrderForm.module.css'

const OrderForm = ({ nextStep, prevStep, isStepComplete }) => {
  const [menuItems, setMenuItems] = useState(null)

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
      <Title order={2} mt="lg" ta="center">
        Order menu items
      </Title>
      <Text c="dimmed" mt="sm" ta="center">
        Select the items you&apos;d like to order, they&apos;ll be ready when you arive!
      </Text>

      <Group justify="center" mt="xl" mb="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep} disabled={!isStepComplete()}>
          Next step
        </Button>
      </Group>

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
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderForm
