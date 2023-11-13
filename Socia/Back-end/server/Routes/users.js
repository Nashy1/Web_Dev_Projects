import { express } from "express";
import{
    getUser,
    getUserFriends,
    assRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";


const router = express.Router();

/*READ */
router.get("/:id", verifyToken,getUser);