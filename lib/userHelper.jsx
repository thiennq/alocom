var mongoose = require('mongoose');
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/test';
mongoose.connect(mongoUri);

var userSchema = new mongoose.Schema({
  _id: String,
  data: String
});
var User = mongoose.model('User', userSchema);

function list(u) {
	return new Promise(function(resolve, reject) {
		User.findById('users', function(err, users) {
			if (err) {
				reject(false);
			}
			else {
				if (users && users.data) {
					var data = JSON.parse(users.toObject().data);
					if (Array.isArray(data)) {
						data = {};
					}
					resolve(data);	
				} else {
					resolve({});
				}
				
			}
		});
	});
		
}

function store(users) {
	console.log('::::store: users ->', users);
	return new Promise(function(resolve, reject) {
		User.findOneAndUpdate({_id: 'users'}, {data: JSON.stringify(users)}, {upsert: true}, function(err) {
			if (err) {
				reject(false);
			}
			else {
				resolve(true);	
			}
		});
	});
}

function clear() {
	console.log('::::clear: users');
	return new Promise(function(resolve, reject) {
		User.remove({}, function(err) {
			if (err) {
				reject(false);
			}
			else {
				resolve(true);	
			}
		});
	});
}

module.exports = {
	list,
	store,
	clear
};