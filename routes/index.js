module.exports = function(router, passport, path){
	
	router.get('/*', function(req, res){
		res.sendFile(path.join(__dirname, '../dist/index.html'));
	});
}