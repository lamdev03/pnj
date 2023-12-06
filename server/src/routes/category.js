import express from "express";
import { checkPermission } from "../middlewares/checkPermission";
import {
  create,
  getAll,
  getDetail,
  remove,
  update,
} from "../controllers/category";
const routerCategory = express.Router();

routerCategory.get("/", getAll);
routerCategory.get("/:id", getDetail);
routerCategory.post("/", checkPermission, create);
routerCategory.put("/:id", checkPermission, update);
routerCategory.delete("/:id", checkPermission, remove);

export default routerCategory;
