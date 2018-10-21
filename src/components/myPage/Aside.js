
import S from './style.scss';

let propTypes = {
    notebooks: PT.array,
    userInfo: PT.object,
    notebooksClick: PT.func,
}
export default class Aside extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let{notebooks, userInfo, notebooksClick} = this.props;
        notebooks = notebooks.map((elt, i)=>{
            let{id:collection_id, collection_name} = elt;

            return(
                <div className='item' key={i}
                    onClick={ev=>{
                        ev.preventDefault();
                        ev.stopPropagation();
                        notebooksClick(collection_id, collection_name);
                    }}
                >
                    <i className='book icon'></i>
                    <div className='content'>{collection_name}</div>
                </div>
            );
        })
        return (
            <div className={S.aside}>

                <div className="introduce">
                    <div className="title">
                        个人介绍
                        <div className="ui divider hidden"></div>

                        <p>{userInfo.user_intro}</p>

                    </div>
                </div>

                <div className="ui divider hidden"></div>

                <div className={S.volume}>
                    <div className={S.title}>
                        我的文集
                    </div>
                    <div className="ui list">
                        {notebooks}
                    </div>
                </div>

            </div>
        );
    }
}

Aside.propTypes = propTypes;
