"use strict";

import fp from "fastify-plugin";

// Fake Seed Data for our FakeDB
export const posts = [
  {
    id: "a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0",
    title: "Why I love GraphQL",
    content: "End to End Typesafety is great.",
    tag: {
      id: "t0t0t0t0-t0t0-t0t0-t0t0-t0t0t0t0t0t0",
      name: "GraphQL",
    },
  },
  {
    id: "b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1",
    title: "How to write a song",
    content: "Study music theory or have a natural ear for it.",
    tag: {
      id: "t1t1t1t1-t1t1-t1t1-t1t1-t1t1t1t1t1t1",
      name: "Music",
    },
  },
  {
    id: "c2c2c2c2-c2c2-c2c2-c2c2-c2c2c2c2c2c2",
    title: "How to travel the world",
    content: "Start planning early and make sure you save up enough money",
    tag: {
      id: "t2t2t2t2-t2t2-t2t2-t2t2-t2t2t2t2t2t2",
      name: "Travel",
    },
  },
  {
    id: "d3d3d3d3-d3d3-d3d3-d3d3-d3d3d3d3d3d3",
    title: "How to travel to Asia",
    content:
      "Do research on which area in Asia you want to visit (ex - India, China, etc), and learn a bit of the local language, perhaps with Duolingo",
    tag: {
      id: "t3t3t3t3-t3t3-t3t3-t3t3-t3t3t3t3t3t3",
      name: "Travel",
    },
  },
  {
    id: "e4e4e4e4-e4e4-e4e4-e4e4-e4e4e4e4e4e4",
    title: "How to travel to Iceland",
    content:
      "Traveling to Iceland is really cool, be sure to bring a good jacket or rent one while visiting.",
    tag: {
      id: "t4t4t4t4-t4t4-t4t4-t4t4-t4t4t4t4t4t4",
      name: "Travel",
    },
  },
];

const db = {
  posts,
};
const DbPlugin = fp(function DbPlugin(fastify, opts, next) {
  fastify.log.info("Database loading...");
  fastify.decorate("db", db);
  fastify.log.info("Database loaded!");
  next();
});

export default DbPlugin;
