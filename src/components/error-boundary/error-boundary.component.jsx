import React from 'react';

import {ErrorImageOverlay, ErrorImageContainer, ErrorImageText} from './error-boundaries.styles';

class ErrorBoundary extends React.Component {
    constructor(){
        super();
        this.state = { 
            hasError: false
        }
    }

    static getDerivedStateFromError(error){
        //So something with the error and return the state we want to change
        console.log('error: ', error);
        return {hasError:true}
    }

    render() { 
        if (this.state.hasError) {
            return (
            <ErrorImageOverlay>
                <ErrorImageContainer imageUrl={`https://i.imgur.com/yW2W9SC.png`}/>
                <ErrorImageText>Sorry This Page is Broken!</ErrorImageText>
            </ErrorImageOverlay>);
        }
        else {
            return this.props.children;
        }
    }

    componentDidCatch(error, info) {
        //This method allows us catch the error ahead ot time, i.e. when it has been dispatched
        console.log('error: ', error);
        console.log('info: ', info);
    }
    
}

export default ErrorBoundary;