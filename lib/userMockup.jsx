function list(u) {
	return new Promise(function(resolve, reject) {
		return {"code":0,"message":"success","users":[{"fbid":"3","fullname":"Vu Nguyen","updated_time":"2015-07-13T03:35:03.461Z"},{"fbid":"4","fullname":"Đại ca xóm chùa","updated_time":"2015-07-24T03:33:43.454Z"},{"fbid":"5","fullname":"Đại ca xóm chùa","updated_time":"2015-08-03T03:42:16.580Z"},{"fbid":"8","fullname":"Đại ca xóm chùa","updated_time":"2015-07-24T03:33:51.750Z"},{"fbid":"100000","fullname":"Vu Nguyen","updated_time":"2015-07-16T03:38:54.569Z"},{"fbid":"1034347653244192","fullname":"Trần Nguyễn Thái Luy","updated_time":"2015-07-13T03:35:45.457Z"},{"fbid":"1086877644673539","fullname":"Khoi Nguyen","updated_time":"2015-08-03T03:43:13.198Z"},{"fbid":"1087418431273208","fullname":"Tam Le","updated_time":"2015-08-03T03:42:07.318Z"},{"fbid":"927221697337225","fullname":"Trịnh Kai","updated_time":"2015-07-16T03:25:26.495Z"},{"fbid":"908119825916668","fullname":"Bền Trần","updated_time":"2015-08-03T03:42:54.692Z"},{"fbid":"1035691923117431","fullname":"Linh Nguyen Nhat","updated_time":"2015-08-03T03:26:36.199Z"},{"fbid":"599182770184768","fullname":"Linh","updated_time":"2015-08-03T03:24:56.162Z"},{"fbid":"955727414449455","fullname":"Phuc Dang","updated_time":"2015-06-23T03:12:40.077Z"},{"fbid":"471326949710156","fullname":"Tuan Chau","updated_time":"2015-06-25T03:31:29.454Z"},{"fbid":"844370105629981","fullname":"Nguyễn Minh Hùng","updated_time":"2015-07-13T03:31:45.913Z"},{"fbid":"805432136237589","fullname":"Phương Trang","updated_time":"2015-06-23T03:15:27.588Z"},{"fbid":"908410809231089","fullname":"Phạm Đăng Vinh","updated_time":"2015-07-13T03:32:28.493Z"},{"fbid":"10200661019884842","fullname":"Nguyễn Phước Quý","updated_time":"2015-06-25T03:30:20.429Z"},{"fbid":"942620989121603","fullname":"Lê Minh Truyền","updated_time":"2015-07-13T03:32:57.456Z"},{"fbid":"849853361734506","fullname":"Lê Anh Nam","updated_time":"2015-08-03T03:35:09.654Z"},{"fbid":"646611202107474","fullname":"Hoàng Bình","updated_time":"2015-06-25T03:33:50.295Z"},{"fbid":"479638558878630","fullname":"Tuan Vu","updated_time":"2015-06-23T03:13:28.304Z"},{"fbid":"886068918130996","fullname":"Thiện Nguyễn","updated_time":"2015-06-23T03:13:39.579Z"},{"fbid":"417301545124887","fullname":"Liên Lâm","updated_time":"2015-06-23T03:13:40.507Z"},{"fbid":"1136755973008341","fullname":"Nguyen Tuan","updated_time":"2015-07-13T03:33:22.893Z"},{"fbid":"1451474645171530","fullname":"Cô Giáo Thảo","updated_time":"2015-06-23T03:19:33.502Z"},{"fbid":"788597504570968","fullname":"Võ Hoàng Sang","updated_time":"2015-07-16T03:26:23.958Z"},{"fbid":"854345264614618","fullname":"Dung Nguyen","updated_time":"2015-06-23T03:30:26.482Z"},{"fbid":"10204475817198484","fullname":"Nguyễn Mậu Quang Vũ","updated_time":"2015-08-03T03:38:41.552Z"},{"fbid":"undefined","fullname":"undefined","updated_time":"2015-06-25T03:34:32.577Z"},{"fbid":"745334455575503","fullname":"Phúc Toàn Trương","updated_time":"2015-07-13T03:33:01.635Z"},{"fbid":"902399413136263","fullname":"Anh Khoa","updated_time":"2015-06-25T03:35:18.776Z"},{"fbid":"485723489275","fullname":"Sang Vo","updated_time":"2015-07-10T03:24:48.096Z"},{"fbid":"BillGates","fullname":"Tuan Chau","updated_time":"2015-08-03T03:47:00.743Z"}]};
	});
		
}

function store(users) {
	return true;
}

function clear() {
	return true;
}

module.exports = {
	list,
	store,
	clear
};