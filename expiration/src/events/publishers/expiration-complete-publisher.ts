import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@amishratickets/common";

class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}

export default ExpirationCompletePublisher;
