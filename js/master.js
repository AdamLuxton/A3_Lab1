(function(){
  //console.log("SEAF Fired");
  var carImages = document.querySelectorAll(".thumbInfo img"),
      name = document.querySelector(".modelName"),
      info = document.querySelector(".priceInfo"),
      details = document.querySelector(".modelDetails"),
      subhead = document.querySelector(".subhead"),
      httpRequest;

  function makeRequest(){
     //console.log("running");
     httpRequest = new XMLHttpRequest();

     if(!httpRequest){
       console.log('Your browser is too old, please update.');
       return false;
      }

     var url = 'includes/ajaxQuery.php'+'?model='+this.id;
     httpRequest.onreadystatechange = showResults;
     httpRequest.open('GET', url);
     httpRequest.send();
   }

   function showResults(){
     //console.log("fired");
     if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200){
       var car = JSON.parse(httpRequest.responseText);

       [].forEach.call(carImages, function(img){
         if(img.id != car.model){
           img.classList.remove("focusMini");
           img.classList.add("nonActive");
         }
         else{
           img.classList.remove("nonActive");
           img.classList.add("focusMini");
         }
       });
       subhead.firstChild.nodeValue = "SELECT YOUR MODEL : " + car.modelName + " " + car.model;
       name.firstChild.nodeValue = car.modelName;
       info.firstChild.nodeValue = "$" + car.pricing;
       details.firstChild.nodeValue = car.modelDetails;
     }

   }



  [].forEach.call(carImages, function(img){
    img.addEventListener('click', makeRequest, false);
  });

})();
