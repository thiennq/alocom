var mongoose = require('mongoose');
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/test';
mongoose.connect(mongoUri);

var userSchema = new mongoose.Schema({
  _id: String,
  data: mongoose.Schema.Types.Mixed
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
					var data = users.toObject().data;
					resolve(data);	
				} else {
					resolve([]);
				}
				
			}
		});
	});
		
}

function store(users) {
	return new Promise(function(resolve, reject) {
		User.findOneAndUpdate({_id: 'users'}, {data: users}, {upsert: true}, function(err) {
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
	store
};