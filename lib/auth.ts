// src/lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import { connectDB } from "./mongodb";
import User from "../models/User";


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "ایمیل", type: "text" },
        password: { label: "رمز عبور", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("ایمیل و رمز عبور الزامی است");
        }

        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("کاربری با این ایمیل یافت نشد");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("رمز عبور نادرست است");

        // برگرداندن user اولیه به NextAuth (مقداری که در jwt callback می‌گیریم)
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin, // <-- اضافه شد
        };
      },
    }),
  ],

  pages: {
    signIn: "/login", // مسیر صفحه لاگین
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      // وقتی user تازه لاگین می‌کنه، اطلاعات از authorize وارد user میشه
      if (user) {
        token.id = (user as any).id ?? token.id;
        token.isAdmin = (user as any).isAdmin ?? token.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      // انتقال id و isAdmin از token به session.user
      if (token) {
        (session.user as any).id = token.id ?? (session.user as any).id;
        (session.user as any).isAdmin = (token as any).isAdmin ?? false;
      }
      return session;
    },
  },
};
