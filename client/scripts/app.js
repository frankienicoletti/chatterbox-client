// // YOUR CODE HERE:

var message = {
  'username': 'shawndrost',
  'text': 'trololo',
  'roomname': '4chan'
};

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

var messageRec = $.ajax({
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
console.log(messageRec);

function readMessages(messageObj){
  var messages = messageObj['results'];
  for (var i = 0; i < messages.length; i++){
    console.log("User: ",messages[i]['username'],"   Message: ",messages[i]['text'],"   Room: ",messages[i]['room']);
  }
}




var setMessage = function(message) {
  console.log(message.val());
};