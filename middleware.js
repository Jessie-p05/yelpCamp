module.exports.isLoggedIn = (req,res,next) => {
  if(!req.isAuthenticated()){
    req.session.returnTo = req.originalUrl;
    req.flash('error','please login to continue!');
    return res.redirect('/login')
  }
  next();
}