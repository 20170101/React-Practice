'use strict';

const e = React.createElement;
/**
 * zqkang:在此示例中，我们只依赖了浏览器原生支持的特性。这就是为什么我们使用
 * 了js函数调用（const e = React.createElement;然后下边用e）来告诉react要显示什么
 * 另外react还有一种使用JSX编写界面的方式
 */

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);