import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import Nav from 'nav/Nav';
import Home from 'view/Home/Home';
import SignIn from 'view/user/SignIn';
import SignUp from 'view/user/SignUp';

import cfg from 'config/config.json';

import S from './style.scss';

export default class Frame extends Component{
    constructor(props){
        super(props)
        this.state = {
            myInfo: null,
            signInMsg: null,
            signUpMsg: null,
            hasLoginReq: false,
        }
        this.signInAjax = this.signInAjax.bind(this);//绑定登录函数
        this.signUpAjax = this.signUpAjax.bind(this);//绑定注册函数
        this.clearTips = this.clearTips.bind(this);
        this.initMyInfo = this.initMyInfo.bind(this);
        this.logOut = this.logOut.bind(this);
    }
    //登录的ajax请求 
    signInAjax(reqData){
        $.post(`${cfg.url}/login`, reqData)
        .done(ret => {
            let {code, data} = ret;
            if(code === 0){
                this.initMyInfo(data);
            }else{
                this.setState({signInMsg: ret});
            }
        })
    }
    //注册的ajax请求
    signUpAjax(reqData){
        $.post(`${cfg.url}/register`, reqData)
        .done(ret => {
            let {code, data} = ret;
            this.setState({
                signUpMsg: ret,
            })
            if(code === 0){
                setTimeout(()=>{
                    this.initMyInfo(data);
                }, 1000);
            }
        })
    }
    //清除登录注册的提示信息
    clearTips(){
        this.setState({
            signInMsg: null,
            signUpMsg: null,
        })
    }
    //格式化头像的路径
    initMyInfo(myInfo){
        if(myInfo){
            myInfo.avatar = cfg.url + myInfo.avatar;
        }
        this.setState({
            myInfo,
        })
    }
    logOut(){
        $.post(`${cfg.url}/logout`)
        .done(({code}) =>{
            this.initMyInfo(null);
        })
    }
    componentDidMount(){
        // 组件挂载完成之后请求自动登录
        $.post(`${cfg.url}/autologin`)
        .done(({code, data}) => {
            if(code === 0) {
                this.initMyInfo(data);
            }
            this.setState({hasLoginReq: true})
        })
    }
    render(){
        let {signInAjax, signUpAjax, clearTips, logOut} = this;
        let {myInfo, signInMsg, signUpMsg, hasLoginReq} = this.state;

        if(!hasLoginReq){
            return(<div></div>)
        }
        return(
            <div className={S.layout}>
                <Nav
                    {...{
                        myInfo,
                        logOut
                    }}
                />
                <Route exact path='/' component={Home} />
                <Route exact path='/sign_in' render={
                    //render回调渲染组件，将登录ajax请求传递到登录组件
                    (props) => (
                        myInfo? (
                            <Redirect to='/'/>
                        ): (
                            //view层的登录组件
                            <SignIn
                                {...{
                                    signInAjax,
                                    signInMsg,
                                    clearTips,
                                }}
                            />
                        )
                        
                    )
                } />
                <Route exact path='/sign_up' render={(props) => (
                    myInfo? (
                        <Redirect to='/' />
                    ): (
                        <SignUp
                            {...{
                                signUpAjax,
                                signUpMsg,
                                clearTips,
                            }}
                        />
                    )
                    
                )} />
            </div>
        );
    }
}