import {
  Listener,
  OrderCancelledEvent,
  Subjects,
} from "@amishratickets/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import TicketUpdatedPublisher from "../publishers/ticket-updated-publisher";
import { queueGroupName } from "./queue-group-name";

class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    // Find the ticket that the order is reserving.
    const ticket = await Ticket.findById(data.ticket.id);

    // If no ticket, throw error
    if (!ticket) {
      throw new Error("Ticket not found");
    }

    // Mark the ticket as being reserved by setting its orderId property
    ticket.set({ orderId: undefined });

    // save the ticket
    await ticket.save();

    new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      version: ticket.version,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      orderId: ticket.orderId,
    });

    // ack the msg
    msg.ack();
  }
}

export default OrderCancelledListener;
