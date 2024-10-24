import { Card, Image, Group, Text, Badge, Button, ActionIcon, NumberInput } from '@mantine/core'
import PropTypes from 'prop-types'
import { IconMinus, IconPlus } from '@tabler/icons-react'

import useReservationStore from '../../../state/reservation'

import classes from './ItemCard.module.css'

const ItemCard = ({ item }) => {
  const itemInCart = useReservationStore(state => state.cart.find(({ id }) => item.id === id))
  const addCartItem = useReservationStore(state => state.addCartItem)
  const incrementQuantity = useReservationStore(state => state.incrementQuantity)
  const decrementQuantity = useReservationStore(state => state.decrementQuantity)

  const handleAddToCart = () => {
    addCartItem(item.id)
  }

  const handleIncrement = () => incrementQuantity(item.id)
  const handleDecrement = () => decrementQuantity(item.id)

  return (
    <Card key={item.id} className={`${classes.itemCard} ${itemInCart && classes.itemActive}`} shadow="sm" withBorder>
      <Card.Section>
        <Image src={`./menu/${item.id}.png`} height={200} />
      </Card.Section>

      <Group justify="space-between" align="center" mt="md" mb="sm">
        <Text fw={600} lh={1} size="lg">
          {item.name}
        </Text>
        <Badge color="dark" size="lg">
          ${item.price}
        </Badge>
      </Group>

      <Group justify="space-between">
        <Text size="sm" c="dimmed">
          {item.description}
        </Text>

        <div className={classes.cartButtonContainer}>
          <div className={classes.cartButton}>
            <Button radius="md" fullWidth onClick={handleAddToCart}>
              Add to cart
            </Button>
          </div>

          {itemInCart && (
            <NumberInput
              variant="unstyled"
              fz="xl"
              fw={600}
              value={itemInCart.quantity}
              leftSection={
                <ActionIcon color="dark" onClick={handleDecrement}>
                  <IconMinus />
                </ActionIcon>
              }
              rightSection={
                <ActionIcon color="dark" onClick={handleIncrement}>
                  <IconPlus />
                </ActionIcon>
              }
              w={100}
              styles={{ input: { textAlign: 'center' } }}
            />
          )}
        </div>
      </Group>
    </Card>
  )
}

ItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
  }),
  itemInCart: PropTypes.shape({
    id: PropTypes.number,
    quantity: PropTypes.number,
  }),
  setCart: PropTypes.func,
}

export default ItemCard
