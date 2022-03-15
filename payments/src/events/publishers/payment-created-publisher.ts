import {
  PaymentCreatedEvent,
  Publisher,
  Subjects,
} from "@amishratickets/common";

class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}

export default PaymentCreatedPublisher;
