import z from "zod"
import {createTRPCRouter, publicProcedure, protectedProcedure} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    create: publicProcedure.input(z.object({username: z.string(), email:z.string()})).mutation(async ({input, ctx}) => {
            if( await ctx.db.user.findFirst() ) return;

            return ctx.db.user.create({
                data: {
                    username: input.username,
                    icon: "",
                    email: input.email,
                }
            })
    }),
    
    
})