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

If you're using the value prop to specify different attribute values, make sure your dark theme explicitly uses the "dark" value, as required by Tailwind.

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
