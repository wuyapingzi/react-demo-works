import {Link, withRouter} from 'react-router-dom';
import S from './style.scss';
import Author from './Author';
let propTypes = {
    initMyPage: PT.func,
}

export default function Recommend({authors, initMyPage}){
    return (
        <div className={S.recommend}>
            <div className={S.title}>
                <span>作者列表</span>
            </div>
            <div className="ui items">
                {
                    authors.map((elt, i)=>{
                        return (
                            <Author
                                {...{
                                    user: elt,
                                    initMyPage,
                                }}
                                key={i}
                            />);
                    })
                }
            </div>
        </div>
    );
}

Recommend.propTypes = propTypes;
