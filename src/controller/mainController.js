const mainService = require("../services/mainService");

exports.createUrl = async(req, res) => {
  var created_url = await mainService.createShortUrl(req, res);
  return created_url;
};

exports.redirectUrl = async(req, res) => {
  var redirect = await mainService.redirectUrl(req, res);
  return redirect;
};
