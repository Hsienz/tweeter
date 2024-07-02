import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {z} from "zod";
import {api} from "~/trpc/react";

export const accountRouter = createTRPCRouter({
    
    create: publicProcedure.input(z.object({email: z.string(), username: z.string()}))
        .mutation(async ({input, ctx}) => 
            {

                // if (await ctx.db.account.findFirst({where: {email: input.email}})) return;
                //
                // const account = await ctx.db.account.create({
                //     data: {
                //         provider: "email",
                //         email: input.email
                //        
                //     }
                // });
                //
                // const user = await ctx.db.user.create({
                //     data: {
                //         account: {
                //             connect: {
                //                 email: account.email
                //             }
                //         }, username: input.username, icon: ""
                //     }
                // });
                
            }),
    remove: publicProcedure.input(z.object({email: z.string()})).mutation(async ({input, ctx}) => 
        {
            // return ctx.db.account.delete({where: {email: input.email}});
        }),
})