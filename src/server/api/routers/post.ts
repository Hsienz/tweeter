import {z} from "zod";

import {createTRPCRouter, protectedProcedure,} from "~/server/api/trpc";

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
        return ctx.db.post.findMany({
            where: {createdById: ctx.session.user.id},
            include: {createdBy: true},
            orderBy: {createdAt: "desc"}
        });
    }),
  getAllPost: protectedProcedure.input( z.object({ userId: z.string() }))
      .query(async ({ctx,input})=>{
        return ctx.db.post.findMany({
            where: {createdById: input.userId},
            include: {createdBy: true},
            orderBy: {createdAt: "desc"}
        });
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
    like: protectedProcedure.input(z.object({postId:z.preprocess(Number,z.number())})).mutation(async ({ctx,input})=>{
        return ctx.db.likeInfo.create({
            data: {
                postId: input.postId,
                userId: ctx.session.user.id
            }
        })
    }),

    getLikeInfo: protectedProcedure.input(z.object({postId:z.preprocess(Number,z.number())})).query(async ({ctx,input})=>{
        return ctx.db.likeInfo.findFirst({
            where: {
                userId: ctx.session.user.id,
                postId: input.postId
            }
        })
    }),
    

    deleteLikeInfo: protectedProcedure.input(z.object({postId:z.preprocess(Number,z.number())})).mutation(async ({ctx,input})=>{
        await ctx.db.likeInfo.delete({
            where: {
                userId_postId: {
                    userId: ctx.session.user.id,
                    postId: input.postId
                }
            }
        })
    }),
    save: protectedProcedure.input(z.object({postId:z.preprocess(Number,z.number())})).mutation(async ({ctx,input})=>{
        return ctx.db.saveInfo.create({
            data: {
                postId: input.postId,
                userId: ctx.session.user.id
            }
        })
    }),

    getSaveInfo: protectedProcedure.input(z.object({postId:z.preprocess(Number,z.number())})).query(async ({ctx,input})=>{
        return ctx.db.saveInfo.findFirst({
            where: {
                userId: ctx.session.user.id,
                postId: input.postId
            }
        })
    }),


    deleteSaveInfo: protectedProcedure.input(z.object({postId:z.preprocess(Number,z.number())})).mutation(async ({ctx,input})=>{
        await ctx.db.saveInfo.delete({
            where: {
                userId_postId: {
                    userId: ctx.session.user.id,
                    postId: input.postId
                }
            }
        })
    }),
    retweet: protectedProcedure.input(z.object({postId:z.preprocess(Number,z.number())})).mutation(async ({ctx,input})=>{
        return ctx.db.retweetInfo.create({
            data: {
                postId: input.postId,
                userId: ctx.session.user.id
            }
        })
    }),

    getRetweetInfo: protectedProcedure.input(z.object({postId:z.preprocess(Number,z.number())})).query(async ({ctx,input})=>{
        return ctx.db.retweetInfo.findFirst({
            where: {
                userId: ctx.session.user.id,
                postId: input.postId
            }
        })
    }),


    deleteRetweetInfo: protectedProcedure.input(z.object({postId:z.preprocess(Number,z.number())})).mutation(async ({ctx,input})=>{
        await ctx.db.retweetInfo.delete({
            where: {
                userId_postId: {
                    userId: ctx.session.user.id,
                    postId: input.postId
                }
            }
        })
    }),
};
export const postRouter = createTRPCRouter( procedures )
