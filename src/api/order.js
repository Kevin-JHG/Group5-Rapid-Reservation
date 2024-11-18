import { supabase } from './supabase'
import { getSessionUserId } from './utils'

export const insertOrder = async (type, table_id, startDateTime) => {
  // get current user id
  const user_id = await getSessionUserId()

  if (type === 'reservation') {
    type = 'dine-in'
  } else {
    type = 'to-go'
  }

  // create order in `order` table
  const { data, error: insertOrderError } = await supabase
    .from('order')
    .insert({ user_id, table_id, date: startDateTime ? startDateTime.toSQL() : null, type, profile_id: user_id })
    .select()

  if (insertOrderError) throw insertOrderError

  return data
}

export const insertOrderItems = async (items, orderId) => {
  const formattedItems = items.map(item => ({ order_id: orderId, menu_item_id: item.id, quantity: item.quantity }))

  const { data, error } = await supabase.from('order_item').insert(formattedItems).select()

  if (error) throw error

  return data
}

export const checkTableAvail = async (partySize, startDateTime) => {
  // select orders that are within +/- 1 hour of requested reservation time
  const maxDateTime = startDateTime.plus({ hours: 1 })
  const minDateTime = startDateTime.minus({ hours: 1 })

  const { data: ordersData, error: ordersErr } = await supabase
    .from('order')
    .select('table_id, date, type')
    .lte('date', maxDateTime.toSQL())
    .gte('date', minDateTime.toSQL())

  if (ordersErr) throw ordersErr

  // check if tables are available (excluding tables fetched above & seats < party size)
  let query = supabase.from('table').select('*').gte('seats', partySize)

  if (ordersData.length > 0) {
    // create `not` value string
    // for example: '(2, 4, 5)'
    const ids = ordersData.reduce((acc, curr, i) => {
      let newVal = acc + curr.table_id

      if (i === ordersData.length - 1) {
        newVal += ')'
      } else {
        newVal += ','
      }

      return newVal
    }, '(')
    query = query.not('id', 'in', ids)
  }

  const { data: availableTables, error: tablesErr } = await query
  if (tablesErr) throw tablesErr

  // if there are available tables
  if (availableTables.length > 0) {
    // select closest number of seats to party size
    const closest = availableTables.reduce((prev, cur) => {
      return Math.abs(cur.seats - partySize) < Math.abs(prev.seats - partySize) ? cur : prev
    })

    return closest.id
  }

  return null
}
