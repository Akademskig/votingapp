 function checkifValid(){
      var matchNonC=$(this).val().match(/[!"#$%&'()*+,-./:;<=>@[\]^_`{|}~]/i)
        if(matchNonC!=null){
            $(this).removeClass('okInput')
            $(this).addClass("invalidInput");
            $('.submitButt').prop('disabled',true);
            $('.submitButt').addClass('disabled');
            $('.submitButt').removeClass('enabled')
            $('.warning').removeClass('noDisplay')

        }
        else{
            $(this).addClass("okInput");
            $(this).removeClass("invalidInput");
            $('.submitButt').prop('disabled',false);
            $('.submitButt').addClass('enabled');
            $('.submitButt').removeClass('disabled')
            $('.warning').addClass('noDisplay')
        }
  }
  
