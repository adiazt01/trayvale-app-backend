import { Command } from '@nestjs/cqrs';

export class RemoveProductCommand extends Command<any> {
  constructor(public readonly id: string) {
    super();
  }
}
