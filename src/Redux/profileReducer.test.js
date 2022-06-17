import profileReducer, { addPostActionCreator } from "./profileReducer";



test('new post should be added', () => {
    //1.test data
    let action = addPostActionCreator("ravil")
    let state = {
        posts: [
            {id: 0, post: 'Hi, what`s up', likesCount: 12},
            {id: 1, post: 'Hey, i am good enough', likesCount: 412}
        ]}
    //2.action
    let newState = profileReducer (state,action)

    //3.expectation
    expect(newState.posts.length).toBe(3 ); 

  });


  test('new post should be ravil', () => {
    //1.test data
    let action = addPostActionCreator("ravil")
    let state = {
        posts: [
            {id: 0, post: 'Hi, what`s up', likesCount: 12},
            {id: 1, post: 'Hey, i am good enough', likesCount: 412}
        ]}
    //2.action
    let newState = profileReducer (state,action)

    //3.expectation
    expect(newState.posts[2].post).toBe("ravil")  

  });

  test('new post should be decrement', () => {
    //1.test data
    let action = addPostActionCreator("ravil")
    let state = {
        posts: [
            {id: 0, post: 'Hi, what`s up', likesCount: 12},
            {id: 1, post: 'Hey, i am good enough', likesCount: 412}
        ]}
    //2.action
    let newState = profileReducer (state,action)

    //3.expectation
    expect(newState.posts[2].post).toBe("ravil")  

  });


