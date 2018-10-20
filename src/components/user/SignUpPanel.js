import React , {Component} from 'react';
import Panel from './Panel';
import S from './style.scss';
import Validation from 'util/validation'

let propTypes = {
    signUpAjax: PT.func,
    signUpMsg: PT.object
}

export default class SignUpPanel extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            repassword: '',
            nameErr: false,
            passwordErr: false,
            repasswordErr: false,
        }
        this.validator = new Validation();
        this.validator.addByValue('username', [
            {strategy: 'isEmpty', errorMsg: '用户名不能为空'},
            {strategy: 'hasSpace', errorMsg: '用户名不能有空格'},
            {strategy: 'maxLength:6', errorMsg: '用户名最长为6'},
        ]);
        this.validator.addByValue('password', [
            {strategy: 'isEmpty', errorMsg: '密码不能为空'},
            {strategy: 'hasSpace', errorMsg: '密码不能有空格'},
            {strategy: 'maxLength:6', errorMsg: '密码最长为6'},
        ]);

        this.nameChange = this.nameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.repasswordChange = this.repasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    nameChange(ev){
        let {target} = ev;
        let msg = this.validator.valiOneByValue('username', target.value);

        this.setState({
            username: target.value,
            nameErr: msg,
        });
    }
    passwordChange(ev){
        let {target} = ev;
        let msg = this.validator.valiOneByValue('password', target.value);
        this.setState({
            password: target.value,
            passwordErr: msg,
        });
        if(this.state.repasswordErr){
            this.repasswordChange();
        }
    }
    repasswordChange(){
        let {passwDom, cfPasswDom} = this.refs;
        let msg = passwDom.value === cfPasswDom.value? '': '两次输入的密码不一致';

        this.setState({
            repassword: cfPasswDom.value,
            repasswordErr: msg
        });
    }
    onSubmit(ev){
        ev.preventDefault();
        ev.stopPropagation();
        
        let {validator} = this;
        let {username, password, repassword} = this.state;
        let nameErr = validator.valiOneByValue('username', username);
        let passwordErr = validator.valiOneByValue('password', password);
        let repasswordErr = password === repassword? '': '两次输入的密码不一致';
        this.setState({
            nameErr,
            passwordErr,
            repasswordErr,
        })
        if(!nameErr && !passwordErr && !repasswordErr){
            this.props.signUpAjax({
                username,
                passw: password,
                cfPassw: repassword,
            })
        }
    }

    render(){
        let {nameChange, passwordChange, repasswordChange, onSubmit} = this;
        let {username, password, repassword, nameErr, passwordErr, repasswordErr} = this.state;

        let {signUpMsg} = this.props;
        let signUpMsgInfo = null;
        if(signUpMsg){
            signUpMsgInfo = (
                <div className={`ui message ${signUpMsg.code !== 0? 'error': 'success'}`}>
                    <p>{signUpMsg.msg}{signUpMsg.code === 0? '   正在为您自动登录': ''}</p>
                </div>
            )
        }

        return (

            <div className={S.sign_panel}>
                {signUpMsgInfo}
                <form
                    className="ui form"
                    onSubmit = {onSubmit}
                >
                    <div className={`field ${nameErr? 'error': ''}`}>
                        <input
                            type="text"
                            placeholder="用户名"
                            value={username}
                            ref="nameDom"
                            onChange = {nameChange}
                        />
                        {nameErr? (
                            <p className={S.err}>{nameErr}</p>
                        ): null}
                    </div>
                    <div className={`field ${passwordErr? 'error': ''}`}>
                        <input
                            type="text"
                            placeholder="密码"
                            value={password}
                            ref="passwDom"
                            onChange={passwordChange}
                        />
                        {passwordErr? (
                            <p className={S.err}>{passwordErr}</p>
                        ): null}
                    </div>
                    <div className={`field ${repasswordErr? 'error': ''}`}>
                        <input
                            type="text"
                            placeholder="确认密码"
                            value={repassword}
                            ref="cfPasswDom"
                            onChange={repasswordChange}
                        />
                        {repasswordErr? (
                            <p className={S.err}>{repasswordErr}</p>
                        ): null}
                    </div>
                    <div className="field">
                        <button type="submit"
                            className="ui button fluid primary"
                        >注册</button>
                    </div>
                </form>
            </div>
        );
    }
}
