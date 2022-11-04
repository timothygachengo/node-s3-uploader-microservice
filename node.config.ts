import dotenv from 'dotenv'
import path from 'path';

const environment = dotenv.config({ path : path.resolve(__dirname, './.env')});

if(environment.error){
   console.log("Env file not found. Using global env variables");
}

const config = {
    port : process.env.PORT || 4500,
    aws : {
        accessKeyId : process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY,
        region : process.env.AWS_DEFAULT_REGION,
        bucket : <string>process.env.AWS_BUCKET

    }
}

export default config;