const express = require("express");
const router = express.Router();
const multer = require("multer");
const PDFParser = require("pdf2json");
const fs = require("fs")

const upload = multer({ dest: "files" });

router.get('/convert',upload.single("file"),async(req,res)=>{
    const file = req.file
    const pdfParser = new PDFParser(this,1);

    try{
        pdfParser.on("pdfParser_dataReady", pdfData => {
            const textVersion = pdfParser.getRawTextContent()
            const fullVersion = pdfData
           res.send(textVersion);
        });
        pdfParser.loadPDF(file.path);
    }catch(err){
        res.status(500).send(err)
    }
})

module.exports = router;