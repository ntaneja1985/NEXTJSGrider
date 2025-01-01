'use server'
import {z} from 'zod';
import {auth} from "@/auth";
import type {Topic} from "@prisma/client";
import {redirect} from "next/navigation";
import {db} from "@/db"
import paths from "@/paths"
import {revalidatePath} from "next/cache";

const createTopicSchema = z.object({
    name: z.string().min(3).regex(/^[a-z-]+$/,{message:"Must be lowercase letters or dashes without spaces"}),
    description: z.string().min(10)
});

type CreateTopicFormState = {
    errors:{
        name?:string[],
        description?:string[],
        _form?:string[]
    }
}

export  async function createTopic(formState:CreateTopicFormState,formdata:FormData):Promise<CreateTopicFormState> {
    const result = createTopicSchema.safeParse({
        name:formdata.get('name'),
        description:formdata.get('description'),
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

    //we will use the topic id for redirect, so we will place it outside try-catch block, and we cannot place redirect inside a try-catch block
    let topic: Topic;
    try {
        topic = await db.topic.create({
            data:{
                slug: result.data.name,
                description: result.data.description
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

    //TODO: revalidate the homepage after creating the topic
    revalidatePath('/')

    redirect(paths.topicShow(topic.slug))
}