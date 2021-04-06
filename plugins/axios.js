export default ({$axios, store})=>{
    $axios.setHeader('Content-Type','application/json');
    $axios.setHeader(store.api_token,'bearer');
}