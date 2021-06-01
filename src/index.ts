import config from 'config';
import express from 'express';
import { routes } from './routes';
import { logger } from './utils';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { watchFile, readFile } from 'fs';

const port: any = config.get('port');
const app = express();
app.use(express.json());

routes(app);


const server = createServer(app);
const io = new Server(server);
server.listen(port, () => {
	io.on('connection', (socket) => {
    logger.info(`New connection added: ${socket.id}`);
    watchFile('./src/combined.log', (curS, prevS) => {
			readFile('./src/conbined.log', 'utf-8', (error, data) => {
				if (error) {
					logger.error(error);
				}
				const rows = data.trim().split('\n');
				const lastRow = rows.slice(-1)[0];
				logger.info(`Log file changed. Emitting ${lastRow}`);
				socket.emit('data', lastRow);
			})
  	});
	});
	logger.info(`server is listening to ${port}`);
});
