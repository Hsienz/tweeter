import {z} from "zod";

import {createTRPCRouter, protectedProcedure, publicProcedure,} from "~/server/api/trpc";
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {v4 as uuid} from "uuid"
const s3 = new S3Client([{
    region: process.env.AWS_REGION,
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
}])

const procedures = {
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
    post: protectedProcedure.input(z.object(
        {
            content: z.string().min(1).max(150), 
            files: z.string().array()
        })).mutation(async ({ ctx, input }) => {
        const filenames = await Promise.all( input.files.map( x=>{
            const filename = uuid() + ".png"
            const command = new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: filename,
                Body: x
            })
            s3.send(command)
            return filename
        }))
        return ctx.db.post.create({
            data: {
                createdBy: { connect: { id: ctx.session.user.id } },
                content: input.content,
                files: filenames
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
    
    getLikeCount: publicProcedure.input(z.object({postId:z.preprocess(Number,z.number())})).query(async({ctx,input})=>{
        return ctx.db.likeInfo.count({where:{postId:input.postId}})
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
    
    getSaveCount: publicProcedure.input(z.object({postId:z.preprocess(Number,z.number())})).query(async({ctx,input})=>{
        return ctx.db.saveInfo.count({where:{postId:input.postId}})
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
    
    getRetweetCount: publicProcedure.input(z.object({postId:z.preprocess(Number,z.number())})).query(async({ctx,input})=>{
        return ctx.db.retweetInfo.count({where:{postId:input.postId}})
    }),
    
    getCommentCount: publicProcedure.input(z.object({postId:z.preprocess(Number,z.number())})).query(async({ctx,input})=>{
        return ctx.db.post.count({where:{parentId:input.postId}})
    }),
};
export const postRouter = createTRPCRouter( procedures )