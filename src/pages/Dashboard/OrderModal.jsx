import { Modal, Select } from '@mantine/core'
import { DateTime } from 'luxon'

const OrderModal = ({ opened, close, order }) => {
  const handleStatusChange = value => {
    // TODO: update status in supabase here
    console.log(value)
  }

  return (
    <Modal opened={opened} onClose={close} title={'Order #' + order.id} centered>
      {order && (
        <>
          <Select
            label="Status"
            defaultValue={order.status}
            data={['received', 'preparing', 'ready']}
            onChange={handleStatusChange}
          />

          <h3>Order Details</h3>
          <p>ID: {order.id}</p>
          {/* TODO: uncomment this when roles fixed */}
          {/* <p> */}
          {/*   Customer: {order.profile.first_name} {order.profile.last_name} */}
          {/* </p> */}
          <p>Date: {DateTime.fromISO(order.date).toLocaleString(DateTime.DATETIME_MED)}</p>
          <p>Status: {order.status}</p>
          <p>Table ID: {order.table_id}</p>
          <p>Total: ${order.total}</p>
          <p>Type: {order.type}</p>
          <h3>Order Items</h3>
          {order.order_items.length === 0 ? (
            <p>No order items</p>
          ) : (
            order.order_items.map(item => (
              <div key={item.menu_item_id}>
                <p>{item.menu_item.name}</p>
                {/* <p>{item.menu_item.type}</p> */}
                <p>Unit price: ${item.menu_item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <hr />
              </div>
            ))
          )}
        </>
      )}
    </Modal>
  )
}

export default OrderModal
