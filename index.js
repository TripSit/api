import createServer from './server';

const server = createServer();

server.listen(3000, () => {
  console.info('TripSit API running on port 3000');
});
