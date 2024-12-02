import { Button, Modal, Select, Title } from "@mantine/core";
import { DateTime } from "luxon";
import { supabase } from "../../api/supabase";
import { useState, useEffect } from "react";

import classes from "./OrderModal.module.css";

const OrderModal = ({ opened, close, order, getOrders }) => {
  const [notification, setNotification] = useState(null);

  // Close the notification
  useEffect(() => {
    setNotification(null);
  }, [opened, close]);

  const handleStatusChange = async (value) => {
    if (!order) return;

    try {
      // Update the status in Supabase
      const { data, error } = await supabase
        .from("order")
        .update({ status: value })
        .eq("id", order.id);

      if (error) {
        console.error("Error updating status:", error);
        setNotification({
          type: "error",
          message: "Failed to update the status.",
        });
        return;
      }

      console.log("Order status updated successfully:", data);

      // Show success notification
      setNotification({
        type: "success",
        message: "Order status updated successfully.",
      });

      // Refresh orders
      getOrders();
    } catch (err) {
      console.error("Unexpected error:", err);
      setNotification({
        type: "error",
        message: "An unexpected error occurred.",
      });
    }
  };
  const handleDelete = async () => {
    if (!order) return;

    try {
      const { data, error } = await supabase
        .from("order")
        .delete()
        .eq("id", order.id);

      if (error) {
        console.error("Error deleting order:", error);
        setNotification({
          type: "error",
          message: "Failed to delete the order.",
        });
        return;
      }

      console.log("Order deleted successfully:", data);
      setNotification({
        type: "success",
        message: "Order deleted successfully.",
      });

      // Refresh orders and close the modal
      getOrders();
      close();
    } catch (err) {
      console.error("Unexpected error:", err);
      setNotification({
        type: "error",
        message: "An unexpected error occurred.",
      });
    }
  };
  return (
    <Modal
      opened={opened}
      onClose={close}
      title={
        order ? (
          <p className={classes.modalTitle}>Order #{order.id}</p>
        ) : (
          "Unknown Order"
        )
      }
      centered
    >
      {order && (
        <>
          {" "}
          {notification && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 10,
                backgroundColor:
                  notification.type === "success" ? "#d4edda" : "#f8d7da",
                padding: "20px",
                borderRadius: "8px",
                textAlign: "center",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Title
                order={5}
                style={{
                  marginBottom: "8px",
                  color:
                    notification.type === "success" ? "#155724" : "#721c24",
                }}
              >
                {notification.type === "success" ? "Success" : "Error"}
              </Title>
              <p
                style={{
                  margin: 0,
                  color:
                    notification.type === "success" ? "#155724" : "#721c24",
                }}
              >
                {notification.message}
              </p>
            </div>
          )}
          <Title order={4}>Modify Order</Title>
          <Select
            label="Status"
            defaultValue={order.status}
            data={["received", "preparing", "ready"]}
            onChange={handleStatusChange}
          />
          <Button color="red" mt="md" onClick={handleDelete}>
            Delete Order
          </Button>
          <h4 className={classes.sectionHeading}>Order Details</h4>
          <div className={classes.orderDetailsContainer}>
            <p>
              <span className={classes.orderKey}>ID: </span>
              <span className={classes.orderValue}>{order.id}</span>
            </p>
            <p>
              <span className={classes.orderKey}>Customer: </span>
              {/* <span className={classes.orderValue}>
                {order?.profile?.first_name} {order?.profile?.last_name}
              </span> */}
            </p>
            <p>
              <span className={classes.orderKey}>Order Type: </span>
              <span className={classes.orderValue}>{order?.type}</span>
            </p>
            <p>
              <span className={classes.orderKey}>Date: </span>
              <span className={classes.orderValue}>
                {DateTime.fromISO(order?.date).toLocaleString(
                  DateTime.DATETIME_MED
                )}
              </span>
            </p>
            <p>
              <span className={classes.orderKey}>Status: </span>
              <span className={classes.orderValue}>{order?.status}</span>
            </p>
            <p>
              <span className={classes.orderKey}>Table ID: </span>
              <span className={classes.orderValue}>{order?.table_id}</span>
            </p>
            <p>
              <span className={classes.orderKey}>Total: </span>
              <span className={classes.orderValue}>${order?.total}</span>
            </p>
          </div>
          <h4 className={classes.sectionHeading}>Order Items</h4>
          {order.order_items.length === 0 ? (
            <p>No order items</p>
          ) : (
            order.order_items.map((item) => (
              <div key={item.menu_item_id}>
                <p>{item.menu_item.name}</p>
                {/* <p>{item.menu_item.type}</p> */}
                <p>Unit price: ${item.menu_item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <hr />
              </div>
            ))
          )}
        </>
      )}
    </Modal>
  );
};

export default OrderModal;