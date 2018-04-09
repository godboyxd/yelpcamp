var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//Root route
router.get("/", function(req, res){
    res.render("landing");
});

//================
// AUTH ROUTES
//================

//Show register form
router.get("/register", function(req, res) {
    res.render("register");
});

//Handle sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp, " + user.username + "!");
            res.redirect("/campgrounds");
        });
    });
});

//Show login form
router.get("/login", function(req, res) {
    res.render("login");
});

//Handle login logic
//FORMAT: app.post("login", middleware, callback fx)
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
});

// Logout route
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "You have logged out of your account.");
   res.redirect("/campgrounds");
});


module.exports = router;