import {Route, Redirect} from 'react-router-dom';
import Nav from 'nav/Nav';
import Home from 'view/home/Home.js';
import SignUp from 'view/user/SignUp';
import SignIn from 'view/user/SignIn';
import MyPage from 'view/user/MyPage';

import cfg from 'config/config.json';

import S from './style.scss';



export default class Frame extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            myInfo: null,
            signInMsg: null,
            signUpMsg: null,
            hasLoginReq: false,
            myPagePreviews: [],
            notebooks: [],
            previewsName: '所有文章'
        };

        this.signInAjax = this.signInAjax.bind(this);
        this.signUpAjax = this.signUpAjax.bind(this);
        this.clearLoginMsg = this.clearLoginMsg.bind(this);
        this.initMyInfo = this.initMyInfo.bind(this);
        this.logOut = this.logOut.bind(this);
        this.getPreview = this.getPreview.bind(this);
        this.initMyPage = this.initMyPage.bind(this);
        this.changePreviewsName = this.changePreviewsName.bind(this);
    }

    initMyInfo(myInfo){
        if(myInfo){
            myInfo.avatar = cfg.url + myInfo.avatar;
        }


        this.setState({myInfo});
    }

    clearLoginMsg(){
        this.setState({
            signInMsg: null,
            signUpMsg: null
        });
    }

    signInAjax(reqData){
        $.post(`${cfg.url}/login`, reqData)
        .done(ret=>{

            let {code, data} = ret;



            if(code===0){
                this.initMyInfo(ret.data);
            }else{
                this.setState({signInMsg: ret});
            }

        });
    }

    signUpAjax(reqData){
        $.post(`${cfg.url}/register`, reqData)
        .done((ret)=>{
            let {code, data} = ret;

            this.setState({signUpMsg: ret});

            if(code===0){
                setTimeout(()=>{
                    this.initMyInfo(ret.data);
                });
            }


        });
    }

    logOut(){
        $.post(`${cfg.url}/logout`)
        .done(({code})=>{
            if(code===0){
                this.initMyInfo(null);
            }
        });
    }

    getPreview(data){
        $.post(`${cfg.url}/getPreview`,data)
        .done(({code, data})=>{
            if(code===0){
                this.setState({
                    myPagePreviews: data
                });
            }
        });
    }

    // previewName 就是用户页头像下显示的那几个字
    initMyPage(user_id, previewsData, previewName){
        this.getPreview(previewsData);

        $.post(`${cfg.url}/getCollection`,{
            user_id
        })
        .done(({code, data})=>{
            if(code===0){
                this.setState({
                    notebooks: data,
                    previewName
                });
            }
        });

    }

    changePreviewsName(previewsName){
        this.setState({previewsName});
    }

    componentDidMount(){
        $.post(`${cfg.url}/autologin`)
        .done(({code, data})=>{
            if(code===0){
                this.initMyInfo(data);
            }
            this.setState({hasLoginReq: true});
        });
    }


    render(){

        let {signInAjax, signUpAjax, clearLoginMsg, logOut, initMyPage} = this;

        let {myInfo, signInMsg , signUpMsg, hasLoginReq, myPagePreviews, notebooks, previewsName} = this.state;

        if(!hasLoginReq){
            return (<div></div>);
        }

        return (
            <div className={S.layout}>
                <Nav
                    {...{
                        myInfo,
                        logOut
                    }}
                />
                <Route exact path="/" render={
                    (props)=> (
                        <Home
                            {...{
                                initMyPage
                            }}
                            {...props}
                        />
                    )
                }/>

                <Route exact path="/sign_in" render={
                    (props)=>(
                        myInfo ? (
                            <Redirect to="/"/>
                        ) : (
                            <SignIn
                                {...{
                                    signInAjax,
                                    signInMsg,
                                    clearLoginMsg
                                }}
                            />
                        )

                    )
                }/>
                <Route exact path="/sign_up" render={
                    (props)=>(
                        myInfo ? (
                            <Redirect to="/"/>
                        ) : (
                            <SignUp
                                {...{
                                    signUpAjax,
                                    signUpMsg,
                                    clearLoginMsg
                                }}
                            />
                        )

                    )
                }/>
                <Route exact path="/my_page" render={
                    (props)=>(
                        <MyPage
                            {...{
                                myPagePreviews,
                                previewsName,
                                notebooks,
                                initMyPage,
                            }}
                            {...props}
                        />

                    )
                }/>
            </div>
        );
    }
}
