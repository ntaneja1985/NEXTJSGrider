# Next.js by Stephen Grider
- ![img.png](img.png)
- ![img_1.png](img_1.png)
- One of the goals of Next is to expand the use of React to static sites.
- In Next.js we not only make dynamic and interactive sites, but we also make static content driven sites.
- ![img_2.png](img_2.png)
- ![img_3.png](img_3.png)
- "src/app" folder is a super special folder. The files and folders we place here determine what routes exist in our app.
- Files specifically called page.tsx define a route that the user can visit.
- The files must have an export default of a React component
```js
export default function Home() {
  return (
   <div>
     Home Page
   </div>
  );
}

```
- ![img_4.png](img_4.png)
- The name of the folder that a page.tsx is in, controls the route.
- We can deeply nest routes as well
- ![img_5.png](img_5.png)
- We can use file based routing to add pages to our application
- app folder contains all different route definitions
- routes are made by files called page.tsx 
- folder names determine the route in the browser.

## Link between pages
- Use Next's built in Link component to navigate between different routes.
- It looks like a normal anchor tag in HTML
```js
import Link from 'next/link';

export default function Home() {
  return (
   <div>
       <div>
           <Link className="mx-4" href="/performance">Performance</Link>
           <Link className="mx-4"  href="/reliability">Reliability</Link>
           <Link className="mx-4" href="/scale">Scale</Link>
       </div>
     Home Page
   </div>
  );
}

```
## Layout.tsx file in Next.js
- Like a global parent component for all of our pages.
- ![img_6.png](img_6.png)
```js
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <div>
                    <Link href="/">Home</Link>
                    <Link href="/performance">Performance</Link>
                    <Link href="/reliability">Reliability</Link>
                    <Link href="/scale">Scale</Link>
                </div>
                {children}
            </body>
        </html>
    );
}
```
## Building a folder structure
- ![img_7.png](img_7.png)
- create a folder src/components
- create a Header component inside it
```js
import Link from "next/link";

export default function Header() {
    return (
        <div>
            <Link href="/">Home</Link>
            <Link href="/performance">Performance</Link>
            <Link href="/reliability">Reliability</Link>
            <Link href="/scale">Scale</Link>
        </div>
    )
}
```
## Absolute Path Import Shortcut
- We can use the @ symbol
- It is like a shortcut to go to the src directory
```js
import Header from "@/components/header";
```
- Can be read as src/components/header
- Very useful in super nested routes.

## Image Component in Next.js 
- ![img_8.png](img_8.png)
- Good thing about image component is that when we are in production mode, if the user navigates to a page on a small screen, then this image component detects the screen size and automatically resizes the image.
- ![img_9.png](img_9.png)
- Then, once the image is resized, it is automatically cached for that size and it doesnot need to be resized again.
- This is a very useful built-in feature in an image-heavy environment.
```js
import Image from 'next/image';
import homeImg from '../../public/home.jpg'

export default function Home() {
  return (
   <div>
     Home Page
       <div className="absolute -z-10 inset-0">
       <Image src={homeImg}
              alt="car factory"
              style={{objectFit: 'cover'}}
       />
       </div>
   </div>
  );
}

```
### Sizing of Image Component that is provided by Next.js
- ![img_10.png](img_10.png)
- Let's assume a user is on a very slow internet connection.
- Loading the image may take time, so let's assume first the text is displayed.
- We don't want text to jump around the screen when the image is loaded.
- This is also called layout shifting and provides a bad user experience.
- Layout shifting is solved by Next.js image component
- When we load the image, we must have a placeholder component and that placeholder component should know how tall/wide should it be ?
- That placeholder must be perfectly sized so that when the image is loaded, the text on the right doesnot move.
- ![img_11.png](img_11.png)
- ![img_12.png](img_12.png)
- The fill prop in the Next.jsImage component is used to make the image take up the entire width and height of its parent element while maintaining its aspect ratio. 
- This is particularly useful when you want to ensure that the image fills its container completely, which is a common requirement for responsive designs.
```js
import Image from 'next/image';

const SampleImage = () => (
  <div style={{ position: 'relative', width: '100%', height: '500px' }}>
    <Image
      src="/path/to/image.jpg"
      alt="Sample Image"
      layout="fill"
      objectFit="cover" // You can also use other values like 'contain', 'cover', 'none', etc.
    />
  </div>
);

export default SampleImage;

```
- Parent Element (div): The parent element needs to have a position set to relative and specific width and height.
- layout="fill": This prop makes the Image component fill the width and height of the parent element.
- objectFit: This CSS property defines how the image should fit within its container. Common values are cover (fills the container while maintaining aspect ratio), contain (scales the image to fit within the container while maintaining aspect ratio), fill, none, and scale-down.
- The fill prop ensures that images adapt to different screen sizes and container dimensions.

## Creating a Reusable Component or Hero Component
- ![img_13.png](img_13.png)
- We will pass some props to customize the component from our pages.
```js
import type {StaticImageData} from "next/image";
import Image from "next/image";


type HeroProps =  {
    imgData: StaticImageData;
    imgAlt: string;
    title: string;
}

export default function Hero(props: HeroProps){
    return (
        <div className="relative h-screen">
            <div className="absolute -z-10 inset-0">
                <Image src={props.imgData}
                       alt={props.imgAlt}
                       fill
                       style={{objectFit: 'cover'}}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900">

                </div>
            </div>
            <div className="pt-48 flex justify-center items-center">
                <h1 className="text-white text-6xl">
                    {props.title}
                </h1>
            </div>
        </div>
    )
}
```
- We can use it as follows:
```js
import reliabilityImg from "../../../public/reliability.jpg";
import Hero from "@/components/Hero";

export default function ReliabilityPage() {
    return (
        <Hero imgData={reliabilityImg} imgAlt="welding" title="Super high reliability hosting"></Hero>
    )
}
```
- To our header we can add some styling like this:
```js
import Link from "next/link";

export default function Header() {
    return (
        <div className="w-full absolute text-white z-10 ">
            <nav className="container relative flex flex-wrap items-center justify-between mx-auto p-8">
            <Link href="/" className="font-bold text-3xl">Home</Link>
                <div className="space-x-4 text-xl">
            <Link href="/performance">Performance</Link>
            <Link href="/reliability">Reliability</Link>
            <Link href="/scale">Scale</Link>
                </div>
            </nav>
        </div>
    )
}
```

## Deploying the application
- If we want to deploy to vercel we will use npx vercel command in the terminal, and we will be asked to login to vercel.
- We will have to fill some metadata about our project

## Changing Data with Mutations
- To install prisma run the following commands 
```shell
npm install prisma 

npx prisma init --datasource-provider sqlite

//After creating a model inside schema.prisma, run this command
npx prisma migrate dev 
```
- Inside the schema.prisma file, write a model like this 
```js
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Snippet {
  id    Int    @id @default(autoincrement())
  title String
  code  String
}

```
- ![img_14.png](img_14.png)
- Now we need to create a prisma client to access our database
```js
import {PrismaClient} from "@prisma/client";

//Will be used to perform CRUD operations
export const db = new PrismaClient();
// db.snippet.create({
//     data:{
//         title:'Title!',
//         code: 'const abc = () => {}'
//     }
// })
```
- Now we add a new create snippet form like this:
```js
export default  function SnippetCreatePage(){
    return(
        <form>
            <h3 className="font-bold m-3">Create a Snippet</h3>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <label className="w-12" htmlFor="title">
                        Title
                    </label>
                    <input
                        name="title"
                        className="border rounded p-2 w-full"
                        id="title"
                    />
                </div>
                <div className="flex gap-4">
                    <label className="w-12" htmlFor="code">
                        Code
                    </label>
                    <textarea
                        name="code"
                        className="border rounded p-2 w-full"
                        id="code"
                    />
                </div>
                <button type="submit" className="rounded p-2 bg-blue-200">
                    Create
                </button>
            </div>
        </form>
    )
}
```
- Remember default behavior of a form POST is to dump everything into a querystring, we use event.preventDefault() to circumvent that and we will use Server Actions

## Server Actions
- ![img_15.png](img_15.png)
- Server actions are functions that will be called with the values a user entered into a form.
- To submit a form we will use a server action
```js
import {db} from '@/db';
import {redirect} from "next/navigation";

export default  function SnippetCreatePage(){

    async function createSnippet(formData:FormData){
        // This needs to be a server action
        //Special directive used by Next.js
        'use server';
        //Check the user's inputs and make sure they are valid
        //Typescript knows that whenever we want to get some data from a form, it is of type FormDataEntryValue so we cast it as string
        const title = formData.get('title') as string;
        const code = formData.get('code') as string;

        //Create a new record in the database
        const snippet = await db.snippet.create({
            data:{
                title: title,
                code: code
            }
        });
        console.log(snippet);
        // Redirect the user back to the root route
        redirect('/');
    }
    return(
        <form action={createSnippet}>
            <h3 className="font-bold m-3">Create a Snippet</h3>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <label className="w-12" htmlFor="title">
                        Title
                    </label>
                    <input
                        name="title"
                        className="border rounded p-2 w-full"
                        id="title"
                    />
                </div>
                <div className="flex gap-4">
                    <label className="w-12" htmlFor="code">
                        Code
                    </label>
                    <textarea
                        name="code"
                        className="border rounded p-2 w-full"
                        id="code"
                    />
                </div>
                <button type="submit" className="rounded p-2 bg-blue-200">
                    Create
                </button>
            </div>
        </form>
    )
}
```
- **_How traditional React app works**_ 
- ![img_16.png](img_16.png)
- On Next.js things are different
- With Next.js some of our code is running on the browser and some of it runs on the server.
- - ![img_17.png](img_17.png)
- Like in the above code, the createSnippet() function (Server action) is executed on the server.
- In the above code, whenever we submit the form, some javascript that runs on the browser collects the data and sends it off to a function that runs on the server.
- ![img_18.png](img_18.png)
- Server actions run on the server. 
- Next.js create a miniature route handler behind the scenes to handle this interaction.

## Client Components and Server Components
- Next apps are built with 2 kinds of components: client components and server components
- ![img_20.png](img_20.png)
- ![img_21.png](img_21.png)
- Client components are those React components which we already use: they return some kind of JSX that is rendered into HTML, and then it is displayed on the screen
- Client components can use hooks, event handlers.
- Server components bend the rules of traditional components a little bit. Usually we want to use server components for better performance and UX.
- Prefer to use server components

### Server Components
- By default all components are server components.
- Server components can use async/await. Don't need useState or useEffect to do data fetching.
- ![img_22.png](img_22.png)
- Server components have a few limitations: 
- We cannot use any kind of hook.
- We cannot assign any event handlers.
- ![img_23.png](img_23.png)

### Client Components
- Created by adding 'use client' at the very top of the file
- Have all the usual rules of components
- Can have hooks, event handlers
- Cannot directly show a server component(there is one exception)
- ![img_24.png](img_24.png)
- This will not work
- ![img_25.png](img_25.png)

### When do we use each kind of component
- ![img_26.png](img_26.png)
- Use client component if we need to use hooks or event handlers.
- ![img_27.png](img_27.png)
- When a browser makes a request to next server, it sends some HTML immediately.
- Both server and client component are rendered into HTML and sent back to the browser.
- That HTML will also have a script tag inside of it which says look back into Next.js server and download some javascript.
- That javascript file will implement some event handlers or hooks.
- So that javascript file will force the browser to make a second request. 
- ![img_28.png](img_28.png)
- When the second request reaches the Next.js server, it is going to look at all the client components and extract all the javascript from the client components, put it into a file and send it back to the browser.
- Even though we have client components, that client component gets rendered one time on the server
- Always favor using server components.

## Back to Fetching Data
- ![img_19.png](img_19.png)
```js
import {db} from "@/db"

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderedSnippets = snippets.map((snippet) => {
    return (
        <div key={snippet.id}>
          {snippet.title}
        </div>
    )
  });

  return (
    <div>
      <h3 className="font-bold m-3">List of snippets</h3>
      <div>
        {renderedSnippets}
      </div>
    </div>
  );
}

```

## Adding Dynamic Paths
- ![img_29.png](img_29.png)
- Dynamic Path is like a wildcard.
- ![img_30.png](img_30.png)
- These square brackets are like a wildcard. They will match anything after the word "snippets" in their path.
- ![img_31.png](img_31.png)
- Next.js is going to capture this value and pass it as a props to our component
```js
    export default function SnippetShowPage(props:any){
    console.log(props);
    return (
    <div>
    Snippet Show Page
    </div>
    )

}
```
- This will print the following in the console when we navigate to localhost:3000/snippets/7:
- ![img_32.png](img_32.png)
- Please note it is always treated as a string. It has a property name of "id" because that's the name of the folder.

## Async Dynamic Params in Next.js
- In Next.js 15 we must await params or searchParams before accessing.
```js
const { id } = await props.params;
 
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(id) },
  });
```
- Also, we need to update the Interface and wrap the params in a Promise
```js
interface SnippetShowPageProps {
  params: Promise<{
    id: string;
  }>;
}
```
- To use dynamic params in our application we can do this:
```js
import {db} from "@/db"
import {notFound} from "next/navigation";

type SnippetShowPageProps = {
    params:{
        id:string
    }
}

export default async function SnippetShowPage(props:SnippetShowPageProps) {
    const snippet = await db.snippet.findFirst({
        where: {
            id: parseInt(props.params.id)
        }
    });
    if(!snippet){
        return notFound();
    }
    return (
        <div>
            {snippet.title}
        </div>
    )

}
```

## Custom Not Found Pages
- We have some special file names in the "app" folder
- ![img_33.png](img_33.png)
- We will create a not-found.tsx file inside the [id] folder like this
```js
export default async function NotFound(){
    return (<div>
        <h1 className="text-xl bold">
            Sorry, we could not find that particular snippet!
        </h1>
    </div>)
}
```
- Now from our component inside [id]/page.tsx when we call the function return notFound() we will be navigated to the not-found.tsx page.

## Automatic Loading Spinners
- We have a special file loading.tsx
- This is displayed when a server component is fetching some data.
```js
export default function SnippetShowLoadingPage(){
    return <div>Loading...</div>
}
```
## Creating a snippet edit page
- ![img_34.png](img_34.png)
- Inside the [id] folder create a new folder called edit and add a page.tsx inside of it.
- We can pass the params to the edit page when we navigate to : "http://localhost:3000/snippets/2/edit"
```js

type SnippetEditPageProps = {
    params:{
        id:string
    }
}
export default function SnippetEditPage(props:SnippetEditPageProps) {
      const id = parseInt(props.params.id);
      return (
          <div>
              Edit snippet with id: {id}
          </div>
      )
}
```
## Showing a client component inside a server component
- ![img_35.png](img_35.png)
- Since inside the edit page we need to do data fetching using async await keywords, we cannot make it a client component.
- ![img_36.png](img_36.png)
- We will create a client component called SnippetEditForm, and we will pass the snippet down from our server component to the client component as a prop.
- This client component will set up state and event handlers to work with Monaco Editor
- Client components are rendered on the server the first time and a second request will come in from the browser and load up all the javascript required to attach all the hooks and event handlers.
- We can have a server component like this:
```js
import {db} from "@/db"
import {notFound} from "next/navigation";
import SnippetEditForm from "@/components/SnippetEditForm";

type SnippetEditPageProps = {
    params:{
        id:string
    }
}
export default async function SnippetEditPage(props:SnippetEditPageProps) {
      const id = parseInt(props.params.id);
      const snippet = await db.snippet.findFirst({
          where: {
              id:id
          }
      });

      if(!snippet){
          return notFound();
      }

      return (
          <div>
             <SnippetEditForm snippet={snippet} />
          </div>
      )
}
```
- We will have a client component SnippetEditForm like this:
```js
'use client'
import type {Snippet} from "@prisma/client";

type SnippetEditFormProps = {
    snippet: Snippet;
}
export default function SnippetEditForm({snippet}: SnippetEditFormProps) {
    return (
        <div>
            Client component has snippet with title: {snippet.title}
        </div>
    )
}
```

## Adding state inside the Client Component 
- Inside our snippet edit form client component, we can use the monaco editor and whenever the value of snippet code changes, we need to hold it in a useState() hook like this:
- Note that the snippet is being passed to us as a prop from the server component.
```js
'use client'
import type {Snippet} from "@prisma/client";
import {Editor} from "@monaco-editor/react";
import {useState} from "react";

type SnippetEditFormProps = {
    snippet: Snippet;
}
export default function SnippetEditForm({snippet}: SnippetEditFormProps) {

    const [code,setCode] = useState(snippet.code);
    const handleEditorChange = (value:string = "") =>{
        console.log(value)
        setCode(value);
    }
    
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
        </div>
    )
}
```
- Now once we have the code in a state variable, we need to update the snippet code in the database. Hence, we may need to call a server action

## Using Server Actions in Next.js Client Components
- Saving and changing data is done using Server Actions
- Server Actions cannot be defined inside Client Components
- ![img_37.png](img_37.png)
- To use Server Actions in a Client Component, we can either export them from a separate file with "use server" at the top, or pass them down through props from a Server Component.
- ![img_38.png](img_38.png)
- ![img_39.png](img_39.png)
- Server components cant pass event handlers down to client components: this is one exception
- ![img_40.png](img_40.png)
- ![img_41.png](img_41.png)
- Option #2 is preferred where we define our server actions in a separate file and import it into Client Component
- It promotes code reuse.

## Server Actions in a separate file
- In src folder, make a new folder called actions and add a file index.ts 
- Here we will define our server actions
- To call a server action from a client component, first import it.
- We can import it as:
```js
import * as actions from "@/actions";
```
- This way if we write action.editSnippet() we can access all actions inside that index.ts file

## Options for calling Server Actions from Client Component
- Option # 1
- ![img_42.png](img_42.png)
- We use the bind function to bind our state to the server action.
- We can then use a form and submit it.
- ![img_43.png](img_43.png)
- Option # 2
- ![img_44.png](img_44.png)
- Here we don't use a form, there is no formdata, so only the arguments passed directly to server action are received.
- ![img_45.png](img_45.png)
- Here we use startTransition hook
- startTransition() makes sure we don't navigate away before our data actually has been updated.
- The useTransition hook is a React hook that enables you to create non-blocking updates in your application, which can greatly improve the user experience by keeping your interface responsive during transitions.
- While this hook isn't specific to Next.js, it's a part of React's core that you can use in any React-based application, including those built with Next.js.
- The useTransition hook allows you to mark state updates as transitions, which are lower-priority updates. This can be useful when you want to avoid blocking user interactions with high-priority updates, such as typing in an input field or clicking a button.
```js
//Api logic
// pages/api/action.js
export default function handler(req, res) {
    if (req.method === 'POST') {
        const { data } = req.body;
        // Perform some server-side action with data
        res.status(200).json({ message: `Processed data: ${data}` });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}



//Server Action
// lib/actions.ts
export async function serverAction(data: string) {
    const response = await fetch('/api/action', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
    });
    return response.json();
}


//Client Component
import { useState } from 'react';
import { serverAction } from '../lib/actions';

const MyComponent = () => {
  const [data, setData] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await serverAction(data);
    setMessage(result.message);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Enter some data"
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default MyComponent;

```
- ![img_46.png](img_46.png)
- Option #1 is generally preferred even by Next.js documentation where we use a form
- So to demonstrate how Option #1 using a form and a bind() function, we first make changes in our actions/index.ts file 
```js
export async function editSnippet(id:number, code:string){
    console.log(id,code);
}
```
- Now we make changes inside our client component:
```js
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
```

## Deleting a snippet
- First we will create an action inside our actions.ts file like this 
```js
export async function deleteSnippet(id:number){
    await db.snippet.delete({
        where:{id:id}
    });

    redirect('/');
}
```
- Next we will call the snippet this action from our [id]/page.tsx file like this
```js
import {db} from "@/db"
import {notFound} from "next/navigation";
import Link from "next/link";
import * as actions from "@/actions";

type SnippetShowPageProps = {
    params:{
        id:string
    }
}

export default async function SnippetShowPage(props:SnippetShowPageProps) {

    //Add some artificial delay
    await new Promise((r)=>setTimeout(r,2000))


    const snippet = await db.snippet.findFirst({
        where: {
            id: parseInt(props.params.id)
        }
    });
    if(!snippet){
        return notFound()
    }

    const handleDeleteAction = actions.deleteSnippet.bind(null,snippet.id)
    return (
        <div>
            <div className="flex m-4 justify-between items-center">
                <h1 className="text-xl font-bold">{snippet.title}</h1>
                <div className="flex gap-4">
                    <Link href={`/snippets/${snippet.id}/edit`} className="p-2 border rounded">Edit</Link>
                    <form action={handleDeleteAction}>
                        <button  className="p-2 border rounded">Delete</button>
                    </form>
                </div>
            </div>
            <pre className="p-3 border rounded bg-grey-200 border-gray-200">
                <code>{snippet.code}</code>
            </pre>
        </div>
    )

}
```
- The good thing about using the bind() function approach, is that even if the user has disabled javascript inside their browser, it will still work.
- 