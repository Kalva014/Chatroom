// Controller handler to handle functionality in home page

// Example for handle a get request at '/' endpoint.

const Room = require('../models/Rooms');

function getHome(request, response){
  Room.find().lean().then(items => {
    response.render('home', {title: 'home', rooms: items, isAvailable: true});
  });
}

module.exports = {
    getHome
};