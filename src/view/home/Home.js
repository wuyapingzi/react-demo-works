import React, {Component} from 'react';

import PreviewList from 'preview/PreviewList';
import Recommend from 'components/home/Recommend';
import cfg from 'config/config.json';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            previews: [],
            authors: [],
        };
    }
    //在组件挂在完成之后去拿数据
    componentDidMount(){
        Promise.all([
            $.post(`${cfg.url}/getPreview`),
            $.post(`${cfg.url}/getAuthor`)
        ]).then(values => {
            let previewRet = values[0] || [];
            let authorRet = values[1] || [];
            if(previewRet.code === 0){
                this.setState({
                    previews: previewRet.data,
                })
            }
            if(authorRet.code === 0){
                this.setState({
                    authors: authorRet.data
                })
            }
        })
    //     $.post(`${cfg.url}/getPreview`)
    //     .done(ret => {
    //         if(ret.code === 0){
                
    //         }
    //     })
    }

    render(){
        let {previews, authors} = this.state;
        return (
            <div className="ui container grid">
                <div className="column twelve wide">
                    <PreviewList 
                        previews={previews}
                    />
                </div>
                <div className="column four wide">
                    <Recommend
                        {...{
                            authors
                        }}
                    />
                </div>
            </div>
        );
    }
}
