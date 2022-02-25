// MIT License
//
// Copyright (c) 2021-2022 Nobuo Kato (katonobu4649@gmail.com)
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import React, {useCallback, useState, useEffect} from 'react'

import { useWebSerial } from 'use-react-webserial'
import WebSerialButtons from './WebSerialButtons'

import loadable from '@loadable/component'
const Xterm = loadable(() => import('./xterm.js'));


const WebSerialTerminal = () => {
    const {openPort,closePort,sendMessage,updateCallbacks} = useWebSerial();
    const onError = useCallback(
        (e) => {console.log(e)},[]
    );
    const [serialAvailable, setSerialAvailable] = useState(true);
    const [isConnected, setIsConnected] = useState(false);
    useEffect(()=>{
        updateCallbacks({
            onOpen:()=>{
                console.log("onOpen()");
                setIsConnected(true);
                const encoder = new TextEncoder();
            
                sendMessage(encoder.encode("< TEST EVT 0,100,10\r\n"));
            },
            onClose:()=>{
                console.log("onClose()");
                setIsConnected(false);
            },
            onMessage:(msg)=>{
                const decoder = new TextDecoder();
                const decoded = decoder.decode(msg)
                console.log(decoded);
                setTerminalMessage((new Date()).toLocaleString() + ":" + decoded);
            },
            onError:onError
        });
        setSerialAvailable("serial" in navigator)
    },[updateCallbacks, onError, sendMessage]);

    const [terminalMessage, setTerminalMessage] = useState("");
    useEffect(()=>{
        setTerminalMessage("Start at " + (new Date()).toLocaleString());
        return ()=>{
            setTerminalMessage("End at " + (new Date()).toLocaleString()); // this may mot displaied.
        }
    },[]);

    return (
    <>
        <WebSerialButtons
            serialAvailable = {serialAvailable}
            isConnected = {isConnected}
            openPort = {openPort}
            closePort = {closePort}
            onError = {onError}
            sendMessage = {sendMessage}
        >
        </WebSerialButtons>
        <Xterm
            message = {terminalMessage}
        />
    </>    
  )
}

export default WebSerialTerminal;


