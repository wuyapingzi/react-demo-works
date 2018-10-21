import {Link, withRouter} from 'react-router-dom';

import cfg from 'config/config.json';

function Author({user, history, initMyPage}){
    let {id:user_id, user_name, avatar, user_intro} = user;
    avatar = cfg.url + avatar;
    return (
        <div className="item">
            <Link
                to="/my_page"
                className="ui mini avatar image"
                onClick={ev=>{
                    ev.stopPropagation();
                    ev.preventDefault();
                    history.push('/my_page', {
                        userInfo: {
                            user_id,
                            user_intro,
                            user_name,
                            avatar,
                        }
                    });
                    initMyPage(user_id, {user_id}, '所有文集');
                }}
            >
                <img src={avatar} alt=""/>
            </Link>
            <div className="content">
                <div className="header">
                    {user_name}
                </div>
            </div>
        </div>

    );
}

export default  withRouter(Author)
