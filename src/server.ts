import app from "./app";

app.listen(9000);
app.on("error", (err, ctx) => {
  console.log("server error", err, ctx);
});
