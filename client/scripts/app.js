// // YOUR CODE HERE:
var app = {
  rooms: {},

  server: "https://api.parse.com/1/classes/chatterbox",

  friends: {},

  init: function(){
    $('body').append('<div class="rooms" id="roomSelect"></div>');
    $('body').append('<div class="messages" id="chats"></div>');
    app.fetch();
  },

  send: function(message){
    var context = this;
    $.ajax({
      url: context.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });
  },

  fetch: function() {
    var context = this;
    $.ajax({
      // always use this url
      url: context.server,
      type: 'GET',
      contentType: 'application/json',
      data: "order=-createdAt",
      success: function (data) {
        console.log('chatterbox: Message received');
        context.readMessages(data);
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to get message');
      }
    });
  },

  clearMessages: function() {
    $(".messages").empty();
  },

  addMessage: function(message){
    if (!message['updatedAt']) {
      message['updatedAt'] = new Date().toISOString();
    }
    if (!message['roomname']) {
      message['roomname'] = 'lobby';
    }
    message['roomname'] = _.escape(message['roomname']);
    if (!this.rooms[message['roomname']]){
      this.addRoom(message['roomname']);
    }
    if (this.rooms[message['roomname']].indexOf(message) === -1) {
      this.rooms[message['roomname']].push(message);
    }
    var msgBox =  $().add("<span>").addClass("message");
    if (message['username'] in this.friends){
      msgBox.addClass("friend");
    }
    var user = $().add("<span>").addClass("user").text(message['username']);
    var context = this;
    user.on('click',function(){
      context.friends[message['username']] = true;
      $(".message:contains('"+message['username']+"')").addClass("friend");
    });
    msgBox.append(user);
    msgBox.append($().add("<span>").addClass("time").text(message['updatedAt']));
    msgBox.append($().add("<span>").addClass("msgText").text(message['text']));
    msgBox.append("<br>");
    $(".messages").append(msgBox);
  },

  readMessages: function(messageObj){
    var messages = messageObj['results'];
    for (var i = 0; i < messages.length ; i++){
      this.addMessage(messages[i]);
    }
  },
  readMessages1: function(messageObj){
    var messages = messageObj['results'];
    console.dir(messages);
    console.log(messages.length);
    this.addMessage(messages[0]);
    for (var i = 0; i < messages.length ; i++){
      this.addMessage(messages[i]);
    }
  },

  getUserName: function(URL) {
    var start = URL.search("username") + 9;
    return URL.slice(start);
  },

  addRoom: function(roomname) {
    var context = this;
    if (!this.rooms[roomname]) {
      this.rooms[roomname] = [];
      var roomBox = $("#roomSelect");
      var room = $().add("<span>").addClass("roomButton").attr('id',roomname).text(roomname);
      roomBox.append(room);
      room.on('click',function(room){
        var array = context.rooms[roomname];
        context.clearMessages();
        context.readMessages1({'results':array});
      });
    }
  }
};


$(document).ready(function() {
  app.init();
});







