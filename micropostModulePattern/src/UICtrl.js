const UICtrl = (function(){

  UISelectors = {
    postTitle:"#postTitle",
    postBody:"#postBody",
    addBtn:".addBtn",
    updateBtn:".updateBtn",
    deleteBtn:".deleteBtn",
    backBtn:".backBtn",
    card:".card",
    posts:"#posts"   
  }

  return {
    getSelectors: function(){
      return UISelectors;
    },
    getPostInputs: function(){
      return {
        title: document.querySelector(UISelectors.postTitle).value,
        body: document.querySelector(UISelectors.postBody).value
      }
    },
    clearInput: function(){
      document.querySelector(UISelectors.postTitle).value = "";
      document.querySelector(UISelectors.postBody).value = "";
    },
    addListPost: function(post){
      let html = `<div class="col s12 m7" id="post-${post.id}">       
                    <div class="card horizontal">        
                      <div class="card-stacked">
                        <h4 class="header">${post.title}</h4>
                        <div class="card-content">
                          <p>${post.body}</p>
                        </div>
                        <div class="card-action">
                          <a href="#" class="secondary-content">
                            <i class="edit-item fa fa-pencil"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>   
                `;

    document.querySelector(UISelectors.posts).innerHTML += html;
    },
    populatePostList: function(posts){
      let html = "";
      posts.forEach(function(post){
        html += `<div class="col s12 m7" id="post-${post.id}">       
                  <div class="card horizontal">        
                    <div class="card-stacked">
                      <h4 class="header">${post.title}</h4>
                      <div class="card-content">
                        <p>${post.body}</p>
                      </div>
                      <div class="card-action">
                        <a href="#" class="secondary-content">
                          <i class="edit-item fa fa-pencil"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>   
              `;
      });
      document.querySelector(UISelectors.posts).innerHTML += html;
    },
    clearEditState: function(){
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    showEditState: function(){
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    addPostToForm: function(){
      document.querySelector(UISelectors.postTitle).value = postCtrl.getCurrentPost().title;
      document.querySelector(UISelectors.postBody).value = postCtrl.getCurrentPost().body;
      UICtrl.showEditState();
    },
    updateListPost: function(post){
      const id = `#post-${post.id}`      
      let html = `<div class="col s12 m7" id="post-${post.id}">       
                      <div class="card horizontal">        
                        <div class="card-stacked">
                          <h4 class="header">${post.title}</h4>
                          <div class="card-content">
                            <p>${post.body}</p>
                          </div>
                          <div class="card-action">
                            <a href="#" class="secondary-content">
                              <i class="edit-item fa fa-pencil"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                  </div>   
                  `;
      
      document.querySelector(id).innerHTML = html;
    },
    setFocus: function(){      
      document.getElementById('postTitle').focus(); 
    },
    deletePostItem: function(post){
      const postId = `#post-${post.id}`;
      const postToDelete = document.querySelector(postId);
      postToDelete.remove();
    },
    showAlert: function(message, className){
      this.clearAlert();
      const div = document.createElement('div');
      div.style.padding = '20px';
      div.className = className;
      div.appendChild(document.createTextNode(message));      
      const divmessage = document.querySelector('#message');      
      divmessage.appendChild(div);   

      setTimeout(() => {
        this.clearAlert();
      },3000);
    },
    clearAlert: function(){
      const currentAlert = document.querySelector('.alert');
      if(currentAlert){
        currentAlert.remove();
      }
    }
  }


})();