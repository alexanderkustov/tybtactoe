Messages = new Meteor.Collection('messages');

if (Meteor.isClient) {

  Template.messages.messages = function(){
    return Messages.find({}, { sort: { time: -1 }});
  }
  
  Template.gameboard.events ={
    "click #table": function(event){
      console.log("adasd");
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

      if(message.value == 1){
        $(cell0).css("background-color",'#333 ');
      }

        message.value = '';
      }
    }
  }
}
}

if (Meteor.is_server) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}