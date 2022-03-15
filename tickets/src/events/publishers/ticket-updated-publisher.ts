import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@amishratickets/common";

class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}

export default TicketUpdatedPublisher;
