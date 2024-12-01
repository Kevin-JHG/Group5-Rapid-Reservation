import { useEffect, useState } from "react";
import { supabase } from "../../api/supabase";
import { Select, Table, Title } from "@mantine/core";
import { DateTime } from "luxon";
import { useDisclosure } from "@mantine/hooks";

import OrderModal from "./OrderModal";

import classes from "./Dashboard.module.css";

export const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [modalOrderId, setModalOrderId] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  // Derived state for the order modal
  const modalOrder =
    modalOrderId && orders.length !== 0
      ? orders.find((order) => order.id === modalOrderId)
      : null;

  // Function to fetch orders from Supabase
  const getOrders = async () => {
    try {
      const { data, error } = await supabase.from("order").select(`
          *,
          table (
            seats
          ),
          profile (
            first_name,
            last_name
          ),
          order_items:order_item (
            menu_item_id,
            quantity,
            menu_item!inner(name, type, price)
          )
        `);

      if (error) {
        console.error("Error fetching orders:", error);
        return;
      }

      // Add total price calculation to each order
      const modifiedData = data.map((order) => {
        if (!order.order_items || order.order_items.length === 0) {
          return { ...order, total: (0).toFixed(2) };
        }

        const totalPrice = order.order_items.reduce((acc, curr) => {
          return acc + curr.menu_item.price * curr.quantity;
        }, 0);

        return { ...order, total: totalPrice.toFixed(2) };
      });

      setOrders(modifiedData);
    } catch (err) {
      console.error("Unexpected error fetching orders:", err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // Handle row click to open modal
  const handleOrderClick = (id) => {
    setModalOrderId(id);
    open();
  };

  // Render rows for the table
  const rows = orders.map((order) => (
    <Table.Tr
      key={order.id}
      onClick={() => handleOrderClick(order.id)}
      style={{ cursor: "pointer" }}
    >
      <Table.Td>{order.id}</Table.Td>
      <Table.Td>
        {order.profile?.first_name} {order.profile?.last_name}
      </Table.Td>
      <Table.Td>
        {DateTime.fromISO(order.date).toLocaleString(DateTime.DATETIME_MED)}
      </Table.Td>
      <Table.Td>{order.status}</Table.Td>
      <Table.Td>{order.type}</Table.Td>
      <Table.Td>${order.total}</Table.Td>
    </Table.Tr>
  ));

  // Render loading state if orders are not fetched yet
  if (orders.length === 0) return <div>Loading...</div>;

  return (
    <div className={classes.pageContainer}>
      <Title order={2} mt="lg" ta="center">
        Dashboard
      </Title>

      <div style={{ width: "fit-content" }}>
        <Select
          label="Filter orders"
          defaultValue="All"
          data={["All", "Dine-in", "Take-out", "Active"]}
        />
      </div>

      <Table mt="lg">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Customer</Table.Th>
            <Table.Th>Date & Time</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Reservation Type</Table.Th>
            <Table.Th>Order Total</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      {/* Order Modal */}
      <OrderModal
        opened={opened}
        close={close}
        order={modalOrder}
        getOrders={getOrders}
      />
    </div>
  );
};
