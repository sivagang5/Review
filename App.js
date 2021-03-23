// import logo from './logo.svg';
import React from 'react';
import axios from '/Users/Siva/node_modules/axios';
import './App.css';
// import { Component } from 'react/cjs/react.development';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Hello World!
//         </p>

//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
// function Ax1() {
//   return (
//   axios.get('https://jsonplaceholder.typicode.com/posts')
//   .then(response => console.log(response.data))
//   .catch(error => console.log(error))
//   );
// }

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id:'',
      userId:'',
      title:'',
      body:'',
      posts: []
    }
  }

  createPost = async () => {
    const {data} = await axios.post('https://jsonplaceholder.typicode.com/posts',
    {
      userId: this.state.userId,
      title: this.state.title,
      body: this.state.body,
    });
    let posts = [...this.state.posts]
    posts.push(data)
    this.setState({posts})
  }

  async componentDidMount(){
    const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts')
    this.setState({posts:data})
  }

  handleSubmit = e => {
    e.preventDefault()
    this.createPost()
  }

  handleChange = ({target: {name,value}}) => {
    this.setState({[name]:value})
  }

  selectPostForUpdate = id => {
    let posts = [...this.state.posts]
    let selectedPost = posts.filter(post=>post.id===id)[0]
    this.setState({...selectedPost})
  }

  updatePost = async () => {
    const {data} = await axios.put(`https://jsonplaceholder.typicode.com/posts/${this.state.id}`,
    {
      userId: this.state.userId,
      title: this.state.title,
      body: this.state.body,
    });
    let posts = [...this.state.posts]
    let postIndex = posts.findIndex(post=>post.id===this.state.id)
    posts[postIndex] = data
    this.setState({posts, id:'', userId:'', title:'', body:''})
  }

  render () {
    return(
      <div>
        <h2>List of Posts</h2>
        
        <form onSubmit={this.handleSubmit}> 
          <div>
            <label>User Id: </label>
            <input type='text' name='userId' value={this.state.userId} onChange={this.handleChange}/>
          </div>
          <br/>
          <div>
            <label>Title: </label>
            <input type='text' name='title' value={this.state.title} onChange={this.handleChange}/>
          </div>
          <br/>
          <div>
            <label>Body: </label>
            <input type='text' name='body' value={this.state.body} onChange={this.handleChange}/>
          </div>
          <br/>
          <div>
            <button type='Submit'>Add Post</button>
          </div>
          <br/>
        </form>

        <table>
          <thead>
            <tr>
              <td>User Id</td>
              <td>Title</td>
              <td>Body</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map (({id,title,body,userId})=>(
              <tr key={id}>
                <td>{userId}</td>
                <td>{title}</td>
                <td>{body}</td>
                <td>
                  <button onClick={()=>this.selectPostForUpdate(id)}>Update</button>
                  {/* <button onClick={()=>this.deletePost(id)}>Delete</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    )
  }
}



