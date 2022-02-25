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

import React from 'react'

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
                        openPort(requestPortFilters, openOptions);
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

const SendButton = ({
    disabled,
    sendMessage,
    cmdStr,
    dispStr
}) => {
    return (
        <button 
        disabled={disabled}
        onClick={()=>{
            sendMessage((new TextEncoder()).encode(cmdStr + "\r\n"))
        }}
        >{dispStr}</button>
    )
}


const WebSerialButtons = ({
    serialAvailable,
    isConnected,
    openPort,
    closePort,
    onError,
    sendMessage,
})=>{
    return (
        <>
        <OpenCloseButton
            serialAvailable = {serialAvailable}
            isConnected = {isConnected}
            openPort = {openPort}
            closePort = {closePort}
            onError = {onError}
        >
        </OpenCloseButton>
        <SendButton
            disabled = {!serialAvailable || !isConnected}
            sendMessage = {sendMessage}
            cmdStr = {"< TEST RSP 1000"}
            dispStr = {"1000sec"}
        ></SendButton>
        <SendButton
            disabled = {!serialAvailable || !isConnected}
            sendMessage = {sendMessage}
            cmdStr = {"< TEST RSP 500"}
            dispStr = {"500sec"}
        ></SendButton>
        <SendButton
            disabled = {!serialAvailable || !isConnected}
            sendMessage = {sendMessage}
            cmdStr = {"< TEST RSP 100"}
            dispStr = {"100sec"}
        ></SendButton>
        </>        
    );
}

export default WebSerialButtons;
