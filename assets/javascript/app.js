// Initialize Firebase
var config = {
  apiKey: "AIzaSyCOHLQwaDICS7zh3eI3HkLsaEg8WJh7ck8",
  authDomain: "rps-project-f5ad8.firebaseapp.com",
  databaseURL: "https://rps-project-f5ad8.firebaseio.com",
  projectId: "rps-project-f5ad8",
  storageBucket: "rps-project-f5ad8.appspot.com",
  messagingSenderId: "583403809805"
};
firebase.initializeApp(config);

$(document).on("click", ".rps", function () {
  console.log("I WAS CLICKED" + $(this).val());
});
var database = firebase.database();
var playerCon = database.ref(".info/connected");
var Player1loss = 0;
var Player1win = 0;
var Player2loss = 0;
var Player2win = 0;
var numPlayers;
var turn=0;
var userName="";
var Player1choice="";
var Player2choice="";
var counter1=0;
var counter2=0;
var arry = ["Rock", "Paper", "Scissors"];
function start(){
database.ref("player").on("value", function(snapshot) {
  numPlayers = snapshot.numChildren();
  // displayButton()
  // if numChildren is 0 - then startPlayer(1)
  // if numChildren is 1 - then startPlayer(2)

  if (numPlayers === 0) {
    $(".playerOne").empty();
    $(".playerTwo").empty();
    $(".playerOne").html("Waiting for Player1...");
    $(".playerTwo").html("Waiting for Player2...");
  } else {
    // find out if player 1 or player 2
    if(snapshot.child("1").exists()) {
      // $(".playerOne").attr("id","playerOne_1")
      // $(".name").html(`<h1>Hi, ${snapshot.child("1").val().names}, you are player1 `)
      $("#playerOne").html(
        `<h1 id="Player1Name">${snapshot.child("1").val().names}</h1>
        <br>
        <br>
         <p>Wins:${snapshot.child("1").val().wins} Losses: ${snapshot.child("1").val().losses}</p>
        `
      );
    
    
      /// put the rest of the data
    } else {
      
      $("#playerOne").empty();
      $(".playerOne").html("Waiting for Player1...");
    }
    if (snapshot.child("2").exists()){
      $("#playerTwo").html(
        `<h1 id="Player2Name">${snapshot.child("2").val().names}</h1>
         <br>
         <br>
         <br>
         <p>Wins:${snapshot.child("2").val().wins} Losses: ${snapshot.child("2").val().losses}</p>
        `
      );
     
    } else {
      $("#playerTwo").empty();
      $(".playerTwo").html("Waiting for Player2...");
    }
  }

  if(numPlayers===2){
    $(".playerTwo_2").html(
      `<h1 id="Player2Name">${snapshot.child("2").val().names}</h1>
       <p class="spr" value="r">Rock</p>
       <p class="spr" value="p">Paper</p>
       <p class="spr" value="s">Scissors</p>
       <p>Wins:${snapshot.child("2").val().wins} Losses: ${snapshot.child("2").val().losses}</p>
      `
    );
    $(".spr").css("visibility","hidden");
    
    $(".playerOne_1").html(
      `<h1 id="Player1Name">${snapshot.child("1").val().names}</h1>
      <p class="rps" value="r">Rock</p>
      <p class="rps" value="p">Paper</p>
      <p class="rps" value="s">Scissors</p>
       <p>Wins:${snapshot.child("1").val().wins} Losses: ${snapshot.child("1").val().losses}</p>
      `
    );
    if(snapshot.child("2").exists() && !snapshot.child("1/choice").exists() ){
      $(".join").text("it is Your Turn!!!!")
    }

    if(!snapshot.child("2/choice").exists() && snapshot.child("1/choice").exists() ){
      $("#choose").text("it is Your Turn!!!!")
      $(".spr").css("visibility","visible");
    }
    
     player1_click();
     player2_clkick();
      
    if(snapshot.child("1/choice").exists() && snapshot.child("2/choice").exists() ){
      if(snapshot.child("1").val().choice !=="" && snapshot.child("2").val().choice !==""  ){
        Player1choice=snapshot.child("1").val().choice;
        Player2choice=snapshot.child("2").val().choice;
        $("#playerTwo").html(
          `<h1 id="Player2Name">${snapshot.child("2").val().names}</h1>
           <h1>${Player2choice}</h1>
           <br>
           <br>
           <p>Wins:${snapshot.child("2").val().wins} Losses: ${snapshot.child("2").val().losses}</p>
          `
        );
        
        $("#playerOne").html(
          `<h1 id="Player1Name">${snapshot.child("1").val().names}</h1>
           <h1>${Player1choice}</h1>
           <br>
           <br>
           <p>Wins:${snapshot.child("1").val().wins} Losses: ${snapshot.child("1").val().losses}</p>
          `
        );

      }

      }
      if(Player1choice !=="" && Player2choice !=="" && counter1 !==0){
       test();
        
        counter1=0;
        
        database.ref("player/1").set({
          
          wins:Player1win,
          names:snapshot.child("1").val().names,
          losses:Player1loss
        })
        database.ref("player/2").set({
          
          wins:Player2win,
          names:snapshot.child("2").val().names,
          losses:Player2loss
        })
        setTimeout(function(){
          $(".result").empty();
          counter1=1;
          
          // $("#playerOne").html(
          //   `<h1 id="Player1Name">${snapshot.child("1").val().names}</h1>
          //   <br>
          //   <br>
          //    <p>Wins:${snapshot.child("1").val().wins} Losses: ${snapshot.child("1").val().losses}</p>
          //   `
          // );
          // $("#playerTwo").html(
          //   `<h1 id="Player2Name">${snapshot.child("2").val().names}</h1>
          //    <br>
          //    <br>
          //    <br>
          //    <p>Wins:${snapshot.child("2").val().wins} Losses: ${snapshot.child("2").val().losses}</p>
          //   `
          // );
          // $(".playerTwo_2").html(
          //   `<h1 id="Player2Name">${snapshot.child("2").val().names}</h1>
          //    <p class="spr" value="r">Rock</p>
          //    <p class="spr" value="p">Paper</p>
          //    <p class="spr" value="s">Scissors</p>
          //    <p>Wins:${snapshot.child("2").val().wins} Losses: ${snapshot.child("2").val().losses}</p>
          //   `
          // );
          
          // $(".playerOne_1").html(
          //   `<h1 id="Player1Name">${snapshot.child("1").val().names}</h1>
          //   <p class="rps" value="r">Rock</p>
          //   <p class="rps" value="p">Paper</p>
          //   <p class="rps" value="s">Scissors</p>
          //    <p>Wins:${snapshot.child("1").val().wins} Losses: ${snapshot.child("1").val().losses}</p>
          //   `
          // );
          $(".spr").css("visibility","hidden");
          
          counter1=1;
          player1_click()
          player2_clkick()
          test()
          Player1choice="";
          Player2choice="";
        },2000)
      
      }
    }

      
  

  
});
}

function startPlayerOne() {
  // $(".playerOne").attr("id","playerOne")
  $(".playerOne").addClass("playerOne_1");
  $(".playerTwo").addClass("playerTwo_1")
  var conOne = database.ref("player/1");
  conOne.set({
    losses: Player1loss,
    wins: Player1win,
    names: $("#name").val().trim()
  });
  userName=$("#name").val().trim();
  conOne.onDisconnect().remove();
  
  $(".name").prepend(`<p>Hi, ${$("#name").val().trim()}  you are player1</p> `)
  $(".display").css("display","none")
  
  }

function startPlayerTwo() {
  $(".playerOne").addClass("playerOne_2")
  $(".playerTwo").addClass("playerTwo_2");
  var conTwo = database.ref("player/2");
  conTwo.set({
    losses: Player2loss,
    wins: Player2win,
    names: $("#name").val().trim()
  });

  conTwo.onDisconnect().remove();
    userName=$("#name").val().trim();
    $(".name").prepend(`<p>Hi, ${$("#name").val().trim()}  you are player2</p> `)
    $(".display").css("display","none")
   
    turn++;
  var gameTurn=database.ref()
    gameTurn.update({
      turn:turn
  });
    database.ref("turn").onDisconnect().remove();
 
}
function player1_click(){
 
    $(".rps").on("click",function(){  
      
      $(".join").text(`Waiting for ${$("#Player2Name").text()} to choose`);  
       
      Player1choice=$(this).text();
      database.ref("player/1").set({
        choice:Player1choice,
        wins:Player1win,
        names:$("#Player1Name").text(),
        losses:Player1loss
      })
     var player1_turn=0;
     player1_turn=player1_turn+2;
      database.ref().update({
        turn: player1_turn
      })
     
      
      counter1++;
    })
  }


function player2_clkick(){
  
    $(".spr").on("click",function(){
      
      Player2choice=$(this).text()
      
      database.ref("player/2").set({
        choice:Player2choice,
        wins:Player2win,
        names:$("#Player2Name").text(),
        losses:Player2loss
      })
    var player2_turn=0;
    player2_turn=player2_turn+3;
    database.ref().update({
      turn:player2_turn
    })
      
        counter1++
    })
  
}

$("#start").on("click", function(event) {
  event.preventDefault();
 
  if (numPlayers === 0) {
    $(".name").prepend(`<p class="join">Waiting for another person to join</p>`)
      startPlayerOne();
      
  } else if(numPlayers === 1) {
    
    
    $(".name").prepend(`<p id="choose">Waiting for ${$("#Player1Name").text()} to choose</p>`) 
    startPlayerTwo();
    
   
  }
});

function test(){
  if(Player1choice===Player2choice){
    $(".result").html(`Tie Game`) 
  }
  if(Player1choice==="Rock"){
    if(Player2choice==="Paper"){
        Player1loss++;
        Player2win++
        $(".result").html(`${$("#Player2Name").text()} Wins`) 
    }else{
      Player1win++;
      Player2loss++;
      $(".result").html(`${$("#Player1Name").text()} Wins`) 
    }
  }
  if(Player1choice==="Scissors"){
    if(Player2choice==="Rock"){
      Player1loss++;
      Player2win++;
      $(".result").html(`${$("#Player2Name").text()} Wins`) 
    }else{
      Player1win++;
      Player2loss++;
      $(".result").html(`${$("#Player1Name").text()} Wins`) 
    }
  }
}
$("#send").on("click", function (event) {
  event.preventDefault()
  if(userName!==""){
  var message = $("#chat").val();
  $("#chat").val("");
    saveMessage(userName, message);
    
  }
});

function saveMessage(user, message) {
   
  database.ref("chat").push({
    "message": message,
    "user":user
  });
  var chatCon=database.ref("chat")
  chatCon.onDisconnect().remove();
}

database.ref("chat").on("value", function (snapshot) {

  if (snapshot.val() == null) {
    return;
  }
  if(snapshot.val().user!==""){
  $(".chatbox").empty();
  var messages = snapshot.val();
  var keys = Object.keys(messages);
console.log(keys)
  for (var i = 0; i < keys.length; i++) {
    var aKey = keys[i];
    var messageUser = messages[aKey].user;
    var currentUser = userName;
    var messageHTML = "";
    messageHTML = `<div><b>${messages[aKey].user}</b>: ${snapshot.val()[aKey].message}</div>`;  
    $(".chatbox").append(messageHTML);
  }
}
});

start()



