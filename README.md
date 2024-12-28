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