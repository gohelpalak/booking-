const express = require('express');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Image upload faild" });


    }

    const image = `/uploads.${req.file.filename}`;
    res.status(200).json({ message: "Image uploades successfully", imageUrl });

});
module.exports = router;