import { Express } from "express";
import{
    getUser,
    getUserFriends,
    assRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";