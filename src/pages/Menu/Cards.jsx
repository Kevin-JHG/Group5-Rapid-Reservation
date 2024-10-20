import { Card, Image, Group } from '@mantine/core'

function Demo({ name, description, price, id }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="flex-row-reverse-container card-container">
      <Card.Section>
        <Image src={`./menu/${id}.png`} height={100} alt="Norway" />
      </Card.Section>{' '}
      <div className="column-center">
        <Group justify="space-between" mt="md" mb="xs">
          <h3 className="menu-title">{name}</h3>
        </Group>
        <p className="menu-description">{description}</p>
        <p className="menu-price">Price: ${price}</p>{' '}
      </div>
    </Card>
  )
}

export default Demo
