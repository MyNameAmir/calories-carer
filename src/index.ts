import logger from './logger';
import app from './app';

const port = process.env.port;
const server = app.listen(process.env.port);

app.use('/favicon.ico', (req, res) => {
    res.status(503).end();
});


app.use('/', (req, res) => {
    res.status(503).end();
});

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);
