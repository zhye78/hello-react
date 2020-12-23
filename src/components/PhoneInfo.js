import React, {Component} from 'react';

class PhoneInfo extends Component{
  static defaultProps = {
    info: {
      name: '이름',
      phone: '010-0000-0000',
      id: 0
    }
  }

  state = {
    //수정모드-수정 버튼 누르면 true & text 형태의 값들을 iput 형태로 표시
    editing: false,
    name: '',
    phone: ''
  }

  handleRemove = () =>{
    const {info, onRemove} = this.props;
    onRemove(info.id);
  }

  //editing값 반전시키는 함수
  handleToggleEdit = () =>{
    const {editing} = this.state;
    this.setState({
      editing: !editing
    })
  }

  //수정 시 input에서 onChange 이벤트 발생될 때 호출되는 함수
  handleChange = (e) =>{
    const {name, value} = e.target;
    this.setState({
      [name]: value
    })
  }

  //editing 값이 바뀔 때 마다 처리하는 함
  componentDidUpdate(prevProps, prevState){
    const {info, onUpdate} = this.props;

    //editing false->true 변경될 때
    if(!prevState.editing && this.state.editing){
      this.setState({ //info값을 state에 넣어 줌
        name: info.name,
        phone: info.phone
      })
    }

    //editing true->false 변경될 때
    if(prevState.editing && !this.state.editing){
      onUpdate(info.id, { //input값 부모에게 전달
        name: this.state.name,
        phone: this.state.phone
      });
    }
  }

  //추가되는 항목만 렌더링하도록 최적화
  shouldComponentUpdate(nextProps, nextState){
    //editing 상태가 아니고, info값이 같다면 렌더링 안함
    if(!this.state.editing && !nextState.editing
        && nextProps.info === this.props.info){
      return false;
    }
      return true;
  }

  render(){
    console.log('render PhoneInfo ' + this.props.info.id);

    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px'
    };

    const {editing} = this.state;

    if(editing){ //수정모드일때
      return (
        <div style={style}>
          <div>
            <input
              value={this.state.name}
              name="name"
              placeholder="이름"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              value={this.state.phone}
              name="phone"
              placeholder="전화번호"
              onChange={this.handleChange}
            />
          </div>
          <button onClick={this.handleToggleEdit}>적용</button>
          <button onClick={this.handleRemove}>삭제</button>
        </div>
      );
    }

    const {
      name, phone, id
    } = this.props.info;

    return (
      <div style={style}>
        <div><b>{name}</b></div>
        <div>{phone}</div>
        <button onClick={this.handleToggleEdit}>수정</button>
        <button onClick={this.handleRemove}>삭제</button>
      </div>
    );
  }
}

export default PhoneInfo;
