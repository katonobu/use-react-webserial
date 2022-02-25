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

import loadable from '@loadable/component'
const Xterm = loadable(() => import('./xterm.js'));

const OpenCloseButton = ({
    serialAvailable,
    isConnected,
    openPort,
    closePort,
    onError,
    requestPortFilters,
    openOptions
}) => {
    return (
        <button 
        disabled={!serialAvailable}       
        onClick={
            async ()=>{
                if (isConnected) {
                    try{
                        await closePort();
                    } catch (e) {
                        onError(e);
                    }
                } else {
                    try {
                        // requestPortFilters may like this [{usbVendorId:0x2341, usbProductId:0x8054}]
                        // default value, [] accepts all vid/pid.
                        const filters = requestPortFilters?requestPortFilters:[]; 
                        let tmpPort = await navigator.serial.requestPort({
                            filters: filters 
                        });
                        try{
                            const options = openOptions?openOptions:{
                                baudRate:115200,
                                dataBits:8,
                                stopBits:1,
                                parity:"none",
                                bufferSize:255,
                                flowControl:"none"
                            }
                            openPort(tmpPort, options);
                        } catch (e) {
                            // for example, "NetworkError: Failed to open serial port." if specified port is already used.
                            onError(e);
                        }
                    } catch (e) {
                        // for example, "NotFoundError: No port selected by the user." if user select cancel.
                        onError(e);
                    }        
                }
            }
        }
        >{isConnected?"CLOSE":"OPEN"}</button>
    );
}

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
            
                sendMessage(encoder.encode("< TEST RSP 1000\r\n"));
            },
            onClose:()=>{
                console.log("onClose()");
                setIsConnected(false);
            },
            onMessage:(msg)=>{
                console.log(msg);
                const decoder = new TextDecoder();
                setTerminalMessage(decoder.decode(msg));
            },
            onError:onError
        });
        setSerialAvailable("serial" in navigator)
    },[updateCallbacks, onError, sendMessage]);

    const [terminalMessage, setTerminalMessage] = useState("");
    useEffect(()=>{
        setTerminalMessage("Start at " + (new Date()).toLocaleString());
        return ()=>{
            setTerminalMessage("End at " + (new Date()).toLocaleString());
        }
    },[]);

    return (
    <>
        <Xterm
            message = {terminalMessage}
        />
        <OpenCloseButton
            serialAvailable = {serialAvailable}
            isConnected = {isConnected}
            openPort = {openPort}
            closePort = {closePort}
            onError = {onError}
            requestPortFilters = {[]}
        />
    </>    
  )
  
}

export default WebSerialTerminal;


