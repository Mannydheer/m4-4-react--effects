# 4.4.2 UseEffect hook

---

### Side effects

What happens when you want to do something _other_ than rendering to the screen?

---

- Updating the document title
- Fetching data from a network
- Doing something when the user scrolls

---

### Doing something on scroll

Here's how we do this in vanilla JS:

```js
window.addEventListener('scroll', () => {
  console.log('User scrolled!')
});
```
---

What about in React?

---

# 🙅‍♀️Not the answer:

```js
const App = () => {
  window.addEventListener('scroll', () => {
    console.log('scroll')
  })

  return <div style={{ height: '300vh' }}>
    <p>This is bad.</p>
    <p>
      Set some state in the event
      <br />
      listener to see why
    </p>
  </div>
}

render(<App />)

```

---

# The `useEffect` hook

---

```js
// `useEffect` takes a function.
// It calls this function AFTER the render
//import at the top with useEffect
React.useEffect(() => {

})
```

---

It takes a "dependencies" array

```js
React.useEffect(() => {
    console.log('some state changed!') //will only happen if one of the items gets upddateed. 
}, [someState, someOtherState]);
```

---

Neat example: logging

```js live=true
const Input = ({ val, onChange }) => {
  React.useEffect(() => {
    console.log(val)
  }, [val]);

  return <input
    value={val}
    onChange={(ev) =>
      onChange(ev.currentTarget.value)
    }
  />
}

const App = ({ title }) => {
  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');

  return (
    <>
      <Input val={name} onChange={setName} />
      <Input val={address} onChange={setAddress} />
    </>
  )
}

render(<App />)
```

---

## Fetching from a network

You _definitely_ don't want to do this in every render

---

```js
const App = () => {
  const [cart, setCart] = React.useState({});
//fetching twice.....?
  // fetch('some-url')
  //   .then(data => {
  //     console.log('Got data:', data);
  //     setCart(data); // remove this fetch
  //   })

  React.useEffect(() => {
      fetch('some-url')
        .then(data => {
          console.log('Got data:', data);
          setCart(data);
        });
    
      return JSON.stringify(cart, null, 2);
  }, []); //remove this cart - beofre removal [cart[]]
  
  // ...
}
```

---

**Tip:** Use an empty dependency array to _only_ run the fetch on mount

---

# Exercises

Update the following snippets to make use of `useEffect`

---

```js
const App = () => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
      document.title = `You have clicked ${count} times`;


  },[count])

  // document.title = `You have clicked ${count} times`;

  return (
    <button onClick={() => setCount(count + 1)}>
      Increment
    </button>
  );
}
```

---

```js
const App = ({ color }) => {
  const [value, setValue] = React.useState(false);


//useEffect will only be triggered once there is a CHANGE... if there is no change, does not do anything after re rendering. 
//keep in mind, rerender is trigger by the state change
  React.useEffect(() => {

  window.localStorage.setItem('value', value);
  // window.localStorage.setItem('color', color);

  },[value])
    React.useEffect(() => {

  // window.localStorage.setItem('value', value);
  window.localStorage.setItem('color', color);

  },[color])
  // window.localStorage.setItem('value', value);
  // window.localStorage.setItem('color', color);
  return (
    <div>
      Value: {value}
      <button onClick={() => setValue(!value)}>
        Toggle thing
      </button>
    </div>
  );
}
```

---

```js
const Modal = ({ handleClose }) => {

  React.useEffect(() => {
      window.addEventListener('keydown', (ev) => {
    if (ev.code === 'Escape') {
      handleClose();
    }
  }[]); //in this case, becasue the array is empty, it will only trigger on the first page load, or as soon as you load the page. And not again, whereas if the array had something, it will reload useEffect on every change. 

  })
  // window.addEventListener('keydown', (ev) => {
  //   if (ev.code === 'Escape') {
  //     handleClose();
  //   }
  // });

  return (
    <div>
      Modal stuff
    </div>
  );
}
```

---

# Unsubscribing

---

There's one other thing to know about `useEffect`: you can _clean stuff up_ when values change.

---

### The problem:

Let's say we have some routes:

```js
<Router>
  <Route path="/">
    <Home>
  </Route>
  <Route path="/about">
    <About />
  </Route>
</Router>
```

---

Our Home component has some sort of event listener.
It also has a link to the other route.

```js
const Home = () => { //must remve event listenner....
  React.useEffect(() => {
    window.addEventListener('scroll', func());
  }, []);

  return (
    <div>
      <Link to="/about">
        About
      </Link>
    </div>
  );
}
```

---

We click the "About" link.

The scroll handler _doesn't go away_ just because we changed components.

`<Home>` is no longer rendered, but its scroll-handler lives on.

---

# Unsubscribing

```js
const Home = () => {
  React.useEffect(() => {
    window.addEventListener('scroll', aFunc());

    return () => { //this function will clean up what we set up in the first place
      window.removeEventListener('scroll', aFunc());
    }
  }, []);
}
```

---

Unsubscribes are processed **right before** the next update, and **right before** removal.

---

import updateASrc from './assets/update-A.svg';

<img src={updateASrc} style={{ width: '100%' }} />

---

import updateBSrc from './assets/update-B.svg';

<img src={updateBSrc} style={{ width: '100%' }} />

---

import updateCSrc from './assets/update-C.svg';

<img src={updateCSrc} style={{ width: '100%' }} />

---

import updateDSrc from './assets/update-D.svg';

<img src={updateDSrc} style={{ width: '100%' }} />

---

# Exercises

Make sure to do the appropriate cleanup work

---

```js

// other way
const App = () => {
      let timer = window.setTimeout(() => {
      console.log('1 second after update!')
    }, time);
  React.useEffect(() => {
    timer(1000)
    return () => {
      clearTimeout(timerTofu)
    }
  }, [])



// seTimeout is similar to setInterval...
const App = () => {
  React.useEffect(() => {
    let timer = window.setTimeout(() => {
      console.log('1 second after update!')
    }, 1000);

      return () => {
        clearTimeout(timer);
      }

  }, [])

//return null - (before adjustment)
}
```

---

```js

const handlePress = (ev) => {
  console.log('You pressed: ' + ev.code)
}
const App = () => {
  React.useEffect(() => {
    window.addEventListener('keydown', handlePress()
    })

    return () => {
      window.removeEventListener('keydown', handlePress() )
    }
  }, [])

  // return null;
// }
```

---

# Custom hooks

React hooks are powerful because we can _compose them_.

---

A custom hook is a **function** that starts with **use**.

Examples:

- _useApiEndpoint_
- _useTextToSpeech_
- _useScrollPosition_
- _useCounter_

React tooling actually **does** care that the name starts with `use`.

---

Custom hooks use **one or more** official React hooks.

They're a great way to **reuse logic**.

---

### Example

Tracking mouse position

<div class="row">
<div class="col">

```js
const App = ({ path }) => {
//assume its in the same file. as below file. 

  // const [mousePosition, setMousePosition] = React.useState({
  //   x: null,
  //   y: null
  // });

  // React.useEffect(() => {
  //   // const handleMousemove = (ev) => {
  //   //   setMousePosition({ x: ev.clientX, y: ev.clientY });
  //   // };

  //   window.addEventListener('mousemove', handleMousemove);

  //   return () => {
  //     window.removeEventListener('mousemove', handleMousemove)
  //   }
  // }, []);

  return (
    <div>
      The mouse is at {mousePosition.x}, {mousePosition.y}.
    </div>
  )
}
```
</div>
<div class='col'>

```js
// refactoring time...

const useMousePos = () => {
    const [mousePosition, setMousePosition] = 
    React.useState({
    x: null,
    y: null
  });


  React.useEffect(() => {
    const handleMousemove = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener('mousemove', handleMousemove);

    return () => {
      window.removeEventListener('mousemove', handleMousemove)
    }
  }, []);
return mousePosition;
}

const App = ({ path }) => {

const mousePosition: useMousePos();
  return (
    <div>
      The mouse is at {mousePosition.x}, {mousePosition.y}.
    </div>
  )
}

}

}

```
</div>
</div>

---

# Exercises

Extract a custom hook

---

```js
const App = ({ path }) => {
  // const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch(path)
  //     .then(res => res.json())
  //     .then(json => {
  //       setData(json);
  //     })
  // }, [path])

  const backEnd = useBackEnd();

  return (
    <span>
      Data: {JSON.stringify(backEnd)}
    </span>
  );
}

------------------------------------------------------------------------

const useBackEnd =(path) => {

    const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch(path)
      .then(res => res.json())
      .then(json => {
        setData(json);
      })
  }, [path]) //everytime the path changes/..... this useeffect will get triggered. 
    return data; //review this

})



```

---

```js live=true
const Time = ({ throttleDuration }) => {
  const [time, setTime] = React.useState(
    new Date()
  );

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(new Date());
    }, throttleDuration);

    return () => {
      window.clearInterval(intervalId);
    }
  }, [throttleDuration])

  return (
    <span>
      It is currently<br />{time.toTimeString()}
    </span>
  );
}

render(<Time throttleDuration={1000} />)
```

---

[Next lecture: Refs](../lecture-3-refs)
