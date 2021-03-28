const express = require('express');
const newWord = require('../models/index');
const router = express.Router();

router.get('/', (req, res) => {
  newWord.find({}, (err, docs) => {
    if (err) throw err;
    else res.render('home', { list: docs.reverse() });
  });
});
router.post('/add', (req, res) => {
  let { enWord, vnWord } = req.body;
  let studied = req.body.studied ? true : false;
  addNewWord = (enWord, vnWord, studied) => {
    return new Promise((resove, reject) => {
      let newW = new newWord({ enWord, vnWord, studied });
      newW.save((err, doc) => {
        if (err) reject(err);
        else resove(true);
      });
    });
  };
  addNewWord(enWord, vnWord, studied).then((result) => {
    res.redirect('/');
  });
});
router.get('/edit/:id', (req, res) => {
  let id = req.params.id;
  /* lấy dữ liệu cần chỉnh sửa về */
  getDataById = (id) => {
    return new Promise((resolve, reject) => {
      newWord.findOne({ _id: id }, (err, doc) => {
        if (err) reject(err);
        else resolve(doc);
      });
    });
  };
  getDataById(id)
    .then((result) => {
      if (result) res.render('edit', { item: result });
    })
    .catch((err) => console.log(err));
});
router.post('/edit/:id', (req, res) => {
  let id = req.params.id;
  let { enWord, vnWord } = req.body;
  let studied = req.body.studied ? true : false;
  /* update */
  updateData = () => {
    return new Promise((resolve, reject) => {
      newWord.updateOne(
        { _id: id },
        { enWord, vnWord, studied },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  };
  updateData()
    .then((result) => {
      res.redirect('/');
    })
    .catch((err) => console.log(err));
});
router.get('/delete/:id', (req, res) => {
  deleteData = () => {
    return new Promise((resolve, reject) => {
      newWord.deleteOne({ _id: req.params.id }, (err, doc) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  };
  deleteData()
    .then((resolve) => {
      if (resolve) res.redirect('/');
    })
    .catch((err) => console.log(err));
});
module.exports = router;
