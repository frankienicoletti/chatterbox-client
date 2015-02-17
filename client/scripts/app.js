// // YOUR CODE HERE:
var app = {
  rooms: {},

  server: "https://api.parse.com/1/classes/chatterbox",

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
    $(".messages").html("");
  },

  addMessage: function(message){
    if (!message['updatedAt']) {
      message['updatedAt'] = new Date().toISOString();
    }
    if (!message['roomname']) {
      message['roomname'] = 'main1';
    }
    message['roomname'] = _.escape(message['roomname']);
    this.addRoom(message['roomname']);
    this.rooms[message['roomname']].push(message);
    var msgBox =  $().add("<span>").addClass("message");
    msgBox.append($().add("<span>").addClass("user").text(message['username']));
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

  getUserName: function(URL) {
    var start = URL.search("username") + 9;
    return URL.slice(start);
  },

  addRoom: function(roomname) {
    console.log(123,roomname);
    if (!this.rooms[roomname]) {
      this.rooms[roomname] = [];
      var roomBox = $("#roomSelect")
      var room = $().add("<span>").addClass("roomButton").attr('id',roomname).text(roomname);
      roomBox.append(room);
      room.on('click',function(room){console.log(room)});
    }
  }
};

$(document).ready(function() {
  app.init();
});







