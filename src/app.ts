import express from 'express';
import 'module-alias/register';
import expressLoader from './loaders';

const app = express();

expressLoader({ expressApp : app }); 

export default app;