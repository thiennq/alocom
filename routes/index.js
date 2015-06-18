var express = require('express');
var router = express.Router();
var fs = require('fs');
var dishes = [];
var pplHash = {};
var canVote = false;
var users = {};
var host = {};

try {
	var userFile = fs.readFileSync('users.json');
	users = JSON.parse(userFile);
} catch (e) {
	console.log("users.json not found");
}

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
		host: host
	});
});

router.post('/vote', function(req, res) {
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
		fs.writeFileSync("users.json", JSON.stringify(users, '', '  '));
	}
});

router.post('/done', function(req, res) {
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

module.exports = router;