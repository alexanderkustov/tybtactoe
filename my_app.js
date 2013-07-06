Messages = new Meteor.Collection('messages');
var player1 = true;
var red = new Array();
var blue = new Array();

var checkwin = function(){
alert(Arrays.asList(red).contains(0));
  
  if(countClick > 8){
    alert("no one won" + countClick)
  }
};

if (Meteor.isClient) {
  var countClick = 0;

  Template.messages.messages = function(){
    return Messages.find({}, { sort: { time: -1 }});
  }

  Template.gameboard.events ={
    'click': function (event) {

      var clickedElement = event.target;
      console.log(clickedElement.id);

  if(player1 == true){
     $(clickedElement).css("background-color",'#f00');
     player1 = false;
     red.push(clickedElement.id)
    }
  else{
    $(clickedElement).css("background-color",'#00f');
    player1 = true;
    blue.push(clickedElement.id)
}

      checkwin();
      countClick++;
    }

  }


  Template.entryfield.events = {
    "keydown #message": function(event){

      if(event.which == 13){
      // Submit the form
      var emails = Meteor.user().emails[0].address;

      console.log(emails)

      var message = document.getElementById('message');

      if(message.value != ''){
        Messages.insert({
          emails: emails,
          message: message.value,
          time: Date.now()
        });

        message.value = '';
      }
    }
  }
}
}

if (Meteor.is_server) {
  Meteor.startup(function () {


  });
}