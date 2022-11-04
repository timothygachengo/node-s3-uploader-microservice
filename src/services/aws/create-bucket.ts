import aws from './aws';
import crypto from 'crypto';

const s3 = new aws.S3();

const randstr = () => {
    let token = crypto.randomBytes(16).toString('hex');
    token = crypto.createHash('sha256').update(token).digest('hex')
    return token.toLowerCase().substring(10, 42);
};

const params = {
    Bucket: `kiongozi-${Date.now()}-${randstr()}`,
}

console.log(params.Bucket);

s3.createBucket(params, (err, data) => {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data.Location);
    }
});

