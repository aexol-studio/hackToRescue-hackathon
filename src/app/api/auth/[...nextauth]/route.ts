import NextAuth from "next-auth";
import { authOptions } from "@/utils/authenticate";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
