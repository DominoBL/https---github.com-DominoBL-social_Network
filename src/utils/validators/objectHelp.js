
               // users: state.users.map(u => {
                //     if (u.id === action.userId) {
                //         return {...u, followed: false}
                //     }
                //     return u;
                // })

import {Field } from "redux-form";

            

export const updateObjectArray = (items, itemId, objPropName, newObjectProps) => {
   return items.map(u => {
        if(u[objPropName] === itemId) {
            return {...u, ...newObjectProps}
        }
        return u;
    })
}
