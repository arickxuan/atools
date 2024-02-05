// import defaultConfig from "../assets/config.json" assert { type: 'json' };
import resolve from "resolve";

// import resolve from "resolve";
// import pkg from "/Users/arick/atools/atools";
let pkgpath = resolve.sync("atools", {
  basedir: "/Users/arick/atoolsplugin/node_modules",
});
let as = await import(pkgpath);
let as2 = await import("/Users/arick/atoolsplugin/atools/index.js");
let ctx = {};
// const { startup } = pkg;
// let p = plugin(ctx);
console.log(as);
console.log(as2);

// let re = resolve.sync("name", { basedir: "path/" });
// console.log_init(re);
