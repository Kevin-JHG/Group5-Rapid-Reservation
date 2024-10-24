import { useState } from 'react'
import { Stepper, Button, Group, rem } from '@mantine/core'
import { IconCalendar, IconCircleCheck, IconReceipt, IconToolsKitchen3 } from '@tabler/icons-react'
import { useMediaQuery } from '@mantine/hooks'

import ReservationForm from './ReservationForm/ReservationForm'
import OrderForm from './OrderForm/OrderForm'

import classes from './Reservations.module.css'

export const Reservations = () => {
  const [active, setActive] = useState(0)

  const matches = useMediaQuery('(max-width: 630px)')

  const prevStep = () => setActive(current => (current > 0 ? current - 1 : current))
  const nextStep = () => setActive(current => (current < 3 ? current + 1 : current))

  const handleNextStep = () => {
    if (active === 0) {
      // TODO: validation needed
      // - All inputs required & are right type
      // - Check that reservation date / time is in the future
      // - Check that a table is available @ that time & date (DB function?)
      nextStep()
    }
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
          // TODO: don't allow step select until table is found OR "take out" is selected?
          // allowStepSelect={false}
        >
          <OrderForm />
        </Stepper.Step>
        <Stepper.Step
          label="Summary"
          description="Reservation summary"
          icon={<IconReceipt style={{ width: rem(20), height: rem(20) }} />}
        >
          Show reservation & order summary from first two steps. Use local storage so that reservation/order gets saved?
        </Stepper.Step>
        <Stepper.Completed>Reservation Confirmed! You should receive an email.</Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl" mb="xl">
        <Button variant="default" onClick={prevStep} disabled={active === 0}>
          Back
        </Button>
        <Button onClick={handleNextStep}>Next step</Button>
      </Group>
    </div>
  )
}
