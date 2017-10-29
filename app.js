  var myFacebookToken = 'EAACEdEose0cBADknyLLyvn5BV5RTNUcH3AnvSY4ZBumRjTSg5eoTRAlm7wtR74GbA1KB1tCdtEBxfak3TbDncBTW3kPTeeKsVjepdjILQVZBOBmSXZB8X8U2euTOnCQRRnlZBgQ7uCNqMmlQ3mAdZBZAcwGkSpuDmWZC0L4RYawK2ylZBoNBbW2QuJEl0QdFf6Tk1aMErs9CTgZDZD';

  $( document ).ready(function() {
    getPosts();
  }); //called while loading the page

    function getPosts(){
        $("#profile").hide();
        $("#post").show();
        document.getElementById("posts").innerHTML=""; //clears post div
        $.ajax('https://graph.facebook.com/10152732846734529?fields=posts{story,message,picture}&access_token='+myFacebookToken,{

                success : function(response){
                    console.log(response);
                    console.log(typeof(response));
                    
                    response.posts.data.forEach(function(item){
                            if(item.message == undefined)
                            {
                                item.message="";
                            } //to check if any null messages
                            if(item.story == undefined)
                            {
                                item.story="";
                            } //to check if any null story
                            var post='<div class="col-12" align="center"><span>'+item.story+'</span></div><div class="col-12" align="center"><span>'+item.message+'</span></div><div class="col-12" align="center"><img src="'+item.picture+'" id="picture"></div><br>';
                            $("#posts").append(post);
                    });//end of for loop used to parse through all posts
                }
            }//end argument list 
        );// end ajax call 
    }// end get post

    function getProfile(){
        $("#post").hide();
        $("#profile").show();
        $.ajax('https://graph.facebook.com/10152732846734529?fields=id,about,name,picture.width(800).height(800),birthday,email,gender,hometown&access_token='+myFacebookToken,{

                success : function(response){
                    console.log(response);
                    console.log(typeof(response));                    

                    document.getElementById("userPicture").setAttribute("src",response.picture.data.url);
                    $("#userName").text(response.name);
                    $("#userBday").text(response.birthday);
                    $("#userGender").text(response.gender);
                    $("#userHometown").text(response.hometown.name);
                }
            }//end argument list 
        );// end ajax call 
    }//end get profile