$( document ).ready(function() {
    $("#cancel").click(function(){
        
        $("#guide_information").css("display","none");
        $("#guide_table_section").css("display","inline");
        
    });
    
    $("#guide001").click(function(){
        
        $("#guide_information").css("display","inline");
        $("#guide_table_section").css("display","none");
        if (window.localStorage.commentShow == 'true'){
          console.log('aaa')
          $('#comment').append(
            '<tbody class="commenter_table" >'+
            '<tr><td id="commenter002"></td>'+
            '<td class="commenter_name" id="comment002_name">羅&nbsp;&nbsp;ㄧ&nbsp;&nbsp;中<br/>'+
            '<div id="commenter_star001">'+
            '<i class="star icon"></i>'+
            '<i class="star icon"></i>'+
            '<i class="star icon"></i>'+
            '<i class="star icon"></i>'+
            '<i class="star outline icon"></i>'+
            '<h id="commenter002_comment_time">15小時前</h>'+
            '<p id="commenter001_comment">投給L組><！！</p>'+
            '</div></td></tbody>')
        }    
        
    });
    
    
    
});
