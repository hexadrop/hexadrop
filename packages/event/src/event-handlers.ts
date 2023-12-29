import type { EventBusCallback } from '@hexadrop/event/bus';
import type { DomainEventClass } from '@hexadrop/event/domain-event';
import DomainEvent from '@hexadrop/event/domain-event';

export interface EventHandlers {
	search<E extends DomainEvent>(event: DomainEventClass<E> | E): EventBusCallback<E>[];
}
