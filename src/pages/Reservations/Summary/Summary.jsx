import { Text, Title } from '@mantine/core'

import useReservationStore from '../../../state/reservation'

import classes from './Summary.module.css'

// NOTE: if nothing is showing, input data from the first two steps
const Summary = () => {
  const {
    orderType,
    reservation: { date, time, partySize },
    cart,
  } = useReservationStore(state => state)

  return (
    <div>
      <Title order={2} mt="lg" ta="center">
        Summary
      </Title>
      <Text c="dimmed" mt="sm" ta="center">
        Review and confirm your reservation.
      </Text>

      <div className={classes.summaryWrapper}>
        <p>Order type: {orderType}</p>
        <p>Reservation Details:</p>
        <ul>
          {/* Date will be a date object, the docs are below*/}
          {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date */}
          {date && <li>Date: {date.toDateString()}</li>}
          {time && <li>Time: {time}</li>}
          {partySize && <li>Party size: {partySize}</li>}
        </ul>
        <p>Cart items:</p>
        {cart && (
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                ID: {item.id}, Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Summary
