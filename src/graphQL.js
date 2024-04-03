"use strict";

import { randomUUID } from "crypto";

export const schema = `
  type Post {
    id: ID!
    title: String!
    content: String!
  }

  input PostCreate {
    title: String!
    content: String!
  }

  type Query {
    getPosts: [Post!]!
    getPost(id: ID!): Post
  }

  type Mutation {
    createPost(newPost: PostCreate!): Post!
    deletePost(id: ID!): Post!
    updatePost(id: ID!, newPost: PostCreate!): Post!
  }
`;

export const resolvers = {
  Query: {
    getPosts: (_parent, args, { app }) => {
      return app.db.posts;
    },
    getPost: (_parent, args, { app }) => {
      const { id } = args;
      return app.db.posts.find((post) => post.id === id);
    },
  },
  Mutation: {
    createPost: (_parent, { newPost }, { app }) => {
      const { title, content } = newPost;

      const post = {
        id: randomUUID(),
        title,
        content,
      };
      app.db.posts.push(post);
      return post;
    },
    deletePost: (_parent, { id }, { app }) => {
      const postIndex = app.db.posts.findIndex((post) => post.id === id);
      if (postIndex === -1) {
        return null;
      }
      return app.db.posts.splice(postIndex, 1)[0];
    },
    updatePost: (_parent, { id, newPost }, { app }) => {
      const { title, content } = newPost;
      const postIndex = app.db.posts.findIndex((post) => post.id === id);
      if (postIndex === -1) {
        return null;
      }
      const post = app.db.posts[postIndex];
      post.title = title;
      post.content = content;
      return post;
    },
  },
};

export const loaders = {};
