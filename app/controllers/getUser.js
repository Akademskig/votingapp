document.addEventListener("DOMContentLoaded", function() {
    var appUrl=window.location.origin;
    var user= document.querySelector("#username");
    var userForm=document.querySelector("#user")
    
    var name=document.querySelector(".pollName")
   //------GET USER--------------
   $.get(appUrl+'/getUser', function(data){
       $(user).html(data.username+'!')
       console.log(data);
       $(userForm).val(data.username);
      
       if(data.username!=undefined){
           $(name).removeChild(name.firstChild);
       }
   })
})