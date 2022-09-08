const API = "http://localhost:3000/posts";

const http = new EasyHTTP();


const StorageCtrl = (function(){

 


  return { 
 
    getPosts: async function(){       
      const data = await http.get(API);     
      return data;
    },
    storePost: function(post){
      http.post(API,post);
    },
    updatePostSorage: async function(post){       
      const editPost = await http.put(`${API}/${post.id}`,post);
      return editPost;
    },
    deletePost: async function(post){      
      const deletePost = await http.delete(`${API}/${post.id}`);
      return deletePost;
    }
  
  }//return

})();