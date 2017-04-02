 function checkifValid(){
   
      var matchNonC=$(this).val().match(/[!"#$%&'()*+,-./:;<=>@[\]^_`{|}~]/i)
        if(matchNonC!=null){
            $(this).addClass("invalidInput");
            $('.submitButt').prop('disabled',true);
            $('.submitButt').addClass('disabled');
            $('.submitButt').removeClass('enabled')
            $('.warning').removeClass('noDisplay')

        }
        else{
            $(this).removeClass("invalidInput");
            $('.submitButt').prop('disabled',false);
            $('.submitButt').addClass('enabled');
            $('.submitButt').removeClass('disabled')
            $('.warning').addClass('noDisplay')
        }
        
        this.nextElementSibling.addEventListener('click',function(){
            $('.submitButt').prop('disabled',false);
            $('.submitButt').addClass('enabled');
            $('.submitButt').removeClass('disabled')
            $('.warning').addClass('noDisplay')
        })
  }
  
