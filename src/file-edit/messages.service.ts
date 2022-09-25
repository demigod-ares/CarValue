import { Injectable, Logger } from "@nestjs/common";
import { MessagesRepository } from "./messages.repository";

@Injectable()
export class MessagesService {
  constructor(public messagesRepo: MessagesRepository) { }

  findOne(id: string) {
    Logger.debug('Inside findOne() of message service');
    return this.messagesRepo.findOne(id);
  }

  findAll() {
    Logger.debug('Inside findAll() of message service');
    return this.messagesRepo.findAll();
  }

  create(content: string) {
    Logger.debug('Inside create() of message service');
    return this.messagesRepo.create(content);
  }

}