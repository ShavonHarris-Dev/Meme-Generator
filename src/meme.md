# static sites 

- Read only, no changes to data

# Moving on to dynamic sites 

- read-write: ability to change data
- highly interactive
- displays YOUR data

- bank webiste
- airbnb
- etc

# Learn
- event listeners
-state
- conditional rendering 
-forms 
- side effects

# event listeners 2 ways 

1. .addeventlistener

2.  <div onclick="myFunction()" id="root"></div>

The second way is similar to how we do it in react

- react is taking the jsx and returning a plain javascript object

<button onClick={}> Click Me </button>

Because you're already in javascript instead of setting onclick to a string you can set onClick to an object and then add the function inside. Istead of stuffing the full function in the jsx 
 <button onClick={function() {}}>Click me</button>

 its better to define the function outside 

 export default function App() {
    function handleClick() {
        console.log("I was clicked!")
    }
    
    /**
     * Add our new function to the button
     */
    
    return (
        <div className="container">
            <img src="https://picsum.photos/640/360" />
            <button onClick={handleClick}>Click me</button>
        </div>
    )
}

# Note: I pass the function as a value so that react can add  the function as the event handler in case a click ever happens on the button

https://reactjs.org/docs/events.html#mouse-events

# how to update a variable and replace what we have on the screen with the new value of that variable

# the conudrum without use state

When you determine an element or variable at the top of the page. It's cemented in reacts memory and doesnt automatically update. The code only runs one time and thats the very first time the main component "App" gets rendered 

function App() {
    const thingsArray = ["Thing 1", "Thing 2"]
    
    function addItem() {
        const newThingText = `Thing ${thingsArray.length + 1}`
        thingsArray.push(newThingText)
        console.log(thingsArray)
    }
    
    const thingsElements = thingsArray.map(thing => <p key={thing}>{thing}</p>)
    
    return (
        <div>
            <button onClick={addItem}>Add Item</button>
            {thingsElements}
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

In vanilla javascript we would use document.query selector and push to the container holding the elements but react is declarative. We just need to update the data and react will react to that change and display the data to the UI.

state allows us to whenever we update our state (which is really values that we save inside the component) react will update user interface based on any changes to those values being changed in state.

# props vs state 

# props refers to the properties being passed into a component in order for it to work correctly similar to how a function receives parameteres "from above" a component receiving props is not allowed to modify those props ( they are immutable.)

# redflags

function addTwoNumbers(a, b) {
    a = 42
    return a + b
}

console.log(addTwoNumbers(1, 2))

function Navbar(props) {
    props.coverImage = "something else"
}

# set a or setting props in this situation are big red flags

# dark mode?

<Navbar darkMode={true} coverImage="some-image2" />

darkmode would be a property thats configuring the Navbar in order for it to act and display correctly

# state refers to values that are managed by the component, similar to variables declared inside a function. Anytime you have a changing values that should be saved/ displayed you'll likely be using state.

Values usually handled within the function will be handled by state like timeOfDay here

function greeting(name) {
    const date = new Date()
    const hours = date.getHours()
    
    let timeOfDay
    if(hours >= 4 && hours < 12) {
        timeOfDay = "morning"
    } else if(hours >= 12 && hours < 17) {
        timeOfDay = "afternoon"
    } else if(hours >= 17 && hours < 20) {
        timeOfDay = "evening"
    } else {
        timeOfDay = "night"
    }
    
    return `Good ${timeOfDay}, ${name}!`
}

console.log(greeting("Bob"))

# prop and state quiz 

1. How would you describe the concept of "state"?
A way for React to remember saved values from within a component.
This is similar to declaring variables from within a component,
with a few added bonuses (which we'll get to later)


2. When would you want to use props instead of state?
Anytime you want to pass data into a component so that
component can determine what will get displayed on the
screen.


3. When would you want to use state instead of props?
Anytime you want a component to maintain some values from
within the component. (And "remember" those values even
when React re-renders the component).


4. What does "immutable" mean? Are props immutable? Is state immutable?
Unchanging. Props are immutable. State is mutable.


# what does React.useState log

- you get an array back. The first value is undefined and the second is a function

[undefined, f()]

React.useState("Hello")

["hello", f()]

- now hello is the default value for the state that I want to save

# updating state

  const [yes, addYes] = useState('No')
    const [maybe, addMaybe] = useState('Sauce')
    console.log(useState)
    return (
        <div className="state">
            <h1 className="state--title">Is state important to know?</h1>
            <div className="state--value">
                <h1>{maybe}</h1>
            </div>
        </div>
    )
}

This will log Sauce to the h1

# array destructuring 

const result = React.useState("Yes")

vs. 

 const [result, func] = React.useState("Yes")


 # changing state

 The function that we are given allows us to update the state

 [isImportant, setIsImportant] = React.useState('Yes)

 -This function will allow us to go from no to yes

 - what value you provide to this function will be the new version of state
- you usally change the state whenever something specific happens on the page

   const [isImportant, setIsImportant] = React.useState("Yes")
    /**
     * Challenge: 
     * 1. Create a function called `handleClick` that runs
     *    setIsImportant("No")
     * 2. add a click event listener to the div.state--value
     *    that runs `handleClick` when the div is clicked.
     */
    
    function handleClick() {
        setIsImportant("No")
    }
    
    return (
        <div className="state">
            <h1 className="state--title">Is state important to know?</h1>
            <div className="state--value" onClick={handleClick}>
                <h1>{isImportant}</h1>
            </div>
        </div>
    )
}

when the div is clicked the handleclick function is run and setIsImportant is set to no

# mistake 

- I tried to do count++ but basically you never want to update the variable directly like that. Thats the entire point of the function

export default function App() {
    /**
     * Challenge: Set up state to track our count (initial value is 0)
     */
    const [isCount, setIsCount] = React.useState(5)
     value
    function addHandleClick(){
        setIsCount(isCount + 1)
    }
    
    function subtractHandleClick(){
        setIsCount(isCount - 1)
    }
    return (
        <div className="counter">
            <button className="counter--minus" onClick={subtractHandleClick}>–</button>
            <div className="counter--count">
                <h1>{isCount}</h1>
            </div>
            <button className="counter--plus" onClick={addHandleClick}>+</button>
        </div>
    )
}

# best practice when it comes to using our setter value

- provide a call back function inside of the set function. When we provide a callback funtion inside the parameter to our setter funtion the function returns the new value that we want state to be

# if you ever need to use the old value of state to determine the new value of state you should always plan to pass a function to the setter function 

# this 
 function add() {
        setCount(function(prevCount) {
            return prevCount + 1
        })
    }

# same with arrow function

function add() {
        setCount(prevCount => prevCount + 1)
    }

# not this 

 function add(){
        setCount(isCount + 1)
    }


    /**
     * Note: if you ever need the old value of state
     * to help you determine the new value of state,
     * you should pass a callback function to your
     * state setter function instead of using
     * state directly. This callback function will
     * receive the old value of state as its parameter,
     * which you can then use to determine your new
     * value of state.
     */


# changing state quiz

1. You have 2 options for what you can pass in to a
   state setter function (e.g. `setCount`). What are they?
   
a. New value of state (setCount(42))
b. Callback function - whatever the callback function 
   returns === new value of state


2. When would you want to pass the first option (from answer
   above) to the state setter function?
Whenever you don't need the previous value of state to determine
what the new value of state should be.


3. When would you want to pass the second option (from answer
   above) to the state setter function?
Whenever you DO need the previous value to determine the new value

# flipping state back and forth

export default function App() {
    const [isGoingOut, setIsGoingOut] = React.useState(true)
    /**
     * Challenge: 
     * - Initialize state for `isGoingOut` as a boolean
     * - Make it so clicking the div.state--value flips that
     *   boolean value (true -> false, false -> true)
     * - Display "Yes" if `isGoingOut` is `true`, "No" otherwise
     */
    function changeMind() {
        setIsGoingOut(prevState => !prevState)
    }
    
    return (
        <div className="state">
            <h1 className="state--title">Do I feel like going out tonight?</h1>
            <div onClick={changeMind} className="state--value">
                <h1>{isGoingOut ? "Yes" : "No"}</h1>
            </div>
        </div>
    )
}

# make a copy of original array || complex state: arrays

function App() {
    /**
     * Challenge: Convert the code below to use an array
     * held in state instead of a local variable. Initialize 
     * the state array with the same 2 items below
     * 
     * Don't worry about fixing `addItem` quite yet.
     */
    const [thingsArray, setThingsArray] = React.useState(["Thing 1", "Thing 2"])
    
    function addItem() {
        // We'll work on this next
        setThingsArray(prevThingsArray => {
            return [...prevThingsArray, `Thing ${prevThingsArray.length + 1}`]
        })
    }
    
    const thingsElements = thingsArray.map(thing => <p key={thing}>{thing}</p>)
    
    return (
        <div>
            <button onClick={addItem}>Add Item</button>
            {thingsElements}
        </div>
    )
}

# complex state objects

export default function App() {
    const [contact, setContact] = React.useState({
        firstName: "John",
        lastName: "Doe",
        phone: "+1 (719) 555-1212",
        email: "itsmyrealname@example.com",
        isFavorite: true
    })
    /**
     * Challenge: Use a ternary to determine which star image filename
     * should be used based on the `contact.isFavorite` property
     * 
     * `true` => "star-filled.png"
     * `false` => "star-empty.png"
     * 
     * Then use the starIcon value to display the correct image
     */
    
    let starIcon = contact.isFavorite ? "star-filled.png" : "star-empty.png"
    console.log(starIcon)
    
    function toggleFavorite() {
        console.log("Toggle Favorite")
    }
    
    return (
        <main>
            <article className="card">
                <img src="./images/user.png" className="card--image" />
                <div className="card--info">
                    <img 
                        src={`../images/${starIcon }`}  
                        className="card--favorite"
                        onClick={toggleFavorite}
                    />
                    <h2 className="card--name">
                        {contact.firstName} {contact.lastName}
                    </h2>
                    <p className="card--contact">{contact.phone}</p>
                    <p className="card--contact">{contact.email}</p>
                </div>
                
            </article>
        </main>
    )
}

# updating state objects
export default function App() {
    const [contact, setContact] = React.useState({
        firstName: "John",
        lastName: "Doe",
        phone: "+1 (719) 555-1212",
        email: "itsmyrealname@example.com",
        isFavorite: true
    })
    /**
     * Challenge: Use a ternary to determine which star image filename
     * should be used based on the `contact.isFavorite` property
     * 
     * `true` => "star-filled.png"
     * `false` => "star-empty.png"
     * 
     * Then use the starIcon value to display the correct image
     */
    
    let starIcon = contact.isFavorite ? "star-filled.png" : "star-empty.png"
    console.log(starIcon)
    
    function toggleFavorite() {
        console.log("Toggle Favorite")
    }
    
    return (
        <main>
            <article className="card">
                <img src="./images/user.png" className="card--image" />
                <div className="card--info">
                    <img 
                        src={`../images/${starIcon }`}  
                        className="card--favorite"
                        onClick={toggleFavorite}
                    />
                    <h2 className="card--name">
                        {contact.firstName} {contact.lastName}
                    </h2>
                    <p className="card--contact">{contact.phone}</p>
                    <p className="card--contact">{contact.email}</p>
                </div>
                
            </article>
        </main>
    )
}

# this 

function toggleFavorite() {
        setContact(prevContact => ({
            ...prevContact,
            isFavorite: !prevContact.isFavorite
        }))
    }

# vs this
 function toggleFavorite() {
        setContact(prevContact => {
            return {
                ...prevContact,
                isFavorite: !prevContact.isFavorite
                
            }
        })
    }


# how to use props for a component to be able to receive value
# how to use state and have a component declare its own values that are intended to change and update the user interface when those changes happen
# Now combine those two concepts ( pass state as props)

- you can initiate state inside of the app component,
- pass the state value down to a seperate component 
- and that component can receive that value as props

# react whenever state change sit rerenders the componet where the state exists and any child component that relies on State.

import Count from "./Count"

export default function App() {
    const [count, setCount] = React.useState(0)
    
    function add() {
        setCount(prevCount => prevCount + 1)
    }
    
    function subtract() {
        setCount(prevCount => prevCount - 1)
    }
    
    console.log("App component rendered")
    
    return (
        <div className="counter">
            <button className="counter--minus" onClick={subtract}>–</button>
            <Count number={count} />
            <button className="counter--plus" onClick={add}>+</button>
        </div>
    )
}

# count.js
export default function Count(props) {
    console.log("Count component rendered")
    
    return (
        <div className="counter--count">
            <h1>{props.number}</h1>
        </div>
    )
}

# setting state from Child Components (onClick make toggle switch work from Star.js)

# Star.js
import React from "react"

export default function Star({isFilled, onClick}) {
    const starIcon = isFilled ? "star-filled.png" : "star-empty.png"
    return (
        <img 
            src={`../images/${starIcon}`} 
            className="card--favorite"
            onClick={onClick}
        />
    )
}

# App.js

import React from "react"
import Star from "./Star"

export default function App() {
    const [contact, setContact] = React.useState({
        firstName: "John",
        lastName: "Doe",
        phone: "+1 (719) 555-1212",
        email: "itsmyrealname@example.com",
        isFavorite: true
    })
    
    function toggleFavorite() {
        setContact(prevContact => ({
            ...prevContact,
            isFavorite: !prevContact.isFavorite
        }))
    }
    
    return (
        <main>
            <article className="card">
                <img src="./images/user.png" className="card--image" />
                <div className="card--info">
                    <Star isFilled={contact.isFavorite} 
                    onClick ={toggleFavorite}
                    />
                    <h2 className="card--name">
                        {contact.firstName} {contact.lastName}
                    </h2>
                    <p className="card--contact">{contact.phone}</p>
                    <p className="card--contact">{contact.email}</p>
                </div>
                
            </article>
        </main>
    )
}

# we createed our toggleFavorite function, we passed it to our custome component <Star /> in a custom prop called handleClick. The Star component is receiving props and its registering a real eventlistener OnClick on the native dom element <img>. The functional value is the value received through props.handleClick or handleClick if destructured


# Passing data around (to components)

- the way that you pass data to componets is you have a top level component and that top level component renders other components.  Sometimes that component might just render regular dom elements likes divs and h1s.
Or, it may render additional custom components.
Its important to note that you cant pass data to sibling components. if you need siblings to share data you should raise state into the parent component of those siblings. Then you'll be able to pass data through props.
There is also no way to pass data up in react. Data can be passed from a parent to a child and vice versa but not from a child to aunt or uncle. You would have to raise state again to the grandparent. You should only raise state as high as it needs to go. If a component 3 levels down is the only component thaty needs state. Dont put it in a grandparent. Keep state as local you can.

# context and redux help when raising state over and over again gets too tedious.

# App.js 
import React from "react"
import Header from "./Header"
import Body from "./Body"

export default function App() {
    const [user, setUser] = React.useState("Bob")
    
    return (
        <main>
            <Header user={user} />
            <Body user={user} />
        </main>
    )
}

# Body.js 
import React from "react"

export default function Body(props) {
    return (
        <section>
            <h1>Welcome back, {props.user}!</h1>
        </section>
    )
}

# Header.js
import React from "react"

export default function Header(props) {
    return (
        <header>
            <p>Current user: {props.user}</p>
        </header>
    )
}

# dynamic styles and mapping practice

You can change style depending on state
style={}
the curly braces does not represent an object it simply means youre entering Javascript land.

style={{}}

the inner set of curly braces represents an object.

instead of the double curly braces you can set style equal to an object outside the element. The styles need to be camelCased

const styles = {
    background:'black'
}

style={styles}


# app.js

import React from "react"
import boxes from "./boxes"

export default function App(props) {
    const [squares, setSquares] = React.useState(boxes)
    
    const styles = {
        backgroundColor: props.darkMode ? "#222222" : "#cccccc"
    }
    
    const squareElements = squares.map(square => (
        <div style={styles} className="box" key={square.id}></div>
    ))
    return (
        <main>
            {squareElements}
        </main>
    )
}


# index.js

import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

ReactDOM.render(<App darkMode={false} />, document.getElementById("root"))

# local state vs unified state 

# note : a component should never modify props. We should never say props.on = anything!!
# the problem with this box app right now is we dont really have a way to change the color of each box. This is what we are going to learn. The first way is to hold state in each box ( I doubt this is the preference).Every instance of the box component is updating its on state

https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html

# exampple where each box has its on State and each box has the abaility to control itself

# Box.js

export default function Box(props) {
    const [on, setOn] = React.useState(props.on)
    
    const styles = {
        backgroundColor: on ? "#222222" : "transparent"
    }
    
    function toggle() {
        setOn(prevOn => !prevOn)
    }
    
    return (
        <div style={styles} className="box" onClick={toggle}></div>
    )
}
# app.js 

import React from "react"
import boxes from "./boxes"
import Box from "./Box"

export default function App() {
    const [squares, setSquares] = React.useState(boxes)
    
    const squareElements = squares.map(square => (
        <Box key={square.id} on={square.on} />
    ))
    
    return (
        <main>
            {squareElements}
        </main>
    )
}

# there is a way to do this where state is only held in the app component ( or top component)(unified state)
# if you find yourself setting state by initializing the value of some prop theres probably a better way to do it
# make use of the state that already exists in our app. Instead we will create a prop called toggle and pass the toggle function down. Anytime a box component is pressed we will switch state.

# the problem here is that every square is not maintaining it's on state so if you click one square all the squares will essentially fill or unfill. We need to add some additional complexity.

# the toggle function needs to know which box was clicked


# we'll have the toggle function take the id but if you tried to console.log(id) inside of the function you'll be surprised that it does not actually log the id. It logs an event.


    function toggle(id) {
        console.log(id)
    }

# what you have to do to make this work is go over to the box component and instead of OnClick ={onToggle}. we have OnClick give us a function that then runs toggle. and inside of that function we passed props.id.

# we couldnt use Key because we wont have access to the key prop in Box.js

# App.js

import React from "react"
import boxes from "./boxes"
import Box from "./Box"

export default function App() {
    const [squares, setSquares] = React.useState(boxes)
    
    function toggle(id) {
        console.log(id)
    }
    
    const squareElements = squares.map(square => (
        <Box 
            key={square.id} 
            id={square.id}
            on={square.on} 
            toggle={toggle}
        />
    ))
    
    return (
        <main>
            {squareElements}
        </main>
    )
}

# box.js

import React from "react"

export default function Box(props) {
    const styles = {
        backgroundColor: props.on ? "#222222" : "transparent"
    }
    
    return (
        <div 
            style={styles} 
            className="box"
            onClick={()=>props.toggle(props.id)}
        >
        </div>
    )
}

https://scrimba.com/learn/frontend/boxes-challenge-part-4-co2ee48359ffd4cb63f392139

# each box isnt holding state. State is being held in App.js. The toggle function is handling switching the box on or off based on the id that the toggle function is passing. Basically you create a newSquares array that you initilaize to an emoty array. You do a for loop (or map) and set a variable currentSquare equal to each iteration of the for loop. If the id is equal to the currentSquare.id you get an array of one that copies all of the arrays and switches the on featire of the selected square. Else you push the rest to the current Squares array.

new,[{id: 1, on: false}]
›current,[{id: 1, on: false}, {id: 2, on: false}]
›current,[{id: 1, on: false}, {id: 2, on: false}, {id: 3, on: true}]
›current,[{id: 1, on: false}, {id: 2, on: false}, {id: 3, on: true}, {id: 4, on: true}]
›current,[{id: 1, on: false}, {id: 2, on: false}, {id: 3, on: true}, {id: 4, on: true}, {id: 5, on: false}]
›current,[{id: 1, on: false}, {id: 2, on: false}, {id: 3, on: true}, {id: 4, on: true}, {id: 5, on: false}, {id: 6, on: false}]

import React from "react"
import boxes from "./boxes"
import Box from "./Box"

export default function App() {
    const [squares, setSquares] = React.useState(boxes)
    
    function toggle(id) {
      setSquares(prevSquares => {
            const newSquares = []
            for(let i=0; i < prevSquares.length; i++){
                const currentSquare = prevSquares[i]
                if(currentSquare.id === id){
                    const updatedSquare = {
                        ...currentSquare,
                        on:!currentSquare.on
                    }
                    newSquares.push(updatedSquare)
                    console.log("new", newSquares)
                } else {
                    newSquares.push(currentSquare)
                    console.log("current", newSquares)
                }
            }
            return newSquares
        })
    }
    
    const squareElements = squares.map(square => (
        <Box 
            key={square.id} 
            id={square.id}
            on={square.on} 
            toggle={toggle}
        />
    ))
    
    return (
        <main>
            {squareElements}
        </main>
    )
}


# easier to understand. More declarative than c style for loop

 function toggle(id) {
        setSquares(prevSquares => {
            return prevSquares.map((square) => {
                return square.id === id ? {...square, on: !square.on} : square
            })
        })
    }
    
    // instead of doing a for loop we can map over the prevSquares. Map returns a new unmodified array. With a ternerary we say if square.id === id then return the object {...square, on: !square.on} so return all the squares as they were but change the on value on this id. If not just give me the same square back

# the last solution. 

I could have the prop name take a toggle function that takes a paremeter. This basically creates a closure.

# App.js 

 <Box 
            key={square.id} 
            on={square.on} 
            toggle={() => toggle(square.id)}
        />

# Box.js
        <div 
            style={styles} 
            className="box"
            onClick={props.toggle}
        >

vs. 

# App.js 

 <Box 
            key={square.id} 
            id={square.id}
            on={square.on} 
            toggle={toggle}
        />

# Box.js 

  <div 
            style={styles} 
            className="box"
            onClick={()=>props.toggle(props.id)}
        >
        </div>


# Conditional Rendering 

&& makes sure both sides are truthy

   {props.setup && <h3>{props.setup}</h3>}
  {isShown && <p>{props.punchline}</p>}

  <!-- if props.setup is true display props.setup  -->
  <!--  if isShown boolean is true display props.punchline -->

  const cond1 = true
const cond2 = false
if(cond1 && cond2) {
    // this code will NOT run
}


const cond1 = true
const cond2 = true
if(cond1 && cond2) {
    // this code will run
}

https://scrimba.com/learn/frontend/conditional-rendering--co00d4a3c9a328b5ff96f418e

# in react when you have an element that you want to display or not display at all. Using the && logical operator is a concise way to do that

# conditional rendering method

export default function App() {
    const [messages, setMessages] = React.useState(["a", "b"])
    /**
     * Challenge:
     * - Only display the <h1> below if there are unread messages
     */
    return (
        <div>
            {messages.length > 0 && <h1>You have {messages.length} unread messages!</h1>}
        </div>
    )
}

# conditional rendering using ternary

 <button onClick={toggleShown}>{isShown ? "Hide" : "Show"} Punchline</button>

 # double ampersand is && usually when you want to display or not display. Ternary if you have one or two things to display. If more complex use a regular if statement with a saved variable


 # Example

 import React from "react"

export default function App() {
    const [messages, setMessages] = React.useState(["a"])
    /**
     * Challenge:
     * - If there are no unread messages, display "You're all caught up!"
     * - If there are > 0 unread messages, display "You have <n> unread
     *   message(s)"
     *      - If there's exactly 1 unread message, it should read "message"
     *        (singular)
     */
    return (
        <div>
            {
                messages.length === 0 ?
                <h1>You're all caught up!</h1> :
                <h1>You have {messages.length} unread 
                {messages.length > 1 ? "messages" : "message"}</h1>
            }
        </div>
    )
}

# conditional rendering quiz

1. What is "conditional rendering"?
When we want to only sometimes display something on the page
based on a condition of some sort


2. When would you use &&?
When you want to either display something or NOT display it


3. When would you use a ternary?
When you need to decide which thing among 2 options to display


4. What if you need to decide between > 2 options on
   what to display?
Use an `if...else if... else` conditional or a `switch` statement


function App() {
    let someVar
    if () {
        someVar = <SomeJSX />
    } else if() {
        ...
    } else {
        ...
    }
    return (
        <div>{someVar}</div>
    )
}