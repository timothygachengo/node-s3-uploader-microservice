import express, { Application, Request, Response, NextFunction } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import  apiV1Router from  '../api/v1';

export default ({ app }: { app: Application }) => {

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.disable('x-powered-by');
    
    app.enable('trust proxy');
    app.set('trust proxy', 1);
    app.use(helmet());

    /**
     * TODO:
     * In production please specify the cross origin to prevent any host from accessing the API of type Array<string>
     */
    app.use(cors({
        credentials : true,
        origin : [
         '*',
        'http://localhost:3000',
         'https://kiongozi.ke',
         'https://development.d2rvjwkh3qs9it.amplifyapp.com',
         'https://main.d2rvjwkh3qs9it.amplifyapp.com',
         'https://amplifyapp.com',
         'https://ngrok.io'
         ]
    }));

    const shouldCompress = (req: Request, res: Response) => req.headers['x-no-compression'] ? false : compression.filter(req, res);
    app.use(compression({ filter: shouldCompress }))
    

    if (process.env.NODE_ENV === "development") {
        const morgan = require('morgan');
        app.use(morgan('combined'));
    }


    app.get('/test', (req: Request, res: Response) => {
        res.status(200).send({ msg: 'This is working' });
    });

    /**
     * API Routes
     * Add more versions of the api below
     */
    app.use('/api/v1', apiV1Router());

    //Redirect errors to specific pages 
    /**
     * This is a 404 redirect error
     */
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.status(404).
            format({
                json: () => {
                    res.send({ err: 'Not Found' });
                },
                text: () => {
                    res.send('Not found');
                },
                default: () => {
                    res.status(406).send('Not Acceptable');
                }
            })

        next();

    });



}
