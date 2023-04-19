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

function show(req,res) {
  Taco.findById(req.params.tacoId)
  .populate('owner')
  .then(taco => {
    res.render('tacos/show', {
      taco,
      title: '🌮 show'
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect('/tacos')
  })
}

function flipTasty(req,res) {
  Taco.findByIdAndUpdate(req.params.tacoId)
  .then(taco => {
    taco.tasty = !taco.tasty
    taco.save()
    .then(() => {
      res.redirect(`/tacos/${taco._id}`)
    })
    .catch(err => {
      console.log(err);
      res.redirect('/tacos')
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect('/tacos')
  })
}

export {
  index,
  create,
  show,
  flipTasty
}
