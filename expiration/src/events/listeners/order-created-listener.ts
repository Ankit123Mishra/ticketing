import { Listener, OrderCreatedEvent, Subjects } from "@amishratickets/common";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";
import { queueGroupName } from "./queue-group-name";

class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log("Waiting this many milliseconds to process the job:", delay);

    // add to the expiration queue
    await expirationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay,
      }
    );

    // ack the msg
    msg.ack();
  }
}

export default OrderCreatedListener;
