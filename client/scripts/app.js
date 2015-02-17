// // YOUR CODE HERE:
var app = {
  init: function(){

  },
  server: "https://api.parse.com/1/classes/chatterbox",
  send: function(message){
    $.ajax({
      url: this.server,
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
    $.ajax({
      // always use this url
      url: this.server,
      type: 'GET',
      contentType: 'application/json',
      data: "order=-createdAt",
      success: function (data) {
        console.log('chatterbox: Message received');
        readMessages(data);
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to get message');
      }
    });
  },
  clearMessages: function() {
    $(".messages").html("");
    console.log(document.body);
  }
};

// var message = {
//   'username': getUserName(document.URL),
//   'text': text,
//   'roomname': roomname
// };


function readMessages(messageObj){
  var messages = messageObj['results'];
  for (var i = 0; i < messages.length ; i++){
    var msgBox = $().add("<span>").addClass("message");
    msgBox.append($().add("<span>").addClass("user").text(messages[i]['username']));
    msgBox.append($().add("<span>").addClass("time").text(messages[i]['updatedAt']));
    msgBox.append($().add("<span>").addClass("msgText").text(messages[i]['text']));
    msgBox.append("<br>");
    $(".messages").append(msgBox);
  }
}


var setMessage = function(message) {
  console.log(document.URL,123);
};

$(document).ready(function() {
  $("body").append("<div class='messages' id='chats'></div>");
  app.fetch();
});

function getUserName(URL){
  var start = URL.search("username") + 9;
  return URL.slice(start);
};


