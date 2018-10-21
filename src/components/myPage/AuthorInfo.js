import {Link, withRouter} from 'react-router-dom';
import S from './style.scss';
let propTypes = {
    userInfo: PT.object,
    initMyPage: PT.func,
}

function AuthorInfo({userInfo, initMyPage, history}){
    let {user_intro, user_id, user_name, avatar} = userInfo;
    return (
        <div className={S.author_info}>
            <Link
                to="/my_page"
                className={S.avatar}
                onClick={ev=>{
                    ev.stopPropagation();
                    ev.preventDefault();
                    history.push('/my_page', {
                        userInfo,
                    });
                    initMyPage(user_id, {user_id}, '所有文集');
                }}
            >
                <img src={avatar} alt=""/>
            </Link>

            <div className={S.title}>
                <Link
                    to="/my_page"
                    className={S.name}
                >
                    {user_name}
                </Link>
            </div>

        </div>
    );
}

AuthorInfo.propTypes = propTypes;
export default withRouter(AuthorInfo);
