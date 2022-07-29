import fs from 'fs';
import path from 'path';
import type { Client } from 'discord.js';

export default async (client: Client) => {  
  const EVENT_PATH = './src/events';

  // Fetch all events.
  const discordEvents = fs.readdirSync(path.join(process.cwd(), EVENT_PATH, '/discord'))
    .filter(filename => filename.endsWith('.js'))
    .map(filename => require(path.join(process.cwd(), EVENT_PATH, '/discord', filename)));
  
  // Attach the events to Discord 
  discordEvents
    .map(async event => await client.on(event.callback(client), () => {}))
    .map(promise => promise.catch(console.error));
}
