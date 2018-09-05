import {ThemeContext, themes} from './theme-context';
import ThemedButton from './themed-button';

//一个使用到ThemedButton组件的中间组件
function Toolbar(props) {
    return(
        <ThemedButton onClick={props.changeTheme}>
            change Theme
        </ThemedButton>
    );
}

class App extends React.Component{
    constructor(props){
        debugger;
        super(props);
        this.state={
            theme: themes.light
        };

        this.toggleTheme=()=>{
            this.setState(state =>({
                theme: state.theme === themes.dark? themes.light: themes.dark
            }));
        };
    }

    render(){
        //ThemedButton位于ThemeProvider内，在外部使用时使用来自state里面的theme,默认dark theme(zqkang:会被传的覆盖)
        return(
            <div>{/*HTML也没有Page标签啊，不对，这块p大写字母，应该是个组件*/}
                <ThemeContext.Provider value={this.state.theme}>
                    <Toolbar changeTheme={this.toggleTheme} />
                </ThemeContext.Provider>
                <Section>
                    <ThemedButton />
                </Section>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));//document.root);
