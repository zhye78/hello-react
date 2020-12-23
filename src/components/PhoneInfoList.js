import React, {Component} from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component{
  static defaultProps = {
    list: [],
    onRemove: () => console.warn('onRemove not defined'),
    onUpdate: () => console.warn('onUpdate not defined')
  }

  //받아올 데이터가 현재 데이터와 다를때 true 리턴
  //굳이 변화가 필요하지 않을 때는 render 함수가 호출되지 않게 함
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.data != this.props.data;
  }

  render(){
    console.log('render PhoneInfoList');
    const {data, onRemove, onUpdate} = this.props;
    const list = data.map(
      info => (
        <PhoneInfo
          key={info.id}
          info={info}
          onRemove={onRemove}
          onUpdate={onUpdate}
         />)
    );

    return(
      <div>
        {list}
      </div>
    );
  }
}

export default PhoneInfoList;
