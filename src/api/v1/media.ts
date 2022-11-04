import { Router, Request, Response } from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from '../../services/aws/aws';
import config from '../../../node.config';

const router = Router();

export default (app: Router) => {
    app.use('/upload', router);

    const fileFilter = (req:any, file:any, callback:any) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|tiff|doc|pdf|docx)$/i)) {
            return callback(new Error("Only image/video files are allowed!"), false);
        };
        callback(null, true);
    };

    const s3 = new aws.S3();

    const upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: <string>process.env.AWS_BUCKET,
            acl: 'public-read',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            cacheControl: 'max-age=31536000',
            contentEncoding: 'gzip',
            metadata: (req:Request, file, callback)=> {
                callback(null, { fieldName: file.fieldname });
            },
            key: (req: Request, file , callback)=> {
                callback(null, Date.now().toString());
            }
        }), fileFilter
    });

    router.post('/new', upload.array('file', 4), (req:Request, res: Response)=>{
        // console.log(req.files)
        if(req.files?.length === 0){
            const err = new Error("Please select a file to upload");
            return res.status(500).send({ msg : 'empty'});
        }
        return res.send(req.files);
    });
}
