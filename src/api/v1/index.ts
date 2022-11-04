import { Router } from 'express';
import upload from './media';


export default()=>{
    const app = Router();
    upload(app);
    return app;
}