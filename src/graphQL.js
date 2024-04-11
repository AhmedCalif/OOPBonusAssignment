"use strict";

import { randomUUID } from "crypto";

export const schema = `
  type Tag {
    id: ID!
    name: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    tag: Tag!
  }

  input PostCreate {
    title: String!
    content: String!
    tagId: ID!
  }

  type Query {
    getPosts: [Post!]!
    getPost(id: ID!): Post
    getTags: [Tag!]!
    getPostsByTag(tagId: ID!): [Post!]!
    getTag(id: ID!): Tag
  }

  type Mutation {
    createPost(newPost: PostCreate!): Post!
    deletePost(id: ID!): Post!
    updatePost(id: ID!, updatedPost: PostCreate!): Post!
    createTag(name: String!): Tag!
  }
`;

export const resolvers = {
  Query: {
    getPosts: (_parent, _args, { app }) => app.db.posts,
    getPost: (_parent, { id }, { app }) => app.db.posts.find((post) => post.id === id),
    getTags: (_parent, _args, { app }) => app.db.tags,
    getPostsByTag: (_parent, { tagId }, { app }) => app.db.posts.filter((post) => post.tag.id === tagId),
    getTag: (_parent, { id }, { app }) => app.db.tags.find((tag) => tag.id === id),
  },
  Mutation: {
    createPost: (_parent, { newPost }, { app }) => {
      const { title, content, tagId } = newPost;
      app.db.tags = app.db.tags || [];
    
      const tag = app.db.tags.find((tag) => tag.id === tagId);
    
      if (!tag) {
        throw new Error('Tag not found');
      }
    
      const post = {
        id: randomUUID(),
        title,
        content,
        tag
      };
      app.db.posts = app.db.posts || [];
      app.db.posts.push(post);
    
      return post;
    },
    deletePost: (_parent, { id }, { app }) => {
      const postIndex = app.db.posts.findIndex((post) => post.id === id);
      if (postIndex === -1) {
        throw new Error('Post not found');
      }
      return app.db.posts.splice(postIndex, 1)[0];
    },
    updatePost: (_parent, { id, updatedPost }, { app }) => {
      const { title, content, tagId } = updatedPost;
      const postIndex = app.db.posts.findIndex((post) => post.id === id);
      const tag = app.db.tags.find((tag) => tag.id === tagId);

      if (postIndex === -1) {
        throw new Error('Post not found');
      }
      if (!tag) {
        throw new Error('Tag not found');
      }

      const post = app.db.posts[postIndex];
      post.title = title;
      post.content = content;
      post.tag = tag;
      return post;
    },
    createTag: (_parent, { name }, { app }) => {
      app.db.tags = app.db.tags || [];
      
      const tag = {
        id: randomUUID(),
        name
      };
      app.db.tags.push(tag);
      return tag;
    }
  }
};

export const loaders = {};
