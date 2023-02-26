import express from "express";
import { IUser } from "./types/type.user";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());
const PORT = 3000;

let users: IUser[] = [];

app.get("/", (req, res) => {
  res.json(users);
});

app.post("/", (req, res) => {
  const user = req.body as IUser;
  user.id = uuidv4();
  users.push(user);
  res.json({
    message: "user added successfully",
  });
});

app.put("/:id", (req, res) => {
  const { id } = req.params;
  const updeteUser = req.body as IUser;
  const updeteUserList = users.filter((item) => {
    return item.id !== id;
  });
  updeteUserList.push(updeteUser);
  users = updeteUserList;

  res.json({
    message: "user updated successfully",
  });
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;
  const updeteUserList = users.filter((item) => {
    return item.id !== id;
  });
  users = updeteUserList;

  res.json({
    message: "user deletetd successfully",
  });
});
app.listen(PORT, () => {
  console.log("server listening on " + PORT);
});
