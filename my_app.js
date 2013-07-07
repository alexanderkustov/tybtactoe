Messages = new Meteor.Collection('messages');
Jogadas = new Meteor.Collection('jogadas');
var current_player = 0;
var player1 = true;

var checkwin = function(){
  Jogadas.find({}, {sort: {jogadas: 1}});
  console.log(Jogadas)
};

if (Meteor.isClient) {
  var countClick = 0;

  Template.jogadas.jogadas = function(){
    return Jogadas.find({}, { sort: { time: -1 }});
  }

  Template.messages.messages = function(){
    return Messages.find({}, { sort: { time: -1 }});
  }


  Template.gameboard.events ={
    'click': function (event) {

      var clickedElement = event.target;
      var jogadas = clickedElement.id;

      console.log(jogadas);

      if(player1 == false)
        current_player=1;
      else
        current_player=0;

      Jogadas.insert({
        jogada: jogadas,
        player: current_player,
        time: Date.now()
      });

      if(player1 == true){
       $(clickedElement).css("background-color",'#fbcece');
        player1 = false;

     }
     else{
      $(clickedElement).css("background-color",'#bebeff');
      player1 = true;
      checkwin();
    }
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
      Jogadas.remove({});
      Messages.remove({});
    //nada
  });
}