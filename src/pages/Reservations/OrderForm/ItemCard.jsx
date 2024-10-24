import { Card, Image, Group, Text, Badge, Button, ActionIcon, NumberInput, Flex } from '@mantine/core'
import classes from './ItemCard.module.css'
import PropTypes from 'prop-types'
import { IconMinus, IconPlus } from '@tabler/icons-react'

const ItemCard = ({ item, itemInCart, setCart }) => {
  const handleAddToCart = () => {
    setCart(state => [...state, { id: item.id, quantity: 1 }])
  }

  const incrementQty = () =>
    setCart(state => {
      return state.map(itm => (itm.id === itemInCart.id ? { ...itemInCart, quantity: itm.quantity + 1 } : itm))
    })

  // const findItemInCart = items =>

  const decrementQty = () =>
    setCart(state => {
      // remove item in cart before quantity hits 0
      const item = state.find(itm => itm.id === itemInCart.id)
      if (item.quantity === 1) {
        return state.filter(itm => itm.id !== itemInCart.id)
      }

      return state.map(itm => (itm.id === itemInCart.id ? { ...itemInCart, quantity: itm.quantity - 1 } : itm))
    })

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
                <ActionIcon color="dark" onClick={decrementQty}>
                  <IconMinus />
                </ActionIcon>
              }
              rightSection={
                <ActionIcon color="dark" onClick={incrementQty}>
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
