import * as controller from './app';
import * as validator from './validators';
import { logger } from './utils';

/**
 * @description - API endpoints declarations.
 * @param app - express server.
 */
export const routes = (app) => {
	//Route for addition functionality.
	app.post('/add', validator.add, (request, response) => {
		logger.info(`sending request payload for addition...`);
		const sum = controller.add(request.body.numbers);
		logger.info(`sending back the response...`)
		return response.status(200).json({
			sum,
		});
	});

	app.get('/log', (request, response) => {
		response.sendFile(__dirname + '/index.html');
	});
};
