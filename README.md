# use-react-webserial

> React Hook designed to provide WebSerial integrations to your React Components.

[![NPM](https://img.shields.io/npm/v/use-react-webserial.svg)](https://www.npmjs.com/package/use-react-webserial) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-react-webserial
```

## Usage

### Provider component
WebSerialProvider is provider component.

Example useage of WebSerialProvider component:

```jsx
import React from 'react'
import { WebSerialProvider } from 'use-react-webserial'
import WebSerialTerminal from './WebSerialTerminal'

const App = () => {
  return (
    <WebSerialProvider>
      <WebSerialTerminal/>
    </WebSerialProvider>
  )
}
```

### useWebSerial Hook

useWebSerial is hook as consumer of WebSerialProvider.
This returns 4 objects.
- openPort(requestPortFilters, options)
  - A function to open serial port.
  - `requestPortFilters` is used for [Serial.requestPort()](https://developer.mozilla.org/en-US/docs/Web/API/Serial/requestPort)
    - If not specified, [] is used, this shows all serial port in port select dialog.
  - `options` is used for [SerialPort.open()](https://developer.mozilla.org/en-US/docs/Web/API/SerialPort/open)
    - If not specified, specified as follows.
      - baudrate: 115200
      - databits: 8
      - stopbits: 1
      - parity: 'none'
      - bufferSize: 255
      - flowControl: 'none'
  - Returns Promise resolves when port has closed.
    - so don't await, use onOpen callback.
- closePort()
  - A function to close serial pot.
  - Returns Promise resolves when port has closed.
- sendMessage(message)
  - A function to send data to serial port.
  - Returns Promise resolves when `message` has send to Tx buffer.
  - `message` expects Uint8Array.
    - If you want to send text, encode that text and set it to this function.
- updateCallbacks({onOpen, onClose, onMessage, onError})
  - Update (replace) callback function if specified.
  - onOpen()
    - Called if serial port has opened.
    - Return value is ignored.
  - onClose()
    - called if serial port has closed.
    - Return value is ignored.
  - onMessage(`message`)
    - called if serial port receives data.
      - `message` is Uint8Array.
        - If you want to handle as text, decode the `message`.
      - `message` may splitted, even if tx side send one long line.
      - So if you want to handle per line, concatinate with previous messages and split it by line terminater.
    - Return value is ignored.
  - onError(error)
    - called if serial port error has occured.
    - `error` is Error object.
    - Return value is ignored.

Consume the WebSerialProvider, set callbacks, propagete functions to child components.
```jsx
import React, {useState, useEffect} from 'react'

import { useWebSerial } from 'use-react-webserial'
import WebSerialButtons from './WebSerialButtons'

const WebSerialTerminal = () => {
    const {openPort,closePort,sendMessage,updateCallbacks} = useWebSerial();
    const [isConnected, setIsConnected] = useState(false);
    useEffect(()=>{
        updateCallbacks({
            onOpen:()=>{
                console.log("onOpen()");
                setIsConnected(true);
            },
            onClose:()=>{
                console.log("onClose()");
                setIsConnected(false);
            },
            onMessage:(msg)=>{
                const decoder = new TextDecoder();
                const decoded = decoder.decode(msg)
                console.log(decoded);
            },
            onError:(e)=>{
                console.log(e)
            }
        });
    },[updateCallbacks, sendMessage]);

    return (
    <>
        <WebSerialButtons
            isConnected = {isConnected}
            openPort = {openPort}
            closePort = {closePort}
            sendMessage = {sendMessage}
        >
        </WebSerialButtons>
    </>    
  )
}
```
Use functions provided WebSerialProvider.
```jsx
import React from 'react'

const WebSerialButtons = ({
    isConnected,
    openPort,
    closePort,
    sendMessage,
})=>{
    return (
        <>
        <button>
            onClick={
              ()=>{
                  if (isConnected) {
                      closePort();
                  } else {
                      openPort();
                  }
              }
            }
        >{isConnected?"CLOSE":"OPEN"}</button>
        <button
            disabled = {!isConnected}
            onClick={
              ()=>{
                  sendMessage((new TextEncoder()).encode("Hellow World\r\n"))
              }
            }
        >SEND</button>
        </>        
    );
}
```

### limitation
The function openPort() must be called with user activation.

This limitation comes from specification of [Web Serial API](https://wicg.github.io/serial/#security)


## For developper
1. checkout this repo.
1. `cd use-react-webserial`
1. `npm install`
1. `npm start`
1. `cd use-react-webserial/example` in new terminal
1. `npm install`
1. `npm start`
1. example app wil run.

## Credits
- Thanks to everyone who made Web Serial API for enabling this project to be possible.
  - [Serial Terminal](https://github.com/GoogleChromeLabs/serial-terminal)
- Much of the documentation about the usage and features of Web Serial API where taken from their documentation.
  - [Web Serial API](https://wicg.github.io/serial/)
  - [Web Serial API/MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API)
- Thanks to [create-react-library](https://github.com/transitive-bullshit/create-react-library) for creating a easy template for creating React libraries.
- And of course thanks to all the [React](https://reactjs.org/) guys for making React a thing.

## License

MIT © [katonobu](https://github.com/katonobu)
