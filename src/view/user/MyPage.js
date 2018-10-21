
import AuthorInfo from 'components/myPage/AuthorInfo';
import Aside from 'components/myPage/Aside';
import PreviewList from 'preview/PreviewList';

let propTypes = {
    previewsName: PT.string,
    notebooks: PT.array,
    myPagePreviews: PT.array,
    initMyPage: PT.func,
}

export default class MyPage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){

        let {previewsName, notebooks, myPagePreviews, initMyPage, location} = this.props;
        let {userInfo} = location.state;

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
                        }}
                    />
                </div>
                <div className="four wide column">
                    <Aside
                        {...{
                            notebooks,
                            userInfo,
                        }}
                    />
                </div>
            </div>
        );
    }
}

MyPage.propTypes = propTypes;
