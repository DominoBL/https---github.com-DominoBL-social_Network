import s from './Post.module.css';

const Post = (props) => {

  return (
        <div className={s.item}>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScTw8NMgDf_zpac05gkcI9EO9zu3sXzFqVnw&usqp=CAU' alt='' />
          {props.posts}
          <div>
          <span> like</span> {props.likesCount}
          </div>
        </div>
        
)
}

export default Post;