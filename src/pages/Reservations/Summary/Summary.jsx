import { useEffect, useState } from 'react'
import {
  Text,
  Title,
  Loader,
  Alert,
  Modal,
  Button,
  Group,
  Stack,
  List,
  ThemeIcon,
  CloseButton,
  Divider,
  ActionIcon,
  NumberInput,
} from '@mantine/core'
import {
  IconCalendar,
  IconClock,
  IconUsers,
  IconShoppingCart,
  IconEdit,
  IconPlus,
  IconMinus,
} from '@tabler/icons-react'
import useReservationStore from '../../../state/reservation'
import { supabase } from '../../../api/supabase'
import classes from './Summary.module.css'
import { useMantineTheme } from '@mantine/core'

const Summary = ({ setModalOpened, modalOpened, setActive }) => {
  const {
    orderType,
    reservation: { date, time, partySize },
    cart,
    updateCart,
  } = useReservationStore(state => state)

  const [menuDetails, setMenuDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantities, setQuantities] = useState({})

  useEffect(() => {
    const fetchMenuDetails = async () => {
      try {
        if (cart && cart.length > 0) {
          const { data, error } = await supabase
            .from('menu_item')
            .select('*')
            .in(
              'id',
              cart.map(item => item.id),
            )

          if (error) throw error

          setMenuDetails(data)
          const initialQuantities = {}
          cart.forEach(item => {
            initialQuantities[item.id] = item.quantity
          })
          setQuantities(initialQuantities)
        }
      } catch (error) {
        console.error('Error fetching menu details:', error)
        setError('Failed to fetch menu details. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchMenuDetails()
  }, [cart])

  const calculateTotalPrice = () => {
    return menuDetails
      ?.reduce((total, item) => {
        const cartItemQuantity = quantities[item.id] || 0
        return total + cartItemQuantity * item.price
      }, 0)
      .toFixed(2)
  }

  const handleIncrement = itemId => {
    setQuantities(prevQuantities => {
      const newQuantities = { ...prevQuantities, [itemId]: (prevQuantities[itemId] || 0) + 1 }
      updateCart(newQuantities)
      return newQuantities
    })
  }

  const handleDecrement = itemId => {
    setQuantities(prevQuantities => {
      const newQuantities = { ...prevQuantities, [itemId]: Math.max(0, (prevQuantities[itemId] || 0) - 1) }
      if (newQuantities[itemId] === 0) {
        delete newQuantities[itemId]
      }
      updateCart(newQuantities)
      return newQuantities
    })
  }
  const theme = useMantineTheme()
  const handleConfirmation = () => {
    console.log('Reservation confirmed!')
    setModalOpened(false)
  }

  return (
    <div className={classes.summaryContainer}>
      <Title order={2} mt="lg" ta="center" className={classes.title}>
        Summary
      </Title>
      <Text c="dimmed" mt="sm" ta="center" className={classes.subtitle}>
        Review and confirm your reservation.
      </Text>

      <div style={{ backgroundColor: '#dbeafe', padding: '20px', borderRadius: '8px' }}>
        <Text className={classes.orderType}>Order Type: {orderType || 'Not specified'}</Text>

        <Text className={classes.sectionTitle}>Reservation Details:</Text>
        <div>
          <Text className={classes.detailItem}>
            <IconCalendar size={16} /> Date: {date ? date.toDateString() : 'Not specified'}
          </Text>
          <Text className={classes.detailItem}>
            <IconClock size={16} /> Time: {time || 'Not specified'}
          </Text>
          <Text className={classes.detailItem}>
            <IconUsers size={16} /> Party size: {partySize || 'Not specified'}
          </Text>
        </div>

        <Text style={{ fontSize: '18px', color: theme.colors.blue[6], marginTop: '20px' }}>Cart Items:</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text style={{ color: theme.colors.red[7] }}>{error}</Text>
        ) : menuDetails && menuDetails.length > 0 ? (
          <div>
            {menuDetails
              .filter(item => quantities[item.id] > 0)
              .map(item => (
                <div key={item.id} className={classes.cartItem}>
                  <div style={{ flex: 1 }}>
                    <Text style={{ margin: 0, color: theme.colors.blue[7] }}>{item.name}</Text>
                    <Text style={{ margin: 0, color: theme.colors.gray[7] }}>{item.description}</Text>
                    <Text size="sm" style={{ color: 'gray' }}>
                      {' '}
                      {quantities[item.id] +
                        ' x ' +
                        item.price.toFixed(2) +
                        ' = ' +
                        '$' +
                        item.price.toFixed(2) * quantities[item.id]}
                    </Text>
                  </div>
                  <NumberInput
                    variant="unstyled"
                    value={quantities[item.id]}
                    leftSection={
                      <ActionIcon color="dark" onClick={() => handleDecrement(item.id)}>
                        <IconMinus />
                      </ActionIcon>
                    }
                    rightSection={
                      <ActionIcon color="dark" onClick={() => handleIncrement(item.id)}>
                        <IconPlus />
                      </ActionIcon>
                    }
                    w={100}
                    styles={{ input: { textAlign: 'center' } }}
                  />
                  <Text style={{ color: theme.colors.green[7], fontWeight: 'bold' }}>
                    ${item.price.toFixed(2) * quantities[item.id]}
                  </Text>
                </div>
              ))}
            <div className={classes.totalPrice}>Total Price: ${calculateTotalPrice()}</div>
          </div>
        ) : (
          <div className={classes.emptyCart}>
            <IconShoppingCart size={24} />
            No items in the cart.
          </div>
        )}
      </div>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        size="lg"
        padding="xl"
        radius="md"
        withCloseButton={false}
        overlayProps={{
          blur: 3,
          opacity: 0.55,
        }}
        styles={{
          header: {
            marginBottom: '1rem',
          },
          body: {
            padding: 0,
          },
        }}
      >
        <CloseButton
          onClick={() => setModalOpened(false)}
          size="lg"
          radius="xl"
          style={{
            position: 'absolute',
            right: '1rem',
            top: '1rem',
            zIndex: 1000,
          }}
        />

        <Stack spacing="xl" p="xl">
          <Title order={2} size="h2" ta="center" fw={700} style={{ color: '#343a40' }}>
            Confirm Your Reservation
          </Title>

          <Divider />

          <Stack spacing="md">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Title order={3} size="h4" fw={600} style={{ color: '#343a40' }}>
                Reservation Details
              </Title>{' '}
              <ActionIcon
                variant="subtle"
                color="blue"
                onClick={() => {
                  setActive(0)
                }}
                size="lg"
              >
                <IconEdit size={20} />
              </ActionIcon>
            </div>

            <List spacing="md" size="md" center icon={null}>
              <List.Item
                icon={
                  <ThemeIcon color="blue" size={24} radius="xl">
                    <IconCalendar size={16} />
                  </ThemeIcon>
                }
                style={{ backgroundColor: '#dbeafe', borderRadius: '8px', padding: '20px' }}
              >
                <Group position="apart">
                  <Text style={{ color: '#343a40' }}>Date: {date ? date.toDateString() : 'Not specified'}</Text>
                </Group>
              </List.Item>

              <List.Item
                icon={
                  <ThemeIcon color="blue" size={24} radius="xl">
                    <IconClock size={16} />
                  </ThemeIcon>
                }
                style={{ backgroundColor: '#dbeafe', borderRadius: '8px', padding: '20px' }}
              >
                <Group position="apart">
                  <Text style={{ color: '#343a40' }}>Time: {time || 'Not specified'}</Text>
                </Group>
              </List.Item>

              <List.Item
                icon={
                  <ThemeIcon color="blue" size={24} radius="xl">
                    <IconUsers size={16} />
                  </ThemeIcon>
                }
                style={{ backgroundColor: '#dbeafe', borderRadius: '8px', padding: '20px' }}
              >
                <Group position="apart">
                  <Text style={{ color: '#343a40' }}>Party size: {partySize || 'Not specified'}</Text>
                </Group>
              </List.Item>
            </List>

            <Divider mt="md" />

            <Stack spacing="md">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Title order={3} size="h4" fw={600} style={{ color: '#343a40' }}>
                  Order Items
                </Title>
                <ActionIcon
                  variant="subtle"
                  color="blue"
                  onClick={() => {
                    setActive(1)
                  }}
                  size="lg"
                >
                  <IconEdit size={20} />
                </ActionIcon>
              </div>
            </Stack>

            {loading ? (
              <Loader color="blue" />
            ) : error ? (
              <Alert title="Error" color="red">
                {error}
              </Alert>
            ) : menuDetails && menuDetails.length > 0 ? (
              <List spacing="md" size="md" center icon={<></>}>
                {menuDetails
                  .filter(item => quantities[item.id] > 0)
                  .map(item => (
                    <>
                      {' '}
                      <List.Item
                        key={item.id}
                        style={{ backgroundColor: '#dbeafe', borderRadius: '8px', padding: '10px 16px' }}
                      >
                        <Group position="apart" style={{ width: '100%', justifyContent: 'space-between' }}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '16px',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <img
                                src={`./menu/${item.id}.png`}
                                height={60}
                                alt="Item"
                                style={{ borderRadius: '8px' }}
                              />{' '}
                            </div>
                            <div>
                              <Text fw={500} style={{ color: '#343a40' }}>
                                {item.name}
                              </Text>
                              <Text size="sm" c="dimmed">
                                {item.description}
                              </Text>

                              <Text size="sm" style={{ color: '#343a40' }}>
                                {' '}
                                {quantities[item.id] +
                                  ' x ' +
                                  item.price.toFixed(2) +
                                  ' = ' +
                                  '$' +
                                  item.price.toFixed(2) * quantities[item.id]}
                              </Text>
                            </div>
                            <div>
                              <NumberInput
                                variant="unstyled"
                                value={quantities[item.id]}
                                leftSection={
                                  <ActionIcon color="dark" onClick={() => handleDecrement(item.id)}>
                                    <IconMinus />
                                  </ActionIcon>
                                }
                                rightSection={
                                  <ActionIcon color="dark" onClick={() => handleIncrement(item.id)}>
                                    <IconPlus />
                                  </ActionIcon>
                                }
                                w={100}
                                styles={{ input: { textAlign: 'center' } }}
                              />
                            </div>
                          </div>
                        </Group>
                      </List.Item>
                    </>
                  ))}
                <List.Item
                  style={{ backgroundColor: '#dbeafe', borderRadius: '8px', padding: '10px', marginTop: '20px' }}
                >
                  <Stack spacing="sm" style={{ width: '100%' }}>
                    <Group position="apart" style={{ width: '100%', justifyContent: 'space-between' }}>
                      <Text fw={500} style={{ color: '#343a40' }}>
                        Subtotal:
                      </Text>
                      <Text fw={500} style={{ color: '#343a40' }}>
                        ${calculateTotalPrice()}
                      </Text>
                    </Group>
                    <Group position="apart">
                      <Text fw={500} style={{ color: '#343a40' }}>
                        Estimated Tax (17%):
                      </Text>
                      <Text fw={500} style={{ color: '#343a40' }}>
                        ${(parseFloat(calculateTotalPrice()) * 0.17).toFixed(2)}
                      </Text>
                    </Group>
                    <Divider my="sm" />
                    <Group position="apart">
                      <Text fw={700} style={{ color: '#343a40', fontSize: '1.1em' }}>
                        Total:
                      </Text>
                      <Text fw={700} style={{ color: '#343a40', fontSize: '1.1em' }}>
                        ${(parseFloat(calculateTotalPrice()) * 1.17).toFixed(2)}
                      </Text>
                    </Group>
                  </Stack>
                </List.Item>
              </List>
            ) : (
              <Text c="dimmed" style={{ color: '#343a40' }}>
                No items in the cart.
              </Text>
            )}
          </Stack>

          <Divider mt="md" />

          <Button onClick={handleConfirmation} size="md" color="red">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>Place Order</span>
              <span>${(parseFloat(calculateTotalPrice()) * 1.17).toFixed(2)}</span>
            </div>
          </Button>
        </Stack>
      </Modal>
    </div>
  )
}

export default Summary
