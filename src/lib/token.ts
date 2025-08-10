
// export const GetToken = () => {
//     const[token, setToken] = useState<string | null>(null)
//     useEffect(() => {
//         const storedToken = localStorage.getItem('token')
//         setToken(storedToken)
//     }, [])
// }

// export const CheckToken = () => {
//     const[token, setToken] = useState<string | null>(null)



export const RemoveToken = () => {
        localStorage.removeItem('token')
}