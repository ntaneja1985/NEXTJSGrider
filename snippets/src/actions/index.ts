'use server';

import {db} from "@/db"
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

export async function editSnippet(id:number, code:string){
    await db.snippet.update({
        where:{id:id},
        data: {code:code}
    });

    revalidatePath(`/snippets/${id}`);
    redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id:number){
    await db.snippet.delete({
        where:{id:id}
    });

    //Revalidate the cached version of homepage
    revalidatePath('/');
    redirect('/');
}

export async function createSnippet(formState:{message:string}, formData:FormData){
    const errorText: { message: string } = {message: ""}
    // This needs to be a server action
    //Special directive used by Next.js
    //'use server';
    //Check the user's inputs and make sure they are valid
    //Typescript knows that whenever we want to get some data from a form, it is of type FormDataEntryValue so we cast it as string
    try {
        const title = formData.get('title');
        const code = formData.get('code');



        if (typeof title !== 'string' || title.length < 3) {
            errorText.message = 'Title must be longer and should be a string';
        }

        if (typeof code !== 'string' || code.length < 10) {
            errorText.message += "/n" + 'Code must be longer and should be a string';
        }



        //Create a new record in the database
         await db.snippet.create({
            data:{
                title: title as string,
                code: code as string
            }
        });
    }
    catch (error: unknown) {
        if(error instanceof Error){
            errorText.message += error.message;
        } else {
            errorText.message += "Something went wrong";
        }
    }

    if (errorText.message.length > 0) {
        return errorText;
    }

    //Revalidate the cached version of homepage
    revalidatePath('/');

    // Redirect the user back to the root route
    redirect('/');
}