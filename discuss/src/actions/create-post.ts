'use server'
import {z} from 'zod';
import {auth} from "@/auth";
import type {Post} from "@prisma/client";
import {redirect} from "next/navigation";
import {db} from "@/db"
import paths from "@/paths"
import {revalidatePath} from "next/cache";


const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10)
});

type CreatePostFormState = {
    errors:{
        title?:string[],
        content?:string[],
        _form?:string[]
    }
}

export  async function createPost(topicName:string, formState:CreatePostFormState, formdata:FormData) : Promise<CreatePostFormState> {
    //Validate against the createPostSchema
    const result = createPostSchema.safeParse({
        title:formdata.get('title'),
        content:formdata.get('content'),
    });

    if(!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    const session = await auth();
    if(!session || !session.user) {
        return {
            errors:{
                _form:['You must be signed in to do this action']
            }
        }
    }

    //Find a topic with the topic Name prop and get its topic id
    const topic = await db.topic.findFirst({
        where: {
            slug: topicName
        }
    });

    if(!topic) {
        return {
            errors:{
                _form:['Could not find a topic']
            }
        }
    }

    //we will use the post id for redirect, so we will place it outside try-catch block, and we cannot place redirect inside a try-catch block
    let post: Post;
    try {
        post = await db.post.create({
            data:{
                title: result.data.title,
                content: result.data.content,
                userId: session.user.id,
                topicId: topic.id
            }
        })
    }
    catch(err:unknown){
        if(err instanceof Error){
            return {
                errors:{
                    _form:[err.message]
                }
            }
        } else{
            return {
                errors:{
                    _form:['Some error occurred']
                }
            }
        }
    }


    //revalidate the topic show page after creating a post
    revalidatePath(paths.topicShow(topicName));

    // redirect to the posts show page
    redirect(paths.postShow(topicName,post.id));
}