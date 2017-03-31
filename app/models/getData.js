 
 
 
 function getData(route){
   $.get(appUrl+route, function(data){
      
        var idd;
        var ident;
        var pollName;
        var name;
        
        console.log(data)
        data.forEach(function(val, j){
          ident= String.fromCharCode(j+97);
          idd=val.id;
          var link=appUrl+'/'+idd;
          var pollOptions=[];
          pollName = val.pollname;
          // pol options array
          val.polloptions.forEach(function(opt){
            pollOptions.push(opt);
            console.log("opt:" +opt)
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
          
          var checkifVoted= false;
          var optionsDiv = document.createElement("div");
          $(optionsDiv).addClass("existingOption noDisplay");
          
           //-------------OPTION NODES -----------------------
          pollOptions.forEach(function(val,i){
            
            var ident2=String.fromCharCode(i+97)
            var optionNum= ident+ident2;
            
            var opt = document.createElement("div");
            var optName=document.createElement("span");
            //console.log(optionNum);
            opt.className="opti";
            $(opt).attr("id",optionNum);
            var textOpt=document.createTextNode(val.optname);
            optName.appendChild(textOpt);
            opt.appendChild(optName);
            //--------votes----------------
            
            var votes=document.createElement("span");
            votes.className="votes";
            var voteText=document.createTextNode(val.votecount);
            votes.appendChild(voteText);
            opt.appendChild(votes);
            optionsDiv.appendChild(opt);
            //---------------------
            
            //---------EVENT LISTENER----------------------
            var id=optionsDiv.querySelector("#"+optionNum);
            
            var vote={"pollName": pollName, "polloption": val}
            //console.log(vote)
            var count=vote.polloption.votecount;
            id.addEventListener("click",function(){
              if (!checkifVoted){
                count++;
                checkifVoted= true;
                $(votes).html(count);
                $.post(appUrl+'/vote',vote, function(){               //alert("You voted "+ vote.polloption.optname);
                })
              }
              else{
                alert("You already voted!");
              }
              event.preventDefault();
            })
            //------------------------------------
          })
          //---------END OPTION NODES------------
          
          //---------REMOVE BUTTONS----------------
          
          var removePollButton= document.createElement("button");
          removePollButton.className="removeButton";
          var textremove=document.createTextNode("x");
          removePollButton.appendChild(textremove);
          
          poll.appendChild(name);
          poll.appendChild(optionsDiv);
          anchor.appendChild(poll);
          existingPolls.appendChild(anchor);
          existingPolls.appendChild(removePollButton);
          //allUsersPolls.appendChild(poll);
          
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
  
