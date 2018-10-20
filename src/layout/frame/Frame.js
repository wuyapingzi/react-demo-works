import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Nav from 'nav/Nav';
import Home from 'view/Home/Home';
import S from './style.scss';

export default class Frame extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className={S.layout}>
                <Nav/>
                <Route exact path='/' component={Home} />
            </div>
        );
    }
}