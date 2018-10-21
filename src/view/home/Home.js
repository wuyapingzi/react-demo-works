
import PreviewList from 'preview/PreviewList';
import Recommend from 'components/home/Recommend';

import cfg from 'config/config.json';

let propTypes = {
    initMyPage: PT.func
};

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            previews: [],
            authors: []
        }
    }

    componentDidMount(){
        $.post(`${cfg.url}/getPreview`)
        .done(ret=>{
            if(ret.code===0){
                this.setState({
                    previews: ret.data
                });
            }
        });

        $.post(`${cfg.url}/getAuthor`)
        .done(ret=>{
            if(ret.code===0){
                this.setState({
                    authors: ret.data
                });
            }
        });
    }

    render(){

        let {previews, authors} = this.state;

        let {initMyPage, history} = this.props;

        return (
            <div className="ui container grid">
                <div className="column twelve wide">
                    <PreviewList
                        {...{
                            previews,
                            initMyPage
                        }}

                    />
                </div>
                <div className="column four wide">
                    <Recommend
                        {...{
                            authors,
                            initMyPage,
                        }}
                    />
                </div>
            </div>
        );
    }
}

Home.propTypes = propTypes;
