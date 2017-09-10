// important de le mettre avant la fonction (donc dans le global scope). Si je le mets dans la fonction,
// la variable number sera tjrs = à 0;
// qd on utilise append, le $('element') est PARENT
// posts.pop('p');   won't work because remove the last item of the array, and not the one we press 
// splice : pop l'item qu'on veut !  array.splice(index, howmany, item1, ....., itemX)
//SIBLINGS car les inputs sont dans le même div

var posts = [];
var number = 0;


$('.btn-primary').click(function () {
addPost();

var buttonRemovePost = '<input type="button" class="remove-post" value="Remove the post"/>';
$('.post').append(buttonRemovePost);

var buttonAddComment = '<input type="button" class="add-comment" value="Add a Comment"/>'
$('.post').append(buttonAddComment);

var buttonSubmitComment = '<input type="button" class="submit-comment" value="Submit the comment"/>'
$('.post').append(buttonSubmitComment);

});


//Click handlers
$('.posts').on('click','.remove-post',function () {
    removePosts(this);
});

$('.posts').on('click', '.add-comment', function () {
    formComments(this);
});

$('.posts').on('click','.submit-comment',function () { 
    addComment (this);
});

$('.posts').on('click','.remove-comment',function () { 
    removeComment (this);
});



function postObj (){
    var name = $('.form-control').val();
    var post = {
        text: name,
        id: number,
        comments: []
    };
    number++;
    return post;
}
  
var addPost = function () {
// add posts to the array
var createPost = postObj();
posts.push(createPost);

//add posts to the html
    $(".posts").find('p').remove(); 
    for (var i = 0; i < posts.length; i++) {
        $(".posts").append('<p data-id=' + posts[i].id + '>' + posts[i].text + '</p>');
        $('p').addClass("post");
    }
} 
    
function removePosts (a) {
//remove posts from array
console.log(a);
        var post = $(a).closest('.post')
        var indexPost = post.index();
        posts.splice(indexPost, 1); 
//remove posts from HTML      
        post.remove();
}


function formComments (b) {
        var formComment = '<input type="text" class="comment-text" placeholder="Post Comment"/>'
        var usernameComment = '<input type="text" class="username-text" placeholder="Post Username"/>'
        

        $(b).closest('.post').append('<div class="comment-form">' + '<br>' + formComment + 
                                        '<br>' + usernameComment + '<br>' + '<div class="comments"></div></div>');

                                                            
        $(b).hide();   
}



function addComment (c) {
        var commentVal = $(c).siblings('.comment-form').find('.comment-text').val();
        var usernameVal = $(c).siblings('.comment-form').find('.username-text').val();

        var commentsObj = {
            text: commentVal,
            user: usernameVal
        }

//add comment to the array

var removeCommentBtn = '<input type="button" class="remove-comment" value="Remove"/>'

        var post = $(c).closest('.post')
        var postIndex = post.index()

        var commentsDiv = post.find('.comments') //descendre dans les comments donc FIND

        var commenting = posts[postIndex].comments
        commenting.push(commentsObj);

//add comment to the HTML
        commentsDiv.empty();
        for(i=0;i<commenting.length;i++) {
        commentsDiv.append('<div class="comment">' + '<br>' + "your comment: " + commenting[i].text + '<br>' + " your username: " + commenting[i].user + '<br>'+ removeCommentBtn +'</div>');
}


    };

var k;
var removeComment = function (d) {
//remove comment from the array   
            // $('.removecommentbtn').off();    
            var post = $(d).closest('.post');
            var i = post.index();
            var comment = $(d).closest('.comment');
            var j = comment.index();
            posts[i].comments.splice(j, 1);

//remove comment from HTML
            comment.remove();
        }












