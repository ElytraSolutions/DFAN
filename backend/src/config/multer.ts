import multer from 'multer';
import { unlink } from 'fs';
import path from 'path';

const allowedExtensions = ['.png', '.jpg', '.gif', '.jpeg'];
const storage = multer.diskStorage({
    destination: 'public/avatars',
    filename: (req, file, cb) => {
        if (!req.session.user || !req.session.user.id) {
            cb(new Error('Unauthorized'), '');
        } else {
            const ext = path.extname(file.originalname);
            const fileName = `${req.session.user.id}${ext}`;
            // delete current file to avoid errors
            // filename with different extensions are deleted by the route
            unlink(`public/avatars/${fileName}`, (error) => {
                if (error && error.code !== 'ENOENT') {
                    console.log('Error in deleting file: ', error);
                    cb(new Error('Something went wrong'), '');
                }
                cb(null, fileName);
            });
        }
    },
});
const upload = multer({
    storage,
    fileFilter: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        if (allowedExtensions.indexOf(ext) === -1) {
            return callback(new Error('Only images are allowed'));
        }
        callback(null, true);
    },
});
export default upload;
