module.exports.isLoggedIn = (req,res) => {
  if(!req.isAuthenticated()){
    req.flash('error','please login to continue!');
    res.redirect('/login')
  }
}