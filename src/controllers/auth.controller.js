const usermodel = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');

async function registercontroller(req, res, next) {
  res.render("register")
}

async function postregistercontroller(req, res, next) {
  const { username, email, password } = req.body;

  const isuserexist = await usermodel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (isuserexist) {
    return res.status(400).json({
      message: "username and email alredy exist",
    });
  }

  const hashpassword = await bcryptjs.hash(password, 10);

  const user = await usermodel.create({
    username: username,
    email: email,
    password: hashpassword,
  });

  const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

  res.cookie('idtoken',token)

    return res.redirect('/')

}

async function logincontroller(req , res) {
     res.render("login")
}

async function postlogincontroller(req , res) {
    const {email , password} = req.body

    const user = await usermodel.findOne({
        email:email
    })

    if(!user){
        return res.redirect('/login?error=user not found')
    }

    const isvaildpassword = await bcryptjs.compare(password,user.password)

    if(!isvaildpassword){
        return res.redirect('/login?error=user not found')
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie('idtoken',token)

    return res.redirect('/')

}

async function userlogout(req ,res) {
  res.clearCookie('token')
  res.redirect('/auth/login')
}

module.exports = {
  registercontroller,
  postregistercontroller,
  logincontroller,
  postlogincontroller,
  userlogout
};
