import React from 'react';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';

import { vote } from '../store/actions';
import { color } from '../services/color';

const Poll = ({ poll, vote }) => {


  const answers =
    poll.options && // its checking if poll.options exists or not, if it not exists then mapping operation won't be executed
    poll.options.map(option => (
      <button
        onClick={() => vote(poll._id, { answer: option.option })}
        className="button"
        key={option._id}>
        {option.option}
      </button>
    ));

  const data = {
    labels: poll.options.map(option => option.option),
    datasets: [
      {
        label: poll.question,
        backgroundColor: poll.options.map(option => color()),
        borderColor: '#323643',
        data: poll.options.map(option => option.votes),
      },
    ],

    // Dataset object:

    // This object represents the dataset to be displayed on the chart.
    // label: This property holds the label for the dataset, which typically describes what the dataset represents. In this case, it's the question of the poll.
    // backgroundColor: This property holds an array of background colors for each data point in the dataset. The colors are generated dynamically using the color() function.
    // borderColor: This property specifies the color of the borders around each data point.
    // data: This property holds an array of numerical data values. These values are derived from the votes property of each option in the poll object.

  };
  // This code snippet is likely used to generate data for a chart, such as a bar chart or a pie chart, using a library like Chart.js

  return (
    <div>
      <h3 className="poll-title">{poll.question}</h3>
      <div className="buttons_center">{answers}</div>
      <Pie data={data} /> 
    </div>
  );
};

export default connect(
  store => ({
    poll: store.currentPoll,
  }),
  { vote },
)(Poll);
