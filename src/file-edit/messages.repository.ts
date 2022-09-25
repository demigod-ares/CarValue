import { Injectable, Logger } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';


@Injectable()
export class MessagesRepository {
  async findOne(id: string) {
    Logger.debug('Inside findOne() of message repository');
    const contents = await readFile('src/file-edit/messages.json', 'utf8');
    const messages = JSON.parse(contents);

    return messages[id];
  }
  async findAll() {
    Logger.debug('Inside findAll() of message repository');
    const contents = await readFile('src/file-edit/messages.json', 'utf8');
    const messages = JSON.parse(contents);

    return messages;
  }

  async create(content: string) {
    Logger.debug('Inside create() of message repository');
    const contents = await readFile('src/file-edit/messages.json', 'utf8');
    const messages = JSON.parse(contents);

    const id = Math.floor(Math.random() * 999);
    messages[id] = content;

    await writeFile('src/file-edit/messages.json', JSON.stringify(messages));

    return 'Message written to the file!';
  }
}