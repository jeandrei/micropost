const App = (function(){

  const loadEventListeners = function(){
    const UISelectors = UICtrl.getSelectors();    

    const postAddSubmit = function(e){      
      e.preventDefault();      
      // Get input data typed by the user
      const input = UICtrl.getPostInputs();
      if(input.title === '' || input.body === ''){
        UICtrl.showAlert('Please fill in all fields', 'alert red');        
      } else {
        // Creates a new post instance
        const newPost = postCtrl.addPost(input);
        // Clear input fields
        UICtrl.clearInput();
        // Add the new post to the list in the page
        UICtrl.addListPost(newPost);
        //Store the post on the database
        StorageCtrl.storePost(newPost); 
      }
           
    }  


    const postEditClick = function(e){
      e.preventDefault();
      UICtrl.setFocus();
      if(e.target.classList.contains('edit-item')){        
        const listId = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
        const listIdArr = listId.split('-');
        const id = parseInt(listIdArr[1]);
        const postToEdit = postCtrl.getPostById(id);
        postCtrl.setCurrentPost(postToEdit);
        UICtrl.addPostToForm(postToEdit); 
      }     
    }

    const postUpdateSubmit = function(e){
      const input = UICtrl.getPostInputs();
      const updatePost = postCtrl.updatePost(input);      
      UICtrl.updateListPost(updatePost);     
      const editPost = StorageCtrl.updatePostSorage(updatePost);     
      UICtrl.clearEditState();
      UICtrl.clearInput();
      e.preventDefault();
    }

    const postDeleteSubmit = function(e){
      const post = postCtrl.getCurrentPost();
      postCtrl.deletePost(post);
      StorageCtrl.deletePost(post);
      UICtrl.deletePostItem(post);
      UICtrl.setFocus();
      e.preventDefault();
    }


    const cancel = function(e){
      UICtrl.clearEditState();
      UICtrl.setFocus();
      UICtrl.clearInput();
      e.preventDefault();
    }



    document.querySelector(UISelectors.addBtn).addEventListener('click', postAddSubmit);

    document.querySelector(UISelectors.posts).addEventListener('click', postEditClick);

    document.querySelector(UISelectors.updateBtn).addEventListener('click', postUpdateSubmit);
 
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', postDeleteSubmit);

    document.querySelector(UISelectors.backBtn).addEventListener('click',cancel)
    
  }



  return {
    init: async function(){
      // Hide update, delete and back button
      UICtrl.clearEditState();
      // Get all posts from the database
      const posts = await StorageCtrl.getPosts();  
      // Set the data.posts array with the posts  
      postCtrl.setPosts(posts);      
      // Show posts in the page
      UICtrl.populatePostList(posts);
      
      loadEventListeners();
    }
  }
})();


App.init();