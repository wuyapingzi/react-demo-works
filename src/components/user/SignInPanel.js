import React , {Component, createRef} from 'react';
import Panel from './Panel';
import S from './style.scss';
import Validation from 'util/validation';

let propTypes = {
    signInAjax: PT.func,
    signInMsg: PT.object,
}

export default class SignInPanel extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            nameErr: false,
            passwordErr: false,
        };
        //前端验证
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
        //函数绑定
        this.nameChange = this.nameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    nameChange(ev){
        let {target} = ev;
        //获取前端验证信息
        let msg = this.validator.valiOneByValue('username', target.value);
        
        this.setState({
            username: target.value,
            nameErr: msg,
        })
    }

    passwordChange(ev){
        let {target} = ev;
        //获取前端验证信息
        let msg = this.validator.valiOneByValue('password', target.value);

        this.setState({
            password: target.value,
            passwordErr: msg,
        })
    }
    onSubmit(ev){
        ev.preventDefault(); 
        ev.stopPropagation();
        let {nameDom, passwDom} = this.refs;
        let {validator} = this;
        //提交前验证
        var nameErr = validator.valiOneByValue('username', nameDom.value);
        var passwordErr = validator.valiOneByValue('password', passwDom.value);
        this.setState({
            nameErr,
            passwordErr,
        });
        //只有验证通过才出发ajax请求
        if(!nameErr && !passwordErr){
            this.props.signInAjax({
                username: nameDom.value,
                passw: passwDom.value,
            })
        }
    }

    render(){
        let {nameChange, passwordChange, onSubmit} = this;
        let {username, password, nameErr, passwordErr} = this.state;
        
        let {signInMsg} = this.props;
        let signInMsgErr = null;
        //登录出错的处理
        if(signInMsg && signInMsg.code !== 0){
            signInMsgErr = (
                <div className='ui message error'>
                    <p>
                        {signInMsg.msg}
                    </p>
                </div>
            )
        }

        let nameErrMsg = nameErr? (
            <p className={S.err}>{nameErr}</p>
        ): null;
        let passwordErrMsg = passwordErr? (
            <p className={S.err}>{passwordErr}</p>
        ): null;
        return (
            <div className={S.sign_panel}>
                {signInMsgErr}
                <form
                    className="ui form"
                    onSubmit={onSubmit}//form表单提交时出发函数
                >
                    <div className={`field ${nameErr? 'error': ''}`}>
                        <input
                            type="text"
                            placeholder="用户名"
                            value={username}
                            ref='nameDom'
                            onChange = {nameChange}
                        />
                        {nameErrMsg}
                    </div>

                    <div className={`field ${passwordErr? 'error': ''}`}>
                        <input
                            type="text"
                            placeholder="密码"
                            value={password}
                            ref="passwDom"
                            onChange = {passwordChange}
                        />
                        {passwordErrMsg}
                    </div>

                    <div className="field">
                        <button type="submit"
                            className="ui button fluid primary"
                        >登录</button>
                    </div>
                </form>
            </div>
        );
    }
}
