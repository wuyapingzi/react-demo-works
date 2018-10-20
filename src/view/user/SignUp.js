
import SignUpPanel from 'components/user/SignUpPanel';
import EntryPanel from 'components/user/Panel';

let propTypes = {
    signUpAjax: PT.func,
    signUpMsg: PT.object,
    clearTips: PT.func,
}
export default class SignUp extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillUnmount(){
        this.props.clearTips();
    }

    render(){
        let {signUpAjax, signUpMsg} = this.props;
        return (
            <EntryPanel >
                <SignUpPanel
                    {...{
                        signUpAjax,
                        signUpMsg
                    }}
                />
            </EntryPanel>
        );
    }
}
SignUp.propTypes = propTypes;
