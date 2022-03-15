import {
  OrderCancelledEvent,
  Publisher,
  Subjects,
} from "@amishratickets/common";

class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}

export default OrderCancelledPublisher;
