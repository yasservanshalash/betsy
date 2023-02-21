import { Strategy as JwtStrategy, ExtractJwt} from "passport-jwt"
import UserServices from "../services/users"
import dotenv from "dotenv"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET as string

export const jwtStrategy = new JwtStrategy({
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (payload, done) => {
    const  userEmail = payload.email;
    const user = await UserServices.findUserByEmail(userEmail);
    if(!user) {
        return "no user"
    }
    done(null, user)
});