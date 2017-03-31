$(document).ready(function(){
    if(activeUser!="nl"){
        $(".title").html("Welcome, " + activeUser);
        $(".buttons").empty();
        $(".buttons").html("<a href=\"/logout\"><button class=\"logout b\" >Logout / Homepage</button></a><a href=\"/myPolls\"><button class=\"myPolls b\" >My Polls</button></a>")
    }
})