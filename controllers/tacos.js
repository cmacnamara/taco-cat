import { Taco } from '../models/taco.js'

function index(req, res) {
  Taco.find({})
  .then(tacos => {
    res.render('tacos/index', {
      tacos,
      title: '🌮'
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect('/')
  })
}

function create(req,res) {
  req.body.owner = req.user.profile._id
  req.body.tasty = !!req.body.tasty
  Taco.create(req.body)
  .then(taco => {
    res.redirect('/tacos')
  })
  .catch(err => {
    console.log(err);
    res.redirect('/tacos')
  })
}

export {
  index,
  create,
}