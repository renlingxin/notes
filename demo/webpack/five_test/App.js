import imgURL from './src/img/heart.jpg'

var App = {
    template:`
        <div>
            <h2>我是一个成功的局部组件111</h2>
            <img :src="imgURL" />
        </div>
    `,
    data(){
        return{
            imgURL:imgURL
        }
    },
    created(){

    }
};
export default App;