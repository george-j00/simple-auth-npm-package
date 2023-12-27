"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  createUser: () => createUser,
  loginUser: () => loginUser,
  start: () => start
});
module.exports = __toCommonJS(src_exports);
var import_bcryptjs = __toESM(require("bcryptjs"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_mongoose = __toESM(require("mongoose"));
var createUser = async (user, UserSchema) => {
  const password = await import_bcryptjs.default.hash(user.password, 10);
  const userData = new UserSchema({
    name: user.name,
    email: user.email,
    password
  });
  await userData.save();
  return user;
};
var loginUser = async (loginData, UserSchema) => {
  const user = await UserSchema.findOne({ email: loginData.email });
  if (!user || !await import_bcryptjs.default.compare(loginData.password, user.password)) {
    throw new Error("Invalid credentials");
  }
  const payload = {
    email: user.email
  };
  const secretKey = "your_secret_key";
  const token = import_jsonwebtoken.default.sign(payload, secretKey, { expiresIn: "1h" });
  return token;
};
var start = async (MONGODB_URI) => {
  try {
    await import_mongoose.default.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    ``;
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createUser,
  loginUser,
  start
});
//# sourceMappingURL=index.js.map