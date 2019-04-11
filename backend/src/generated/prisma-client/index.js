"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Item",
    embedded: false
  },
  {
    name: "Offer",
    embedded: false
  },
  {
    name: "OfferType",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://handel-cc01c3656d.herokuapp.com/handel/prod`
});
exports.prisma = new exports.Prisma();
