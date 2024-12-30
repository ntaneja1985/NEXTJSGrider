'use client'
import type {Snippet} from "@prisma/client";
import {Editor} from "@monaco-editor/react";
import {useState} from "react";
import * as actions from "@/actions";

type SnippetEditFormProps = {
    snippet: Snippet;
}
export default function SnippetEditForm({snippet}: SnippetEditFormProps) {

    const [code,setCode] = useState(snippet.code);
    const handleEditorChange = (value:string = "") =>{
        console.log(value)
        setCode(value);
    }

    const editSnippetAction = actions.editSnippet.bind(null,snippet.id,code);

    return (
        <div>
           <Editor
               theme="vs-dark"
               language="javascript"
               defaultValue={snippet.code}
               height="40vh"
               options={{
                   minimap:{enabled:false},
               }}
               onChange={handleEditorChange}
               />
            <form action={editSnippetAction}>
                <button type="submit" className="p-2 border rounded">Save</button>
            </form>
        </div>
    )
}