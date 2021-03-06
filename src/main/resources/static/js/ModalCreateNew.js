"use strict";
App.ModalCreateNew=function(){
	
	  var __ajax=function(url, method, data){
			
		  if(data!=null){
			  data=JSON.stringify(data);
		  }else{
			  data=null;
		  }
	      var dfd= new $.Deferred()
	      $.ajax({
	    	  url         : url,
	          async       : true,
	          type        : method,
	          contentType : "application/json",
	          data        : data,
	          success     : dfd.resolve,
	          error       : dfd.resolve
	      });
	      return   dfd.promise();
		  
	  };
	  var __readNew= function(){
	  	  
			 
		  var promise=__ajax("api/read/0","GET",null);
		  promise.then(function(response){		  
			  console.info(response);		  
		  });  
		  
	  };

	 var __newPost=function(){
		 $('#id_boton').click(function(){      
			 /*Captura de datos escrito en los inputs*/      
			 var news={
					 author:{name:document.getElementById("id_au").value,mail:document.getElementById("id_mail").value},
					 title:document.getElementById("id_tittle").value,
					 content:document.getElementById("id_body").value
			 };
			 console.log(news);
			 var promise=__ajax("api/create","POST",news);
			  promise.then(function(response){
				  if(response.status!=undefined && response.status==500){
					  document.getElementById("id_warning").className="bg-warning";
					  document.getElementById("id_warning").innerHTML = response.statusText;
				  }
				  else{
					  $.event.trigger({
					      type: "ModalCreateNew_newCreated",
					      message: "ok"
					    });
					  /*Limpiando los campos o inputs*/
					  
					  document.getElementById("id_au").value = "";
					  document.getElementById("id_mail").value = "";
					  document.getElementById("id_tittle").value = "";
					  document.getElementById("id_body").value = "";
					  $("#modal_create_post_id").modal('hide');
				  }
				  console.info(response);
				  __readNew();
			  });
		});
	 };

	 /**public**/
	  return{

	  newPost:function(){__newPost();}
	       
	  };
}