import aws from 'aws-sdk';
// import config from '../../../node.config';

aws.config.update({
    accessKeyId: <string>process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: <string>process.env.AWS_SECRET_ACCESS_KEY,
    region: <string>process.env.AWS_DEFAULT_REGION,
});

export default aws;
