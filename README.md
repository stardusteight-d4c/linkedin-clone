# LinkedIn | MongoDB, Recoil & API Routes

![banner](banner.png)

> A dynamic LinkedIn feed interface, where users can authenticate and make posts, they can also delete their own posts. Modals and a Toggle Theme with smooth animations were created with Framer Motion. With the next-themes library and TailwindCSS we can manage the application theme with the `dark` variant and with the `useTheme` hook switch between themes. Using the News API, it was possible to implement real-time news of the main news in Brazil.

:arrow_right: Theme Managing | next-themes and TailwindCSS <br />
:arrow_right: Animations with Framer Motion <br />
:arrow_right: Initialize MongoDB in your Next.js project <br />
:arrow_right: MongoDB & API Routes <br />
:arrow_right: useEffect & Recoil | Fetch data and render in real-time with useEffect and useRecoilState hooks<br />

<br />

## Theme Managing | next-themes and TailwindCSS 

next-themes is a cool package that provides an easy solution to managing your website theme.

- `npm install next-themes`

You'll need a Custom App to use next-themes. Adding dark mode support takes 2 lines of code:

```jsx
// pages/_app.jsx

import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
```

In your `tailwind.config.js`, set the dark mode property to class:

```js
// tailwind.config.js

module.exports = {
  darkMode: 'class'
}
```

Set the attribute for your `Theme Provider` to class:

```jsx
// pages/_app.js

<ThemeProvider attribute="class">
```

If you're using the value prop to specify different attribute values, make sure your dark theme explicitly uses the `dark` value, as required by Tailwind.

That's it! Now you can use dark-mode specific classes, default color is light theme:

```jsx
<h1 className="text-black dark:text-white">
```

### Toggle Theme with useTheme hook

Your UI will need to know the current theme and be able to change it. The `useTheme` hook provides theme information:

```jsx
// components/Header.jsx

import { useTheme } from 'next-themes'

// ...
const Header = () => {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme, theme } = useTheme()
	
  /**
   * resolvedTheme: If enableSystem is true and the active theme
   * is "system", this returns whether the system preference
   * resolved to "dark" or "light". Otherwise, identical to theme 
   */  
	 
  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []) 
  
  /** 
   * useEffect runs after every render, or by default it runs after
   * the first render and after every update. We can think in terms 
   * of “mounting” and “updating”, to describe that the effects happen 
   * “after rendering”. React ensures that the DOM has been updated when 
   * running the effects.
   */
  
{mounted && (
<div
  className={`bg-gray-600 flex items-center px-0.5 cursor-pointer rounded-full h-6 w-12 flex-shrink-0 relative ${
    resolvedTheme === 'dark' ? 'justify-end' : 'justify-start'
  }`}
  onClick={() =>
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }
  
// ...
}

```
*<i>npmjs.com/package/next-themes</i>

<br />

## Animations with Framer Motion 

Framer Motion is an open source motion library for React, made by Framer. Where the core of the library is the motion component. Think of it as a simple HTML or SVG element, overloaded with animation features.The core of the library is the motion component. Think of it as a plain HTML or SVG element, supercharged with animation capabilities.

```jsx
<motion.div />
```

### How to animate in Framer Motion

There are multiple ways to animate in Framer Motion, scaling to the complexity of your needs.

#### Simple animations

Most animations will be performed with the animate prop.

```jsx
<motion.div animate={{ x: 100 }} />
```

When any value in animate changes, the component will `automatically animate` to the updated target.

#### Example of Backdrop/Overlay component animation of modals with Framer Motion:

```jsx
// components/Backdrop.jsx

import { motion } from 'framer-motion'

const Backdrop = ({ children, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full overflow-y-scroll bg-gray-500/70 dark:bg-gray-900/70"
      initial={{ opacity: 0 }} // starting the animation
      animate={{ opacity: 1 }} // end of animation
      exit={{ opacity: 0 }} // exiting the animation
    >
      {children}
    </motion.div>
  )
}

export default Backdrop
```


### Variants

Setting animate as an object is useful for simple, single-component animations. But sometimes we want to create animations that propagate throughout the DOM, and orchestrate those animations in a declarative way. We can do so with variants.

Variants are sets of pre-defined targets: 

```jsx
// components/Modal.jsx

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
}

const gifYouUp = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.15,
      ease: 'easeOut',
    },
  },
}
```

They're passed into `motion` components via the `variants` prop. These variants can be referred to by label, wherever you can define an `animation object`: 

```jsx
// components/Modal.jsx

import { motion } from 'framer-motion'

const Modal = ({ handleClose, type }) => {
  const { data: session } = useSession()
  const post = useRecoilValue(getPostState)

  return (
    <Backdrop onClick={handleClose}>
      {type === 'dropIn' && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col rounded-lg justify-center bg-white dark:bg-[#1D2226] w-full max-w-lg -mt-44 md:my-auto mx-6"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex items-center justify-between border-b border-white/75 px-4 py-2.5">
            <h4 className="text-xl">Criar um post</h4>
            <IconButton onClick={handleClose}>
              <CloseRoundedIcon className="h-7 w-7 dark:text-white/75" />
            </IconButton>
          </div>

          <div className="p-4 space-y-2">
            <div className="flex items-center space-x-2">
              <Avatar src={session?.user?.image} className="!h-11 !w-11" />
              <h6>{session?.user?.name}</h6>
            </div>

            <Form />
          </div>
        </motion.div>
      )}

      {type === 'gifYouUp' && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="flex rounded-lg  w-full max-w-6xl bg-gray-300 dark:bg-[#0d1117] -mt-[7vh] mx-"
          variants={gifYouUp}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.img
            alt="post/image"
            onDoubleClick={handleClose}
            src={post.photoUrl}
            className="object-contain max-h-[80vh] w-full max-w-3xl rounded-l-lg"
          />
          <div className="w-full md:w-3/5 bg-white dark:bg-[#1D2226] rounded-r-lg">
            <Post post={post} modalPost />
          </div>
        </motion.div>
      )}
    </Backdrop>
  )
}

export default Modal
```
*<i>framer.com/docs/animation</i>

### Transition

A transition defines how values animate from one state to another. A transition defines the type of animation used when animating between two values: 

```jsx
<motion.div
  animate={{ x: 100 }}
  transition={{ delay: 1 }}
/>
```

It can also accept props that define which type of animation to use a `Tween`, `Spring` or `Inertia`.

#### Spring transition in Toggle Theme

An animation that simulates spring physics for realistic motion.

This is the default animation for physical values like `x`, `y`, `scale` and `rotate`.

<li><strong>type: "spring"</strong> - Set type to `spring` to animate using spring physics for natural movement. Type is set to `spring` by default.</li>

<li><strong>damping: number</strong> - Strength of opposing force. If set to 0, spring will oscillate indefinitely. Set to 10 by default.</li>

<li><strong>stiffness: number</strong> - Stiffness of the spring. Higher values will create more sudden movement. Set to 100 by default.</li>
<br />

```jsx
const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
}
```

Framer Motion can animate between any CSS layout by using performant transforms instead of the layout system.

For example, this component is animated by switching `justify-start` and `justify-end`.

```jsx
// components/Header.jsx

{/* Dark mode toggle */}
{mounted && (
  <div
    className={`bg-gray-600 flex items-center px-0.5 cursor-pointer rounded-full h-6 w-12 flex-shrink-0 relative ${
      resolvedTheme === 'dark' ? 'justify-end' : 'justify-start'
    }`}
    onClick={() =>
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    }
  >
    <span className="absolute left-0.5">
      <MdDarkMode className="w-4 h-4 text-white" />
    </span>
    <motion.div
      className="z-40 w-5 h-5 bg-white rounded-full"
      layout
      transition={spring}
    />
    <span className="absolute right-0.5">
      <BsLightningChargeFill className="w-4 h-4 text-white" />
    </span>
  </div>
)}
```
*<i>framer.com/docs/transition</i>

<br />

## Initialize MongoDB in your Next.js project

Created by developers, for developers

With a document data model that maps how developers think and code, and a powerful, unified query API, MongoDB enables faster, more flexible application development.

### Add MongoDB as a Dependency - Install the Node.js driver:

 - `npm install mongodb@4.9`
 
This command performs the following actions:

- Downloads the mongodb package and the dependencies it requires
- Saves the package in the node_modules directory
- Records the dependency information in the package.json file

At this point, you are ready to use the Node.js driver with your application.

### Create a MongoDB Cluster

<li><strong>Create a Free Tier Cluster in Atlas:</strong></li>

Create a free tier `MongoDB cluster` on `MongoDB Atlas` to store and manage your data. MongoDB Atlas hosts and manages your MongoDB database in the cloud.

<li><strong>Connect to your Cluster:</strong></li>

You can connect to your MongoDB cluster by providing a `connection string` which instructs the driver on where and how to connect. The connection string includes information on the hostname or IP address and port of your cluster, the authentication mechanism, user credentials when applicable, and other connection options.

To retrieve your connection string for the cluster you created in the previous step, log into your Atlas account and navigate to the `Database` section and click the `Connect` button for the cluster that you want to connect.

Proceed to the Connect Your Application section and select the Node.js driver. Select the Connection String Only tab and click the Copy button to copy the connection string to your clipboard.

Save your `connection string` to a safe location.

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.7stmv.mongodb.net/<dbname>?retryWrites=true&w=majority
MONGODB_DB=database-name
```

### Connect to Your Next.js Application

<li><strong>Create your Node.js Application:</strong></li>

Create a file to contain your application called `util/mongodb.js` in your project directory. Add the following code, assigning the uri variable the value of your `connection string`.

```js
// util/mongodb.js

import { MongoClient } from 'mongodb'

let uri = process.env.MONGODB_URI
let dbName = process.env.MONGODB_DB

let cachedClient = null
let cachedDb = null

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

if (!dbName) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  )
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const db = await client.db(dbName)

  cachedClient = client
  cachedDb = db

  return { client, db }
}
```
*<i>mongodb.com/docs/drivers/node/current/quick-start/#connect-to-your-application</i>

<br />

## MongoDB & API Routes

API routes provide a solution to build your `API` with Next.js.

Any file inside the folder `pages/api` is mapped to `/api/` and will be treated as an API endpoint instead of a page. They are server-side only bundles and won't increase your client-side bundle size.

For an API route to work, you need to export a function as default (also known as `request handler`), which then receives the following parameters:

<li><strong>req</strong>: An instance of http.IncomingMessage, plus some pre-built middlewares</li>
<li><strong>res</strong>: An instance of http.ServerResponse, plus some helper functions</li>

To handle different `HTTP methods` in an API route, you can use `req.method` in your request handler, like so:


```js
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
  } else {
    // Handle any other HTTP method
  }
}
```
*<i>nextjs.org/docs/api-routes/introduction</i>

### MongoDB - CRUD Operations

<li><strong>Find Data</li></strong>

In MongoDB we use the `find` and `findOne` methods to find data in a `collection`. 

<li><strong>Sort the Result</li></strong>

Use the `sort()` method to sort the result in ascending or descending order. The sort() method takes one parameter, an object defining the sorting order.

<li><strong>Insert Into Collection</li></strong>

To insert a record, or document as it is called in MongoDB, into a collection, we use the `insertOne()` method. The first parameter of the insertOne() method is an object containing the name(s) and value(s) of each field in the document you want to insert.


<li><strong>Getting Array of Objects</li></strong>

`toArray()` method in the Mongo database returns an array that has all the `documents` of a Mongo `collection` from the cursor object.

<li><strong>Delete Document</li></strong>

To delete a record, or document as it is called in MongoDB, we use the `deleteOne()` method. The first parameter of the deleteOne() method is a query object defining which document to delete.

*<i>w3schools.com/nodejs/nodejs_mongodb_find.asp</i>

```jsx
// pages/api/index.js

import { Timestamp } from 'mongodb'
import { connectToDatabase } from '../../../util/mongodb'

const { db } = await connectToDatabase()

export default async function handler(req, res) {
  const { method, body } = req

  if (method === 'GET') {
    try {
      const posts = await db
        .collection('posts')
        .find()
        .sort({ timestamp: -1 })
        .toArray()
      res.status(200).json(posts)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  if (method === 'POST') {
    try {
      const post = await db
        .collection('posts')
        .insertOne({ ...body, timestamp: new Timestamp() })
      res.status(201).json(post)
    } catch (error) {
      res.status(500).json(error)
    }
  }
```
<br />

## useEffect & Recoil | Fetch data and render in real-time with useEffect and useRecoilState hooks

Recoil is a state management library for React. Simple to implement and manage your states globally. 

The Recoil package lives in npm. To install the latest stable version, run the following command:

- `npm install recoil`

The atoms within the `atoms` directory are the core of global state management:

```js
// atoms/postAtom.js

import { atom } from 'recoil'

// const [handlePostState, setHandlePostState] = useState(false) 
export const handlePostState = atom({
  key: 'handlePostState', 
  default: false,
})
```

We give our atom a `unique key` and `set the default` value to `false`. We use `useRecoilState()` to `read` and to `get` a setter function that we use to update the state. But first, for the application to have access to atoms, we have to wrap its provider in `pages/_app.jsx`:

```jsx
// pages/_app.jsx

import { RecoilRoot } from 'recoil'
import '../styles/global.css'

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
		<RecoilRoot>
	    <Component {...pageProps} />
		</RecoilRoot>
  )
}

```

Now we can use this global state of atom as a `dependency` of a useEffect that does the fetch for the posts stored in the database, and every time its dependency is updated, the `useEffect` is executed again. Finishing by setting the value of `handlePost` to its default value `setHandlePost(false)`:

```jsx
// components/feed.jsx

import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { handlePostState } from '../atoms/postAtom'

const Feed = () => {
  const [posts, setPosts] = useState([])
  const [handlePost, setHandlePost] = useRecoilState(handlePostState)

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const responseData = await response.json()
      setPosts(responseData)
      setHandlePost(false)
    }

    fetchPosts()
  }, [handlePost])
  
  // ...
}
```

And when a new post is inserted, change the state of `handlePost` to `true`, so the Feed will be updated automatically without having to reload the page:

```jsx
// components/Form.jsx

const Form = () => {
	const [modalOpen, setModalOpen] = useRecoilState(modalState)
	const [handlePost, setHandlePost] = useRecoilState(handlePostState)

const uploadPost = async (e) => {
    e.preventDefault()

    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        input: input,
        photoUrl: photoUrl,
        username: session.user.name,
        email: session.user.email,
        userImg: session.user.image,
        createdAt: new Date().toString(),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    setHandlePost(true)
    setModalOpen(false)
  }
  
  // ...
}
```

