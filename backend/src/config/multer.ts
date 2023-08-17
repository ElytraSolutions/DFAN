import multer from 'multer';
import { unlink } from 'fs';
import path from 'path';
import UserProfile from '../models/UserProfile';

const allowedExtensions = ['.jpg', '.jpeg', '.png'];
const storage = multer.diskStorage({
    destination: 'public/avatars',
    filename: (req, file, cb) => {
        if (!req.session.user || !req.session.user.id) {
            cb(new Error('Unauthorized'), '');
        } else {
            const ext = path.extname(file.originalname);
            const fileName = `${req.session.user.id}${ext}`;
            UserProfile.findOne({
                where: {
                    UserId: req.session.user.id,
                },
            }).then((data) => {
                const currentFile = data?.avatar;
                if (!currentFile) cb(null, fileName);
                unlink(`public/avatars/${currentFile}`, (error) => {
                    if (error && error.code !== 'ENOENT') {
                        console.log('Error in deleting file: ', error);
                        cb(new Error('Something went wrong'), '');
                    }
                    cb(null, fileName);
                });
            });
        }
    },
});
const upload = multer({
    storage,
    fileFilter: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        if (allowedExtensions.indexOf(ext) === -1) {
            return callback(new Error('Only jpg images are allowed'));
        }
        callback(null, true);
    },
});
export default upload;
