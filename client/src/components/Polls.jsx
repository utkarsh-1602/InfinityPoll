import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getPolls, getUserPolls } from '../store/actions';

class Polls extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChatClick = this.handleChatClick.bind(this);
    // In React, the bind.this method is often used to ensure that when an event handler function is passed down as a prop to other components or used in asynchronous contexts, the this keyword inside it still refers to the correct component instance.
  }
  componentDidMount() {
    const { getPolls } = this.props;
    getPolls();
  }

  handleSelect(id) {
    const { history } = this.props;
    history.push(`/poll/${id}`);
  }

  handleChatClick() {
    const { history } = this.props;
    history.push('/chat'); // Redirect to the Chat component
  }

  render() {
    const { getPolls, getUserPolls, auth } = this.props;

    const polls = this.props.polls.map(poll => (
      <li onClick={() => this.handleSelect(poll._id)} key={poll._id}>
        {poll.question}
      </li>
    ));

    return (
      <Fragment>
        {auth.isAuthenticated && (
          <div className="buttons_center">
            <button className="button" onClick={getPolls}>
              All polls
            </button>
            <button className="button" onClick={getUserPolls}>
              My polls
            </button>
            <button className='button' onClick={this.handleChatClick}>
              Chat
            </button>
          </div>
        )}
        <ul className="polls">{polls}</ul>
      </Fragment>
    );
  }
}

export default connect(
  store => ({
    auth: store.auth,
    polls: store.polls,
  }),
  { getPolls, getUserPolls },
)(Polls);
