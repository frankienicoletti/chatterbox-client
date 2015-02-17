// // YOUR CODE HERE:

var message = {
  'username': 'shawndrost',
  'text': 'trololo',
  'roomname': '4chan'
};

function sendMessage(){
  // HAS NOT BEEN COMPLETED YET
  // $.ajax({
  //   // always use this url
  //   url: 'https://api.parse.com/1/classes/chatterbox',
  //   type: 'POST',
  //   data: JSON.stringify(message),
  //   contentType: 'application/json',
  //   success: function (data) {
  //     console.log('chatterbox: Message sent');
  //   },
  //   error: function (data) {
  //     // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
  //     console.error('chatterbox: Failed to send message');
  //   }
  // });
}


function getMessages(){
  $.ajax({
  // always use this url
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'GET',
  contentType: 'application/json',
  where: {'updatedAt': {'$gte':"2014-12-29T23:07:38.153Z"}},
  //where: {'updatedAt': {'$gte':"2014-12-29T23:07:38.153Z"}},
  success: function (data) {
    console.log('chatterbox: Message received');
    readMessages(data);
  },
  error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to get message');
  }
  });
}

function readMessages(messageObj){
  var messages = messageObj['results'];
  for (var i = 0; i < 100; i++){
    var msgBox = $().add("<span>").addClass("message");
    msgBox.append($().add("<span>").addClass("user").text(messages[i]['username']));
    msgBox.append($().add("<span>").addClass("time").text(messages[i]['updatedAt']));
    msgBox.append($().add("<span>").addClass("msgText").text(messages[i]['text']));
    msgBox.append("<br>");
    $(".messages").append(msgBox);
  }
}


var setMessage = function(message) {
  console.log(message.val());
};

$(document).ready(function() {
  $("body").append("<div class='messages'></div>");
  getMessages();
});


