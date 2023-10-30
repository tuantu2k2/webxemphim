const express = require("express");
const cmt = require("../controllers/comment.controller");

const router = express.Router();

router.route("/")
    .get(cmt.findAll)
    .post(cmt.create)
    .delete(cmt.deleteAll);

router.route("/favorite")
    .get(cmt.findAllFavorite);
router.route("/postCmt")
    .post(cmt.create)
router.route("/slug")
    .post(cmt.findCommentBySlug)
    .put(cmt.update)
    .delete(cmt.delete);

module.exports = router;