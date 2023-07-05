module.exports.login = function(req,res){
    res.status(200).json({
        login: 'login from controller'
    })
}

module.exports.register = function (req,res) {
    res.status(200).json({
        register: 'register from controller'
    })
}