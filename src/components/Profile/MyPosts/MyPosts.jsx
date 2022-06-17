import Post from '../Post/Post';
import s from './MyPosts.module.css';
import React from "react";
import { Field, reduxForm } from 'redux-form';
import {Textarea} from '../../FormControls/FormsControls'
import { maxLengthCreator, required } from '../../../utils/validators/validators';

const maxLength10 =  maxLengthCreator(10)


const MyPosts = React.memo(props => {

    // componentDidMount() {
    //     setTimeout( () =>
    //     this.setState({a:12}),3000)
    // }

    // shouldComponentUpdate(nextProps, nextState) {                 //PureComponent делает эту проверку
    //     return nextProps != this.props || nextState != this.state
    // }

    console.log("yo")
    let postsElements = props.posts.map(posts=> <Post posts={posts.post} likesCount={posts.likesCount} /> ) ;
    let newPostElement = React.createRef();
    let addNewPost = (values) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={s.postBlock}>
            My post
           <AddNewPostFormRedux onSubmit={addNewPost} />
            <div className={s.posts}>
                {postsElements}
                <div className={s.item}>
                    post2
                </div>
            </div>
        </div>)
}
)



const addNewPostForm = (props) => {
    return <form onSubmit={props.handleSubmit}> 
    <div>
    <div>
        <Field component={Textarea} name={'newPostText'} placeholder={'What is new?'} validate={[required, maxLength10]} />
    </div>
    <div>
        <button className={s.btnAddPost}>Add post</button>
        <button className={s.btnDeletePost}>Delete</button>
    </div>
</div>
</form>
}
const AddNewPostFormRedux = reduxForm({form: 'profileAddNewPostForm'})(addNewPostForm)

export default MyPosts;