import { OrderCreatedEvent, Publisher, Subjects } from "@amishratickets/common";

class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}

export default OrderCreatedPublisher;
