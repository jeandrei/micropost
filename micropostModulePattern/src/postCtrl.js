


const postCtrl = (function(){
  
  function Post(id,title,body){
    this.id = id;
    this.title = title;
    this.body = body;
  }

  

  const data = {    
    
    posts: null,
    currentPost: null
  }

  
  


  return {
    logData: function(){     
      return data;
    }, 
    setPosts: function(posts)      {
      data.posts = posts;
    },
    getPosts: function(){      
      return data.posts;
    },
    addPost: function(post){      
      let ID;
      if(data.posts.length > 0){
        ID = data.posts[data.posts.length -1].id +1;
      } else {
        ID = 0;
      }
      // Create a new instance of post
      const newPost = new Post(ID, post.title, post.body);
      // Puts in the array posts
      data.posts.push(newPost);
    // Returns new post
    return newPost;
    },
    setCurrentPost: function(post){     
      data.currentPost = post;
    },
    getCurrentPost: function(){
      return data.currentPost;
    },
    getPostById: function(id){
      let found = false;
      id = parseInt(id);
      data.posts.forEach(function(post){         
        if(post.id === id){           
          found = post; 
        } 
      })
    return found;
    },
    updatePost: function(postToUpdate){
      let found = null;
      data.posts.forEach(function(post){
        if(post.id === data.currentPost.id){
          post.title = postToUpdate.title;
          post.body = postToUpdate.body;
          found = post;
        }
      });
      return found;
    },
    deletePost: function(post){
      const ids = data.posts.map(function(post){
        return post.id;
      });
      const index = ids.indexOf(post.id);      
      data.posts.splice(index,1);
    }
  }
 
  
})();