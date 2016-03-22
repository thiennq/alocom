var express = require('express');
var router = express.Router();
var fs = require('fs');
var dishes = [];
var pplHash = {};
var canVote = false;
var users = {};
var host = {};
var userHelper = require('../lib/userHelper');
// var userHelper = require('../lib/userMockup.jsx');

router.post('/menu', function(req, res) {
	var menu = req.body.menu;
	var fbid = req.body.fbid;
	var fullname = req.body.fullname;
	var user = {
		fbid: fbid,
		fullname: fullname,
		updated_time: new Date()
	};
	host = user;

	dishes = [];
	var index = 0;
	for (let item of menu) {
		dishes.push({
			id: index++,
			name: item,
			list: [],
			total: 0
		});
	}
	pplHash = {};
	canVote = true;
	res.send({
		code: 0,
		message: "success"
	});
});


router.get('/menu', function(req, res) {
	res.send({
		code: 0,
		message: "success",
		menu: dishes,
		host: host,
		done: !canVote
	});
});

router.post('/vote', async function(req, res) {
	var fbid = req.body.fbid;
	var fullname = req.body.fullname;
	var dish = req.body.dish;
	var oldDish = pplHash[fbid];
	var user = {
		fbid: fbid,
		fullname: fullname,
		updated_time: new Date()
	};

	var updateJson = false;
	if (!users[fbid]) {
		console.log('new user');
		updateJson = true;
	}
	users[fbid] = user;
	
	if (!canVote) {
		res.send({
			code: "error.vote.closed",
			message: "Sorry, you can not vote now"
		});
		return;
	}

	//vote before
	if (dishes && dishes[oldDish] && dishes[oldDish].list) {
		let list = dishes[oldDish].list;
		for (let i = 0; i < list.length; i++) {
			if (list[i].fbid === fbid) {
				list.splice(i, 1);
				dishes[oldDish].total--;
				break;
			}
		}
	}

	//vote
	dishes[dish].list.push(user);
	dishes[dish].total++;
	pplHash[fbid] = dish;
	res.send({
		code: 0,
		message: 'success'
	});

	if (updateJson) {
		console.log('users.js -> users=', users);
		let result = await userHelper.store(users);
	}
});

router.post('/done', function(req, res) {
	var fbid = req.body.fbid;
	if (fbid !== host.fbid) {
		res.send({
			code: "error.done.not_host",
			message: "Only host can do this action."
		});
		return;
	}

	canVote = false;
	res.send({
		code: 0,
		message: 'success'
	});
});


router.get('/users', function(req, res) {
	let list = [];
	for (let i in users) {
		if (users.hasOwnProperty(i)) {
			list.push(users[i]);
		}
	}
	res.send({
		code: 0,
		message: 'success',
		users: list
	});
});

router.delete('/users', async function(req, res) {
	console.log("DELETE /users");
	try {
		var result = await userHelper.clear();
		console.log("result", result);
		
		if (!result) {
			return res.send({
				code: -1,
				message: 'Cannot clear user list'
			});
		}
		res.send({
			code: 0,
			message: 'success'
		});
		
	} catch (e) {
		console.error(e.stack);
	}
		
});



async function init() {
	let userList = await userHelper.list();
	if (userList) {
		console.log('userList', userList);
		users = userList;
	}
}

init();
module.exports = router;