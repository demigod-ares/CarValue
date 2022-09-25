import { Body, Controller, Get, Param, Post, NotFoundException, Put } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';
import { Logger } from '@nestjs/common';

@Controller('/messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) { }

  @Get()
  listMessages() {
    Logger.log('You have requested to read all the messages');
    return this.messagesService.findAll();
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    Logger.log('You have requested to add new message with content: ' + body.content);
    return this.messagesService.create(body.content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    Logger.log('You have requested to read message at id: ' + id);
    const message = await this.messagesService.findOne(id); // ID inside JSON as number are only accessible

    if (!message) {
      Logger.error('Note that range of ID is 0 to 999');
      throw new NotFoundException('ID do not exist');
    } else Logger.log('You should get your message');

    return message;
  }

}