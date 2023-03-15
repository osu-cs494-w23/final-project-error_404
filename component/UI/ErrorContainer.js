import React from 'react'
import styled from '@emotion/styled/macro'


// import './ErrorContainer.css'

const ErrorCont = styled.div`
    padding: 10px;
    background-color: #ff7c7c;
    color: #fff;
`

function ErrorContainer({ children }) {
    return <ErrorCont>{children}</ErrorCont>
}

export default ErrorContainer
