var LocalStrategy = require('passport-local').Strategy;
var User= require('../models/users')


function localAuth(passport){
    
    passport.serializeUser(function (user, done) {
		done(null, user._id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
	
	passport.use(new LocalStrategy(
	   	function(username,password,done){
	   		  User.findOne({'local.username': username}, function(err, user){
	   		  	console.log(user)
    	    	
    	        if(err){
    	        	console.log(err)
    	            return done(err);
    	        }
    	        if(user){
    	            if (user.local.password == password){
    	                return done(null, user);
    	            }
    	            else
    	            {
    	                return done(null, false, {message: 'Incorrect password'})
    	            }
    	        }
    	        if(!user){
    	            var newUser = new User();
    	            newUser.local.username=username;
    	            newUser.local.password=password;
    	            
    	            newUser.save(function(err){
    	                if(err){
    	                    throw err;
    	                }
    	                return done(null, newUser);
    	            })
    	        }
    	    })
		}
    ))
}

module.exports.localAuth=localAuth;

/*,*/