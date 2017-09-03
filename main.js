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
var number = 0;  // important de le mettre avant la fonction (donc dans le global scope). Si je le mets dans la fonction,
// la variable number sera tjrs = à 0;

//functions
$('.btn-primary').click(function () {
    var name = $('.form-control').val();
    var post = {
        text: name,
        id: number,
        comments: [],
        username: []
    };
    number++;
    posts.push(post); // on utilise push car array !
    adding();

})


function adding() {
    $(".posts").find('p').remove(); // ici le off ne fonctionne pas : pk ?
    for (var i = 0; i < posts.length; i++) {
        $('.posts').append('<p>' + posts[i].text + '</p>');
        $('p').attr('data-id',posts[i].id );
        $('p').addClass("post");
        

    }


    var buttonSecond = '<input type="button" class="secondbnt" value="Remove the post"/>';

    $('p').append(buttonSecond); // qd on utilise append, le $('element') est PARENT

    $('.secondbnt').click(function () {
        var postDiv = $(this).closest('p')
        var postDivIndex = postDiv.index()

        postDiv.remove();
        posts.splice(postDivIndex, 1); 

        // posts.pop('p');   won't work because remove the last item of the array, and not the one we press 
        // splice : pop l'item qu'on veut !
    })

    var buttonAddComment = '<input type="button" class="commentbtn" value="Add a Comment"/>'
    $('.post').append(buttonAddComment);


    $('.commentbtn').click(function () {
        var formComment = '<input type="text" class="comment-name" placeholder="Post Comment"/>'
        var usernameComment = '<input type="text" class="username-name" placeholder="Post Username"/>'
        
        $(this).closest('.post').append('<br>' + formComment + '<br>' + usernameComment);
            

    })

    var buttonSubmit = '<input type="button" class="submitbtn" value="Submit the comment"/>'
    $('.post').append(buttonSubmit);

    $('.submitbtn').click(function () {
        var commentVal = $('.comment-name').val();
        var usernameVal = $('.username-name').val();
        $(this).closest('.post').append('<br>' + "your comment: " + commentVal + '<br>' + " your username: " + usernameVal);
        posts.comments.splice(comments,null,commentVal);
        posts.username.splice(username,null,usernameVal);
    })

    var buttonRemoveComment = '<input type="button" class="removecommentbtn" value="Remove the comment"/>'
    $('.post').append(buttonRemoveComment);

    $('.removecommentbtn').click(function () {
        $(this).closest('.post').remove();
        $(this).closest('.post').remove();
    })


}

alert('Heloooooo');





//event bindings

