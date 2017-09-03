// 1)We created a function called SpacebookApp that wrapped the bulk of our code. 
// We did this to create a function around our data and other functions that we don't 
// want anyone else to access.
// We returned a few of the functions in an object at the end of the SpacebookApp function. 
// This is so our data can be interacted with outside of our SpacebookApp, but only by 
// those functions.
// To initialize our app we did this: var app = SpacebookApp();. From there, we 
// could use the object app to interact with our methods.
// Notice we put all our events at the bottom together. This just helps us organize 
// them and keep everything clean and neat.
// Notice our function _findPostById. It has a little _ in front of it because 
// it's a "helper" function. In other words, it's only used by other functions
//  inside module. By convention, you'll see people start these with an underscore.

var SpacebookApp = function () {
  var posts = [];

  // the current id to assign to a post
  var currentId = 0;
  var $posts = $('.posts');

  var _findPostById = function (id) {
    for (var i = 0; i < posts.length; i += 1) {
      if (posts[i].id === id) {
        return posts[i];
      }
    }
  };

  var createPost = function (text) {
    var post = {
      text: text,
      id: currentId
    };

    currentId += 1;

    posts.push(post);
  };

  var renderPosts = function () {
    $posts.empty();

    for (var i = 0; i < posts.length; i += 1) {
      var post = posts[i];
      $posts.append('<p class="post" data-id=' + post.id + '>'
        + '<a href="#" class="remove">remove</a> ' + post.text + '</p>');

    }
  };

  var removePost = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;

    var post = _findPostById(id);

    posts.splice(posts.indexOf(post), 1);
    $clickedPost.remove();
  };

  return {
    createPost: createPost,
    renderPosts: renderPosts,
    removePost: removePost
  };
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function () {
  var text = $('#post-name').val();
  
  app.createPost(text);
  app.renderPosts();
});

$('.posts').on('click', 'a', function () {
  app.removePost(this);
});
