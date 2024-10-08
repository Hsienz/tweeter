﻿import z from "zod"
import {createTRPCRouter, publicProcedure, protectedProcedure} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    create: publicProcedure.input(z.object({name: z.string(), email:z.string()})).mutation(async ({input, ctx}) => {
            if( await ctx.db.user.findFirst() ) return;

            return ctx.db.user.create({
                data: {
                    name: input.name,
                    image: "",
                    email: input.email,
                }
            })
    }),
    
    get: protectedProcedure.input(z.object({userId: z.string()})).query(async ({input, ctx}) => {
        return ctx.db.user.findFirst({where: {id: input.userId}});
    })
    
    
})