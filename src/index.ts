import logger from './logger';
import app from './app';

const port = process.env.port || 8080;
const server = app.listen(port);

app.use('/favicon.ico', (req, res) => {
    res.status(503).end();
});


app.use('/', (req, res) => {
     res.status(404).end();
});

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);
