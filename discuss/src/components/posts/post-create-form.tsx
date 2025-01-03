'use client'
import {
    Input,
    Button,
    Textarea,
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@nextui-org/react";
import {useFormState} from 'react-dom';
import * as actions from "@/actions";
import FormButton from "@/components/common/form-button";

type PostCreateFormProps = {
    topicName: string;
}

export default function PostCreateForm({topicName}:PostCreateFormProps){
    const [formState,action]= useFormState(
        actions.createPost.bind(null,topicName),
        {errors:{}});
    return (<Popover placement="left">
        <PopoverTrigger>
            <Button color="primary">Create a Post</Button>
        </PopoverTrigger>
        <PopoverContent>
            <form action={action}>
                <div className="flex flex-col gap-4 p-4 w-80">
                    <h3 className="text-lg">Create a Post</h3>
                    <Input
                        name="title"
                        label="title"
                        labelPlacement="outside"
                        placeholder="Title"
                        isInvalid={!!formState.errors.title}
                        errorMessage={formState.errors.title?.join(', ')}
                    />

                    <Textarea
                        name="content"
                        label="Content"
                        labelPlacement="outside"
                        placeholder="Content"
                        isInvalid={!!formState.errors.content}
                        errorMessage={formState.errors.content?.join(', ')}
                    />
                    {
                        formState.errors._form ? <div className=" rounded p-2 bg-red-200 border border-red-400">
                            {formState.errors._form.join(', ')}
                        </div> : null
                    }
                    <FormButton>
                        Submit
                    </FormButton>
                </div>
            </form>
        </PopoverContent>
    </Popover>)
}