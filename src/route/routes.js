const express=require('express');
const router=express.Router();

const urlController=require('../controller/urlController')
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/url/shorten",urlController.createShortUrl)
router.get("/:urlCode",urlController.getUrl)




module.exports=router