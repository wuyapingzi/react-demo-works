
import AuthorInfo from 'components/myPage/AuthorInfo';
import Aside from 'components/myPage/Aside';
import PreviewList from 'preview/PreviewList';

let propTypes = {
    previewsName: PT.string,
    notebooks: PT.array,
    myPagePreviews: PT.array,
    initMyPage: PT.func,
    changeMyPreviews: PT.func,
}

export default class MyPage extends React.Component{
    constructor(props){
        super(props);
        this.collectionClick = this.collectionClick.bind(this);
        this.notebooksClick = this.notebooksClick.bind(this);
    }
    collectionClick(collection_id, collection_name){
        this.props.changeMyPreviews({collection_id}, collection_name);
    }
    notebooksClick(collection_id, collection_name){
        this.props.changeMyPreviews({collection_id}, collection_name);
    }

    render(){

        let {previewsName, notebooks, myPagePreviews, initMyPage, location} = this.props;
        let {userInfo} = location.state;
        let {collectionClick, notebooksClick} = this;

        return (
            <div className="ui container grid">
                <div className="twelve wide column">
                    <AuthorInfo
                        {...{
                            userInfo,
                            initMyPage,
                        }}
                    />
                    <div className="ui secondary pointing menu">
                        <span className="active item">
                            {previewsName}
                        </span>
                    </div>
                    <PreviewList
                        {...{
                            previews: myPagePreviews,
                            initMyPage,
                            collectionClick,
                        }}
                    />
                </div>
                <div className="four wide column">
                    <Aside
                        {...{
                            notebooks,
                            userInfo,
                            notebooksClick,
                        }}
                    />
                </div>
            </div>
        );
    }
}

MyPage.propTypes = propTypes;
