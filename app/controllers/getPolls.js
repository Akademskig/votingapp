

document.addEventListener("DOMContentLoaded", function() {
  
  var existingPolls= document.querySelector(".existingPolls");
  var appUrl=window.location.origin;
  if(activeUser != 0){
    getData('/getAllPolls')
  }
  else{
    getData('/getMyPoll')
  }
  
  
  function getData(route){
   $.get(appUrl+route, function(data){
      
        var idd;
        var ident;
        var pollName;
        var name;
        var k= 0;
        data.forEach(function(val, j){
          ident= String.fromCharCode(j+97);
          idd=val.id;
          var link=appUrl+'/'+idd;
          var pollOptions=[];
          pollName = val.pollname;
         
          val.polloptions.forEach(function(opt){
            pollOptions.push(opt);
          });
          var whosPoll= val.user;
          var anchor=document.createElement("a");
          $(anchor).attr("href", link)
          var poll = document.createElement("div");
          
          poll.className = "poll";
          name = document.createElement("div");
          name.className="pollName";
          var nameAndUser=pollName+"<p class=\"user\">by "+whosPoll+"</p>";
         
          if($("#username").val()==undefined){
            $(name).html(nameAndUser)
          }
          else{
            $(name).html(pollName)
          }
          
          
          var pollColors={0: '#FF4000',1:'#013ADF', 2: '#0B610B', 3:'#6A0888' , 4: '#8A0808' , 5: '#0B173B' , 6: '#DF7401' };
          
          if(k >6){
            k=0
          }
          name.style.background= pollColors[k]
          k++
          
          
          //---------REMOVE BUTTONS----------------
          
          var removePollButton= document.createElement("button");
          removePollButton.className="removeButton";
          var textremove=document.createTextNode("X");
          removePollButton.appendChild(textremove);
          
          
          poll.appendChild(name);
          anchor.appendChild(poll);
          existingPolls.appendChild(anchor);
          existingPolls.appendChild(removePollButton);
          
          if(activeUser!='Akademskig' && activeUser !=0){
            $(".removeButton").addClass("noDisplay")
          }
          
          //--------REMOVE BUTTONS FUNCTION------------
          
          var pollToRemove={'pollname': val.pollname};
          var nodeToRemove=removePollButton.previousElementSibling;
          
          $(removePollButton).on("click", function(){
            $.post(appUrl+'/removePoll', pollToRemove, function(){
              $(nodeToRemove).remove();
              $(removePollButton).remove();
            })
              
          })
        })
    })
  }
})

