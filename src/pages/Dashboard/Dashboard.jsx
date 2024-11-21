import { useEffect, useState } from 'react'
import { supabase } from '../../api/supabase'
import { Select, Table, Title } from '@mantine/core'
import { DateTime } from 'luxon'
import { useDisclosure } from '@mantine/hooks'

import OrderModal from './OrderModal'

import classes from './Dashboard.module.css'

export const Dashboard = () => {
  const [orders, setOrders] = useState([])
  const [modalOrderId, setModalOrderId] = useState(null)
  const [opened, { open, close }] = useDisclosure(false)

  // derived state for order modal
  const modalOrder = modalOrderId && orders.length !== 0 ? orders.find(order => order.id === modalOrderId) : null

  useEffect(() => {
    const getOrders = async () => {
      const { data, error } = await supabase.from('order').select(`
          *,
          table (
            seats
          ),
          profile (
            first_name,
            last_name
          ),
          order_items:order_item (
            menu_item_id,
            quantity,
            menu_item!inner(name, type, price)
          )
        `)

      if (error) console.log(error)

      // add total price to data
      const modifiedData = data.map(order => {
        if (order.order_items.length === 0) return { ...order, total: (0).toFixed(2) }

        const totalPrice = order.order_items.reduce((acc, curr) => {
          return acc + curr.menu_item.price * curr.quantity
        }, 0)

        return { ...order, total: totalPrice.toFixed(2) }
      })

      console.log(modifiedData)
      setOrders(modifiedData)
    }

    getOrders()
  }, [])

  if (orders.length === 0) return <div>Loading...</div>

  const handleOrderClick = id => {
    setModalOrderId(id)
    open()
  }

  const rows = orders.map(order => (
    <Table.Tr key={order.id} onClick={() => handleOrderClick(order.id)}>
      <Table.Td>{order.id}</Table.Td>
      <Table.Td>
        {order.profile.first_name} {order.profile.last_name}
      </Table.Td>
      <Table.Td>{DateTime.fromISO(order.date).toLocaleString(DateTime.DATETIME_MED)}</Table.Td>
      <Table.Td>{order.status}</Table.Td>
      <Table.Td>{order.type}</Table.Td>
      <Table.Td>${order.total}</Table.Td>
    </Table.Tr>
  ))

  return (
    <div className={classes.pageContainer}>
      <Title order={2} mt="lg" ta="center">
        Dashboard
      </Title>

      <div style={{ width: 'fit-content' }}>
        <Select label="Filter orders" defaultValue="All" data={['All', 'Dine-in', 'Take-out', 'Acitve']} />
      </div>

      <Table mt="lg">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Customer</Table.Th>
            <Table.Th>Date & Time</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Reservation Type</Table.Th>
            <Table.Th>Order Total</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      {/* TODO: paginate? */}
      <OrderModal opened={opened} close={close} order={modalOrder} />
    </div>
  )
}
