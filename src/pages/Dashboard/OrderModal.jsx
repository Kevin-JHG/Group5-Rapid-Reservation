import { Button, Modal, Select, Title } from '@mantine/core'
import { DateTime } from 'luxon'

import classes from './OrderModal.module.css'

const OrderModal = ({ opened, close, order }) => {
  const handleStatusChange = value => {
    // TODO: update status in supabase here
    console.log(value)
  }

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={order ? <p className={classes.modalTitle}>Order #{order.id}</p> : 'Unknown Order'}
      centered
    >
      {order && (
        <>
          <Title order={4}>Modify Order</Title>
          <Select
            label="Status"
            defaultValue={order.status}
            data={['received', 'preparing', 'ready']}
            onChange={handleStatusChange}
          />
          <Button color="red" mt="md">
            Delete Order
          </Button>

          <h4 className={classes.sectionHeading}>Order Details</h4>

          <div className={classes.orderDetailsContainer}>
            <p>
              <span className={classes.orderKey}>ID: </span>
              <span className={classes.orderValue}>{order.id}</span>
            </p>
            <p>
              <span className={classes.orderKey}>Customer: </span>
              <span className={classes.orderValue}>
                {order.profile.first_name} {order.profile.last_name}
              </span>
            </p>
            <p>
              <span className={classes.orderKey}>Order Type: </span>
              <span className={classes.orderValue}>{order.type}</span>
            </p>
            <p>
              <span className={classes.orderKey}>Date: </span>
              <span className={classes.orderValue}>
                {DateTime.fromISO(order.date).toLocaleString(DateTime.DATETIME_MED)}
              </span>
            </p>
            <p>
              <span className={classes.orderKey}>Status: </span>
              <span className={classes.orderValue}>{order.status}</span>
            </p>
            <p>
              <span className={classes.orderKey}>Table ID: </span>
              <span className={classes.orderValue}>{order.table_id}</span>
            </p>
            <p>
              <span className={classes.orderKey}>Total: </span>
              <span className={classes.orderValue}>${order.total}</span>
            </p>
          </div>

          <h4 className={classes.sectionHeading}>Order Items</h4>
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
