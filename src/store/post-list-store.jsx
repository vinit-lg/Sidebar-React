import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {
  },

  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if(action.type === "ADD_POST"){
    newPostList = [action.payload, ...currPostList]
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = (userId, postTitle, postBody, reactions, tags) => {
    dispatchPostList({
      type: 'ADD_POST',
      payload:{
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions: reactions,
        userId: tags,
        tags: tags,
      }
    })
  };


  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  return (
    <PostList.Provider value={{ postList: postList, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "I am going to LA",
    body: "Hi friend I am going to LA",
    reactions: 2,
    userId: "user-9",
    tags: ["vacation", "LA"],
  },

  {
    id: "2",
    title: "I am going to Mumbai",
    body: "Hi friend I am going to Mumbai",
    reactions: 4,
    userId: "user-10",
    tags: ["vacation", "Mumbai"],
  },
];

export default PostListProvider;
