// import logo from './logo.svg';
import React from 'react';
import axios from '/Users/Siva/node_modules/axios';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core/';
import { Button } from '@material-ui/core/';
import { TextField } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core';


const url = 'https://jsonplaceholder.typicode.com/posts'

const useStyles = theme => ({
  bg1: {
     backgroundColor: '#b8fcef'
   },
   bg2: {
    backgroundColor: '#a5f2e3',
  },
  btn: {
    backgroundColor: '#32a197',
    color: 'white'
  },
  th: {
    backgroundColor: '#8ee8d7',
    color: '#3946bd',
  },
  thc: {
    color: '#3946bd',
    fontSize: '20px'
  },
  tbc: {
    color: '#3946bd',
    fontSize: '16px'
  }
});

class App extends React.Component {
  
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
    const {data} = await axios.post(url,
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
    const {data} = await axios.get(url)
    this.setState({posts:data})
    
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.id) {
      this.updatePost()
    } else {
      this.createPost()
    }
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
    const {data} = await axios.put(`${url}/${this.state.id}`,
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

  deletePost = async postId => {
    await axios.delete(`${url}/${postId}`)
    let posts = [...this.state.posts]
    posts = posts.filter(post=>post.id !== postId)
    this.setState({posts})
  }

  render () {
    const { classes } = this.props;
    return(
      <Container>
      
        <div className={classes.bg1}>
          <Typography variant='h3' color='primary' align='center' >
            Reviews
          </Typography>
          <Typography variant='h5' color='primary' align='center'>
          {this.state.id ? "Update" : "Add New"} Post
            
          </Typography>
          <br/>
          <Typography align='center' color='primary'>
          <form onSubmit={this.handleSubmit}> 
            <div>
              <TextField label="User Id" variant="outlined" name='userId' value={this.state.userId} onChange={this.handleChange} />
            </div>
            <br/>
            <div>
              <TextField label="Title" variant="outlined" name='title' value={this.state.title} onChange={this.handleChange} />
            </div>
            <br/>
            <div>
              <TextField label="Body" variant="outlined" name='body' value={this.state.body} onChange={this.handleChange} />
            </div>
            <br/>
            <div>
              <Button variant='contained' color='primary' type='Submit' >{this.state.id ? "Update" : "Add"} Post</Button>
            </div>
            <br/>
          </form>
          </Typography>
        </div>
        
        <div className={classes.bg2}>
          <br/>
          <Typography variant='h4' color='primary' align='center'>
            List of Posts
          </Typography>
          
          <Table>
            <TableHead className={classes.th}>
              <TableRow>
                <TableCell className={classes.thc}>Id</TableCell>
                <TableCell className={classes.thc}>User Id</TableCell>
                <TableCell className={classes.thc}>Title</TableCell>
                <TableCell className={classes.thc}>Body</TableCell>
                <TableCell className={classes.thc}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.posts.map (({id,title,body,userId})=>(
              <TableRow key={id} color='primary'>
                <TableCell className={classes.tbc}>{id}</TableCell>
                <TableCell className={classes.tbc}>{userId}</TableCell>
                <TableCell className={classes.tbc}>{title}</TableCell>
                <TableCell className={classes.tbc}>{body}</TableCell>
                <TableCell>
                  <Button variant='contained' className={classes.btn} onClick={()=>this.selectPostForUpdate(id)}>Update</Button>
                  <Button variant='contained' className={classes.btn} onClick={()=>this.deletePost(id)}>Delete</Button>
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

      </Container>
    )
  }
}

export default withStyles(useStyles)(App)
