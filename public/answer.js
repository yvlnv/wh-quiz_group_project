$(".option").on("click",function() {
    if($(this).hasClass("active")){
      $(this).removeClass("active");
    } else{
      $(".option.active").removeClass("active");
      $(this).addClass("active");
    }
  });
