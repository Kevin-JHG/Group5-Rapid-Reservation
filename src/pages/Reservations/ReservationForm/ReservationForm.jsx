import { Checkbox, Divider, Fieldset, NumberInput, rem, Select, UnstyledButton, Text, Flex, Title } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { IconBuildingStore, IconCalendar, IconClock, IconPaperBag, IconUser } from '@tabler/icons-react'
import { useState } from 'react'

import classes from './ReservationForm.module.css'

const ReservationForm = () => {
  const [orderType, setOrderType] = useState('Reservation')
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(null)
  const [partySize, setPartySize] = useState(null)

  const reservationTimes = [
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM',
    '1:00 PM',
    '1:30 PM',
    '2:00 PM',
    '2:30 PM',
    '3:00 PM',
    '3:30 PM',
    '4:00 PM',
    '4:30 PM',
    '5:00 PM',
    '5:30 PM',
    '6:00 PM',
    '6:30 PM',
    '7:00 PM',
    '7:30 PM',
    '8:00 PM',
    '8:30 PM',
    '9:00 PM',
    '9:30 PM',
    '10:00 PM',
  ]

  return (
    <div className={classes.formWrapper}>
      <Title order={4} mb="sm">
        Order Type
      </Title>
      <Flex gap="lg" direction={{ base: 'column', xs: 'row' }} pt={rem(4)}>
        <UnstyledButton
          className={classes.button}
          onClick={() => setOrderType('Reservation')}
          data-checked={orderType === 'Reservation' || undefined}
        >
          <IconBuildingStore style={{ width: rem(24), height: rem(24) }} color="#404040" />
          <Checkbox
            checked={orderType === 'Reservation'}
            onChange={() => {}}
            tabIndex={-1}
            styles={{ input: { cursor: 'pointer' } }}
            ml="sm"
          />
          <div className={classes.body}>
            <Text c="dimmed" size="xs" lh={1} mb={5}>
              Make a reservation
            </Text>
            <Text fw={500} size="sm" lh={1}>
              Reservation
            </Text>
          </div>
        </UnstyledButton>

        <UnstyledButton
          className={classes.button}
          onClick={() => setOrderType('Take-out')}
          data-checked={orderType === 'Take-out' || undefined}
        >
          <IconPaperBag style={{ width: rem(24), height: rem(24) }} color="#404040" />
          <Checkbox
            checked={orderType === 'Take-out'}
            onChange={() => {}}
            tabIndex={-1}
            styles={{ input: { cursor: 'pointer' } }}
            ml="sm"
          />
          <div className={classes.body}>
            <Text c="dimmed" size="xs" lh={1} mb={5}>
              Order for take-out
            </Text>
            <Text fw={500} size="sm" lh={1}>
              Take-out
            </Text>
          </div>
        </UnstyledButton>
      </Flex>

      {orderType === 'Reservation' && (
        <>
          <Divider my="lg" />

          <Title order={4} mb="sm">
            Reservation Information
          </Title>

          <div className={classes.reservationFields}>
            <DatePickerInput
              date={date}
              onDateChange={setDate}
              label="Reservation date"
              placeholder="Select date"
              minDate={new Date()}
              leftSection={<IconCalendar style={{ width: rem(20), height: rem(20) }} />}
              className={classes.field}
              onChange={val => console.log(val)}
            />

            {/* If date is today, add min time of current time */}
            {/* Use mantine disabled options: https://mantine.dev/core/select/#disabled-options */}
            <Select
              label="Reservation time"
              placeholder="Select time"
              data={reservationTimes}
              leftSection={<IconClock style={{ width: rem(20), height: rem(20) }} />}
              className={classes.field}
            />

            <NumberInput
              label="Party size"
              placeholder="Select party size"
              min={1}
              max={10}
              leftSection={<IconUser style={{ width: rem(20), height: rem(20) }} />}
              className={classes.field}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default ReservationForm
