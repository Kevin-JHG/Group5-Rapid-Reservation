import { Card as MantineCard, Image, Group } from '@mantine/core'
import classes from './MenuCard.module.css'

function MenuCard({ name, description, price, id }) {
  return (
    <MantineCard className={classes.mantineCard} shadow="sm" padding="lg" radius="md" withBorder>
      <MantineCard.Section>
        <Image src={`./menu/${id}.png`} height={200} alt="Norway" />
      </MantineCard.Section>{' '}
      <div className={classes.columnCenter}>
        <Group justify="space-between" mt="md" mb="xs">
          <h3 className={classes.menuTitle}>{name}</h3>
        </Group>
        <p className={classes.menuDescription}>{description}</p>
        <p className={classes.menuPrice}>Price: ${price}</p>{' '}
      </div>
    </MantineCard>
  )
}

export default MenuCard
