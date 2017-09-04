// 1) Create a function that creates a new post object and adds it to a posts array.
// Each post object should have two properties: text (the user's input, a string) and id 
// (a number, dynamically generated).
//  Each id should be unique to that post (no two post objects should have the same id).


// 2)Now to render the array. Create a second function that adds all the posts in the posts array to the posts div.
// In addition, add the id to the element with our data attribute. Each post element should look something like this:
// <p class="post" data-id="1">Hey man! I'm a post!</p>

// 3)
// Change your code so that each post element also has a "remove" button. Like this:
// <p class="post" data-id="1"> <button type="button" class="remove">REMOVE</button> Hey man! I'm a post!</p>
// // When the button gets clicked, remove the post from the array and consequently the page.

// 4)Add a feature that allows each post to receive a comment. Each post will require it's own form, allowing a
//  user to leave their username and some kind of comment text. List all the comments and associated users below the post.


//global variables
var posts = [];
var number = 0;
// important de le mettre avant la fonction (donc dans le global scope). Si je le mets dans la fonction,
// la variable number sera tjrs = à 0;

//functions
$('.btn-primary').click(function () {
    var name = $('.form-control').val();
    var post = {
        text: name,
        id: number,
        comments: []

    };
    number++;
    posts.push(post); // on utilise push car array !
    addPost();
})


function addPost() {
    $(".posts").find('p').remove(); // ici le off ne fonctionne pas : pk ?
    for (var i = 0; i < posts.length; i++) {
        $(".posts").append('<p>' + posts[i].text + '</p>');
        $('p').attr('data-id', posts[i].id);
        $('p').addClass("post");
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    var buttonRemovePara = '<input type="button" class="removeparabnt" value="Remove the post"/>';
    $('p').append(buttonRemovePara);
    // qd on utilise append, le $('element') est PARENT

    $('.removeparabnt').click(function () {

        var indexPara = $(this).closest('p').index()
        // le paragraphe proche de ce bnt= le paragraphe qu'on vient de créer
        // [index()] donne la place de l'élément par rapport à l'objet {post}

        posts.splice(indexPara, 1);
        $(this).closest('p').remove();

        // posts.pop('p');   won't work because remove the last item of the array, and not the one we press 
        // splice : pop l'item qu'on veut !
        //array.splice(index, howmany, item1, ....., itemX)
    })

    /////////////////////////////////////////////////////////////////////////////////////////////
    var buttonAddComment = '<input type="button" class="commentbtn" value="Add a Comment"/>'
    $('.post').append(buttonAddComment);

    $('.commentbtn').click(function () {
        var formComment = '<input type="text" class="comment-name" placeholder="Post Comment"/>'
        var usernameComment = '<input type="text" class="username-name" placeholder="Post Username"/>'

        $(this).closest('.post').append('<div class="comment-form">' + '<br>' + formComment + '<br>' +
            usernameComment + '<br>' +
            '<input type="button" class="submitbtn" value="Submit the comment"/><div class="comments"></div></div>');
    })
}
//////////////////////////////////////////////////////////////////////////////////////////////////

var addComment = function (newcomment, index, post) {
    posts[index].comments.push(newcomment);

    var comments = post.find('.comments')

    // mettre le paragraphe sur la page(HTML) est en 2e position
    comments.append('<div  class="comment" >' + '<br>' + "your comment: " + newcomment.text +
        '<br>' + " your username: " + newcomment.user + '<br>'+
        '<input type="button" class="removecommentbtn" value="Remove the comment"/>' +
        '</div>');


        $('.removecommentbtn').off();
        $('.removecommentbtn').click(function () {
            var post = $(this).closest('.post');
            var i = post.index();
        
            var comment = $(this).closest('.comment');
            var j = comment.index();
        
            posts[i].comments.splice(j, 1);
            comment.remove();
        })
        

}

$('.posts').on('click', ".submitbtn", function () {
    var post = $(this).closest('.post')
    var i = post.index();

    var commentVal = $(this).siblings('.comment-name').val();
    var usernameVal = $(this).siblings('.username-name').val();

    var commentsObj = {
        text: commentVal,
        user: usernameVal
    };
    addComment(commentsObj, i, post)
})








