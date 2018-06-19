$( document ).ready(function() {
    $("#cancel").click(function(){
        
        $("#guide_information").css("display","none");
        $("#guide_table_section").css("display","inline");
        
    });
    
    $("#guide001_container").click(function(){
        
        $("#guide_information").css("display","inline");
        $("#guide_table_section").css("display","none");

        $.ajax({
          method: "post",
          url: "./get_tour",
          data: {
            shaked: true
          },
          success: function(data) {
            $('#comment').append(data)
          }
        })
        
    });
});
