import { useEffect, useState } from 'react'
import { Stepper, Button, Group, rem } from '@mantine/core'
import { IconCalendar, IconCircleCheck, IconReceipt, IconToolsKitchen3 } from '@tabler/icons-react'
import { useMediaQuery } from '@mantine/hooks'

import ReservationForm from './ReservationForm/ReservationForm'
import OrderForm from './OrderForm/OrderForm'
import Summary from './Summary/Summary'

import useReservationStore from './../../state/reservation'

import classes from './Reservations.module.css'
import { checkTableAvail } from '../../api/order'
import { DateTime } from 'luxon'

export const Reservations = () => {
  const [active, setActive] = useState(0)
  const [modalOpened, setModalOpened] = useState(false)
  const [error, setError] = useState(null)

  const matches = useMediaQuery('(max-width: 630px)')

  const reservationState = useReservationStore(state => state.reservation)
  const orderType = useReservationStore(state => state.orderType)
  const cart = useReservationStore(state => state.cart)

  const setReservation = useReservationStore(state => state.setReservation)

  // when reservation state changes, clear error message
  useEffect(() => {
    setError(null)
  }, [reservationState])

  const isReservationComplete = () => {
    // Check if all required reservation fields are filled
    return (
      orderType === 'take-out' || (reservationState.date && reservationState.time && reservationState.partySize > 0)
    )
  }

  const isOrderComplete = () => {
    // Check if at least one item is in the cart
    if (orderType === 'take-out' && cart.length === 0) {
      return false
    }

    return true
  }

  const isStepComplete = step => {
    switch (step) {
      case 0:
        return isReservationComplete()
      case 1:
        return isOrderComplete()
      default:
        return true
    }
  }

  const prevStep = () => setActive(current => (current > 0 ? current - 1 : current))
  const nextStep = () => setActive(current => (current < 3 ? current + 1 : current))

  const createReservationDateTime = () => {
    let reservationDateTime = DateTime.fromJSDate(reservationState.date)

    // add time (hours) to date time
    const [timeStr, meridiem] = reservationState.time.split(' ')
    const [hours, minutes] = timeStr.split(':')

    if (meridiem === 'PM' && hours !== '12') {
      reservationDateTime = reservationDateTime.set({ hour: Number(hours) + 12, minute: Number(minutes) })
    } else {
      reservationDateTime = reservationDateTime.set({ hour: Number(hours), minute: Number(minutes) })
    }

    return reservationDateTime
  }

  const handleNextStep = async () => {
    // check if reservation is available & create reservation if so
    if (active === 0 && !reservationState.tableId && orderType === 'reservation') {
      const reservationDateTime = createReservationDateTime()

      try {
        // check if reservation is available
        const availTableId = await checkTableAvail(reservationState.partySize, reservationDateTime)

        // if table available, set table id (for creating order & order items)
        if (availTableId) {
          setReservation({ tableId: availTableId })
        } else {
          // set error message, saying reservation isn't available
          setError('No tables available for this reservation.')
          return
        }
      } catch (error) {
        console.log(error)
        return
      }
    }

    if (isStepComplete(active)) {
      nextStep()
    }
  }

  const handleConfirmReservation = () => {
    setModalOpened(true)
    // Logic to confirm the reservation goes here
  }

  return (
    <div className={classes.pageContainer}>
      <Stepper
        active={active}
        onStepClick={setActive}
        completedIcon={<IconCircleCheck style={{ width: rem(24), height: rem(24) }} />}
        orientation={matches ? 'vertical' : 'horizontal'}
      >
        <Stepper.Step
          label="Reservation"
          description="Make a reservation"
          icon={<IconCalendar style={{ width: rem(20), height: rem(20) }} />}
        >
          <ReservationForm />
        </Stepper.Step>
        <Stepper.Step
          label="Order"
          description="Order items"
          icon={<IconToolsKitchen3 style={{ width: rem(20), height: rem(20) }} />}
        >
          <OrderForm nextStep={handleNextStep} prevStep={prevStep} isStepComplete={() => isStepComplete(active)} />
        </Stepper.Step>
        <Stepper.Step
          label="Summary"
          description="Reservation summary"
          icon={<IconReceipt style={{ width: rem(20), height: rem(20) }} />}
        >
          <Summary setModalOpened={setModalOpened} modalOpened={modalOpened} setActive={setActive} />
        </Stepper.Step>
        <Stepper.Completed>Reservation Confirmed! You should receive an email.</Stepper.Completed>
      </Stepper>

      {error && <p className={classes.error}>{error}</p>}

      <Group justify="center" mt="xl" mb="xl">
        <Button variant="default" onClick={prevStep} disabled={active === 0}>
          Back
        </Button>
        {active === 2 ? (
          <Button onClick={handleConfirmReservation}>Confirm Reservation</Button>
        ) : (
          <Button onClick={handleNextStep} disabled={!isStepComplete(active)}>
            Next step
          </Button>
        )}
      </Group>
    </div>
  )
}
