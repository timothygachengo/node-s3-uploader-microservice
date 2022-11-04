import http from 'http';
import config from '../node.config';
import app from './app';
import { readFileSync } from 'fs';


const server = http.createServer(app);

const port  = config.port;

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});