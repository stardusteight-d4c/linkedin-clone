# LinkedIn | MongoDB, Recoil & API Routes

![banner](banner.png)

> A dynamic LinkedIn feed interface, where users can authenticate and make posts, they can also delete their own posts. Modals and a Toggle Theme with smooth animations were created with Framer Motion. With the next-themes library and TailwindCSS we can manage the application theme with the `dark` variant and with the `useTheme` hook switch between themes. Using the News API, it was possible to implement real-time news of the main news in Brazil.

:arrow_right: Theme Managing | next-themes and TailwindCSS <br />
:arrow_right: Animations with Framer Motion <br />
:arrow_right: MongoDB & API Routes <br />
:arrow_right: Recoil & useEffect - Real-time Rendering <br />

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

