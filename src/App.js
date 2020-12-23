import React, { Component } from 'react';
import './App.css';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {
  id = 2
  state = {
    information: [
      {
        id: 0,
        name: '지혜',
        phone: '010-1111-1111'
      },
      {
        id: 1,
        name: '꿀이',
        phone: '010-1111-3333'
      }
    ],
    keyword: ''
  }

  handleChange = (e) =>{
    this.setState({
      keyword: e.target.value
    })
  }

  handleCreate = (data) =>{
    const {information} = this.state;
    this.setState({
      information: information.concat({id: this.id++, ...data})
    })
    //console.log(data);
  }

  handleRemove = (id) =>{
    const {information} = this.state;
    this.setState({
      //id 같은거만 빼고 남
      information: information.filter(info => info.id !== id)
    })
  }

  handleUpdate = (id, data) =>{
    const {information} = this.state;
    this.setState({
      information : information.map(
        info => id === info.id
          ? {...info, ...data} // 새 객체를 만들어서 기존의 값과 전달받은 data 을 덮어씀
          : info // 기존의 값을 그대로 유지
      )
    })
  }

  render() {
    const {information, keyword} = this.state;
    //filteredList를 props에 담아 PhoneInfoList로 보냄
    //PhoneInfoList의 shouldComponentUpdate에서 true 반환하고 render()실행
    const filteredList = information.filter(
      info => info.name.indexOf(keyword) !== -1
    );
    return (
      <div>
        <PhoneForm
          onCreate={this.handleCreate}
        />
        <p>
          <input
              placeholder="검색 할 이름을 입력하세요.."
              onChange={this.handleChange}
              value={keyword}
            />
        </p>
        <hr/>
        <PhoneInfoList
           data={filteredList}
           onRemove={this.handleRemove}
           onUpdate={this.handleUpdate}
         />
      </div>
    );
  }
}

export default App;

/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/
