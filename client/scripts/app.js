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
    console.log(i, messages[i]['text']);
    var msg = $().add("<span>").addClass("message").text(messages[i]['text']).add("<br>");
    // "User: ",messages[i]['username'],"   Message: ",messages[i]['text'],"   Room: ",messages[i]['room']);
    $(".messages").append(msg);
  }
  //$("body").append("<div>HELLO</div>").addClass("messages");
}


var setMessage = function(message) {
  console.log(message.val());
};

$(document).ready(function() {
  $("body").append("<div class='messages'></div>");
  getMessages();
});


