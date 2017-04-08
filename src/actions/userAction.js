const prefix = 'USER'
export const SETUSER = `${prefix}SETUSER`
export const USERLOGOUT = `${prefix}USERLOGOUT`

export default {
    setUser: (user) => ({
        type: SETUSER,
        payload: user
    }),
    userLogout: () => ({
        type: USERLOGOUT
    })
}