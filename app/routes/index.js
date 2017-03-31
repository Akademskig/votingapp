

var path = process.cwd();

var Polls=require('../models/polls.js')
var flash = require('connect-flash');

var ifVoted={"pollname": null,"voted":0, "who":null}

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			res.redirect('/');
		}
	}
	
	function ifUserDefined(req,res,next){
		return next();
	}
	
	app.route('/')
		.get(function (req, res) {
			var user="nl"
			if(req.user!=undefined){
				user = req.user.local.username || req.user.github.username;
			}
			res.render('index',{user:user});
		});
		
	app.route('/login')
		.get(function (req, res) {
			res.redirect('/');
		});
		
	app.route('/locallogin')
		.get(function (req, res) {
			res.sendFile(path + '/public/locallogin.html');
		});
		
	app.route('/gitLogin')
		.get(passport.authenticate('github'));
		
		app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/'
		}));
	
	app.route('/logininfo')
		.post(passport.authenticate('local',{failureRedirect:'/', failureFlash: true, successFlash:true}),function(req, res){
			req.flash('successFlash',"GTFO")
			res.redirect('/')
		})
		
	app.route('/postNewPoll')
		.post(function(req,res){
			console.log("poll name"+req.body.pollName+", "+ "pollOptions: "+ req.body.pollOption + "user:" + req.body.user)
			var newPoll= new Polls();
			newPoll.pollname=req.body.pollName;
			newPoll.user=req.body.user;
			newPoll.id=new Date().getTime();
			var optArray=[];
			optArray.push(req.body.pollOption);
			console.log("rbp:"+req.body.pollOption)
			
			if(typeof(req.body.pollOption)=="string"){
				var obj={optname:req.body.pollOption, votecount:0}
				newPoll.polloptions.push(obj);
			}
			else{
				req.body.pollOption.forEach(function(val){
					var obj={optname:val, votecount:0}
					newPoll.polloptions.push(obj);
				})
			}
			newPoll.save(function(err){
				if(err){
					throw err;
				}
			});
			res.redirect('/myPolls');
			console.log("saved");
		})
	app.route('/getUser')
		.get(isLoggedIn, function (req, res) {
			console.log("req.user.local:"+req.user.local)
			console.log(req.user.local=="{}")
			console.log(req.user.github==true)
			var user = (req.user.github!="{}" ? req.user.github:req.user.local);
			res.json(user);
		});
	
	app.route("/getAllPolls")
		.get(ifUserDefined, function(req,res){
			var query={}
			Polls.find(query, function(err,docs){
				if(err){
					throw err;
				}
				res.json(docs);
			});
	    })
	  
	app.route("/getMyPoll")
		.get(ifUserDefined, function(req,res){
			var query= (req.user!=undefined ? {'user': req.user.local.username || req.user.github.username}:{});
			Polls.find(query, function(err,docs){
				if(err){
					throw err;
				}
				res.json(docs);
			});
	    })
		
	app.route('/myPolls')
		.get(isLoggedIn,function(req,res){
			res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			res.render('authenticated')
		})
		
	app.route('/addOption')
		.post(function(req,res){
			console.log(req.body)
			Polls.findOneAndUpdate({"id":req.body.pollID},{$push: {'polloptions':{'optname':req.body.addedOpt,'votecount':0}}},function(err, data){
				if(err){
					throw err;
				}
				res.redirect(req.get('referer'))
			})
		})
		
	app.route('/vote')
		.post(function(req,res){
			var user=req.user.local.username || req.user.github.username
			Polls.findOneAndUpdate({'pollname': req.body.pollName,'polloptions.optname': req.body.polloption},{'$inc':{'polloptions.$.votecount':1}},function(err,docs){
				if(err){
					throw err
				}
				ifVoted.pollname=req.body.pollName
				ifVoted.voted=1;
				ifVoted.who=user
				res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
				res.redirect('/'+req.body.id)
			 })
		})
		.get(function(req,res){
			res.json(ifVoted);
		})
		
	app.post('/removePoll', function(req,res){
		Polls.remove({'pollname': req.body.pollname},function(data){
			console.log(data)
		})
		res.redirect('/myPolls');
	})
	
	app.post('/removeOption', function(req,res){
		console.log(req.body)
		Polls.findOneAndUpdate({'id':req.body.pollid},{$pull:{'polloptions':{'optname': req.body.option}}},function(err,docs){
			if(err){
				throw err;
			}
			res.redirect(req.get('referer'))
		})
	})
	
	app.route('/logout')
		.get(function(req,res){
			req.logout();
			res.redirect('/')
		})
		
	app.route('/:idd')
		.get(ifUserDefined,function(req,res){
			//console.log(req.user)
			var user=null;
			if(req.user!=undefined){
			user=req.user.local.username || req.user.github.username;
			}
			else{
				user="nl"
			}
			Polls.findOne({id: req.params.idd},{'_id':0},function(err,docs){
				//console.log(docs)
				res.render('poll',{pollId: docs, currentUser:user})
			})
		})
		
	app.route('/favicon.ico')
		.get(function(req,res){
			console.log(path)
			res.send(path+'/public/imgs/icon.html')
		})
}	