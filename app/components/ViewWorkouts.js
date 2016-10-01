import React, {Component} from "react";
import $ from "jquery";
import {DefaultRoute, RouteHandler, Link} from "react-router";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

class ViewWorkouts extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	workouts: []
	  };
	}

	componentDidMount() {
		$.ajax({
      		url: "http://localhost:3000/api/Workouts?filter=%7B%22limit%22%3A%20%2210%22%7D&access_token=iTk6s6Boej92VgEFrKNnvg4rqD1uXjZmAUoNtHKgIqOwxi0LpnEToMK8SKYcjXuC",
      		dataType: 'json',
      		success: function(data) {
      			console.log(data)
        		this.setState({workouts: data});
      		}.bind(this),
      		error: function(xhr, status, err) {
        		console.error('#GET Error', status, err.toString());
      		}.bind(this)
    	});
	}
	render() {



		const paperStyle = {
		  height: 100,
		  width: 350,
		  margin: 5,
		  textAlign: 'center',
		  display: 'inline-block',
		  backgroundColor: 'none',
		  border: '2px solid #36333C'
		};

		const workoutTitleStyle = {
			textTransform: 'uppercase',
			float: 'left'
		}
		var workouts = this.state.workouts.map(function(workout) {
			return (
				<MuiThemeProvider>
        			<Paper key={workout.id} style={paperStyle}>
        				<h5 style={workoutTitleStyle}>{workout.title}</h5>
    				</Paper>
    			</MuiThemeProvider> 
      		); 

      		console.log(workouts)
		});

		return (
			<div>
				{workouts}
			</div>
		)
	}
}
export default ViewWorkouts