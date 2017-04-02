document.addEventListener("DOMContentLoaded", function() {
  var newPollButton = document.querySelector(".newPoll");
  var form = document.querySelector("#newPollForm");
  var newOption = document.querySelector(".newOption");
  var options = document.querySelector(".newoptions");
  var removeButton = document.querySelector(".removeOption")
  
  var counter=1;
  newPollButton.addEventListener("click", function() {
    if (form.classList.contains("noDisplay")) {
      form.classList.remove("noDisplay");
    } else {
      form.classList.add("noDisplay");
    }
  })
  var optNum=null;
  
  newOption.addEventListener("click", function() {
    var node = document.createElement("div");
    var input = document.createElement("input");
    var button = document.createElement("button");
    var buttonText = document.createTextNode("x");

    node.className = "newoption";
    input.type = "text";
    input.name = "pollOption";
    
    if(optNum){
        input.className=optNum
        optNum=null;
    }
    else{
        counter++;
        input.className='opt'+counter
    }  
    
    button.setAttribute("type", "button");
    button.setAttribute("class", "removeOption");
    
    button.addEventListener("click", function() {
      optNum= this.previousSibling.className;
      this.parentNode.remove();
    });
    
    input.addEventListener('input',checkifValid)

    options.appendChild(node).appendChild(input);
    node.appendChild(button).appendChild(buttonText);
  })
   
   $('input[type=text]').on('input',checkifValid)

  removeButton.addEventListener("click", function() {
    optNum= this.previousSibling.className;
    this.parentNode.remove();
  })
  
  //------CHECK IF INPUT FIELDS ARE NOT BLANK OR IDENTICAL---------------
   $('.submitButt').mouseenter(function(){
     if(!$('input[name=pollName]').val()){
         $('.submitButt').prop('disabled',true);
         $('.submitButt').addClass('disabled');
         $('.submitButt').removeClass('enabled')
         $('input[name=pollName]').addClass('invalidInput')
        return
     }
     for(var i = 1; i<= counter; i++){
       for(var j=1; j <= counter; j++){
           if($('input.opt'+j).val()==undefined || $('input.opt'+i).val()==undefined){
               continue;
           }
           if(!$('input.opt'+j).val()){
               console.log($('input.opt'+j).val())
                console.log(counter)
             $('.submitButt').prop('disabled',true);
             $('.submitButt').addClass('disabled');
             $('.submitButt').removeClass('enabled')
              $('input.opt'+j).addClass('invalidInput')
              return
           }
         if(i ==j){
           continue;
         }
         if($('input.opt'+i).val().toLowerCase() == $('input.opt'+j).val().toLowerCase()){
             $('input.opt'+i).addClass('invalidInput')
             $('input.opt'+j).addClass('invalidInput')
             $('.submitButt').prop('disabled',true);
             $('.submitButt').addClass('disabled');
             $('.submitButt').removeClass('enabled')
             $('.warningEO').removeClass('noDisplay')
             return
         }
         else {
            $('input.opt'+i).removeClass('invalidInput')
            $('input.opt'+j).removeClass('invalidInput')
            $('.submitButt').prop('disabled',false);
            $('.submitButt').addClass('enabled');
            $('.submitButt').removeClass('disabled')
            $('.warningEO').addClass('noDisplay')
         }
       }
     }
  })
  //--------------------
 
})

 