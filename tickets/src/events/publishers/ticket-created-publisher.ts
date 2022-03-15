import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@amishratickets/common";

class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}

export default TicketCreatedPublisher;
