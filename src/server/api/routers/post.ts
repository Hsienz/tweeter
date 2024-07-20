import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const procedures = {
  /*
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
  
   */
    getSelfPost: protectedProcedure.query(async ({ctx})=>{
        const user = await ctx.db.user.findFirst({where:{id:ctx.session.user.id},include:{posts:true}}) // how to call this
        return user ? user.posts : []
    }),
  getAllPost: protectedProcedure.input( z.object({ userId: z.string() }))
      .query(async ({ctx,input})=>{
          const user = await ctx.db.user.findFirst({where:{id:input.userId}, include:{posts:true}})
          return user ? user.posts : []
  }),
  getFollowingUserPost: protectedProcedure.query(async ({ctx})=>{
      const user = await ctx.db.user.findFirst(
          {
            where: {
              id: ctx.session.user.id
            },
            include: {
              following: {
                  include:{
                      following: {
                          include:{
                              posts: true
                          }
                      }
                  }
                  },
            },
          })
      if( !user ) return null
      user.following.flatMap( (x) => x.following.posts )
          .sort( (a,b)=>{
              return a.createdAt.getSeconds() - b.createdAt.getSeconds()
          });
  }),
    post: protectedProcedure.input(z.object({content: z.string().min(1).max(150)})).mutation(async ({ ctx, input }) => {
        return ctx.db.post.create({
            data: {
                createdBy: { connect: { id: ctx.session.user.id } },
                content: input.content
            },
        });
    }),
    getPost: protectedProcedure.input(z.object(
        {
            id:z.preprocess(Number, z.number())
        }
        )
    ).query(async ({input, ctx}) =>{
        return ctx.db.post.findFirst({where:{id:input.id}})
    }),
};
export const postRouter = createTRPCRouter( procedures )
