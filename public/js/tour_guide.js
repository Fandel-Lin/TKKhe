$( document ).ready(function() {
    
    $("#cancel").click(function(){
        
        $("#guide_information").css("display","none");
        $("#guide_table_section").css("display","inline");
        
    });
    
    $("#guide001").click(function(){
        
        $("#guide_information").css("display","inline");
        $("#guide_table_section").css("display","none");
        
    });
    
    
    
});