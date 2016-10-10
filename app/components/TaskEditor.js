import React, {Component} from "react";
import $ from "jquery";
import {DefaultRoute, RouteHandler, Link, browserHistory} from "react-router";
import RichTextEditor from './RichTextEditor';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import TastyNotification from './TastyNotification';
import CircularProgress from 'material-ui/CircularProgress';

class TaskEditor extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	task: {
	  		id: '',
	  		name: '',
	  		type: '',
	  		instructions: '',
	  		answer: '',
	  		wrongAnswers: ['', '', ''],
	  		sectionId: this.props.params.sectionId
	  	},
	  	loading: false
	  };

	  this.onNameChange = this.onNameChange.bind(this);
	  this.onAnswerChange = this.onAnswerChange.bind(this);
	  this.onWrongChange = this.onWrongChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleTypeChange = this.handleTypeChange.bind(this);
	  this.onInstructionsChange = this.onInstructionsChange.bind(this);

	}

	componentDidMount() {
		$.ajax({
	      url: "http://localhost:3000/api/Tasks/" + this.props.params.taskId,
	      dataType: 'json',
	      success: function(data) {
	      	console.log(data);
	      	this.setState({task: data});
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
		});
	}

	onInstructionsChange(instructions) {
		this.setState({
				task: {
					id: this.state.task.id,
					name: this.state.task.name,  
					type: this.state.task.type, 
					instructions: instructions, 
					answer: this.state.task.answer, 
					wrongAnswers: this.state.task.wrongAnswers,
					sectionId: this.state.task.sectionId
				}
			});
	}

	onNameChange(e) {
		this.setState({
				task: {
					id: this.state.task.id,
					name: e.target.value,  
					type: this.state.task.type, 
					instructions: this.state.task.instructions, 
					answer: this.state.task.answer, 
					wrongAnswers: this.state.task.wrongAnswers,
					sectionId: this.state.task.sectionId
				}
			});
	}

	onAnswerChange(e) {
		this.setState({
				task: { 
					id: this.state.task.id,
					name: this.state.task.name, 
					type: this.state.task.type, 
					instructions: this.state.task.instructions, 
					answer: e.target.value, 
					wrongAnswers: this.state.task.wrongAnswers,
					sectionId: this.state.task.sectionId
				}
			});
	}

	onWrongChange(e) {
		if (e.target.id === 'wrongAnswer1') {
			this.setState({
				task: {
					id: this.state.task.id,
					name: this.state.task.name,
					type: this.state.task.type, 
					instructions: this.state.task.instructions, 
					answer: this.state.task.answer,
					wrongAnswers: [e.target.value, this.state.task.wrongAnswers[1], this.state.task.wrongAnswers[2]],
					sectionId: this.state.task.sectionId
				}
			});
		} else if (e.target.id === 'wrongAnswer2') {
			this.setState({
				task: {
					id: this.state.task.id,
					name: this.state.task.name,
					type: this.state.task.type, 
					instructions: this.state.task.instructions, 
					answer: this.state.task.answer,
					wrongAnswers: [this.state.task.wrongAnswers[0], e.target.value, this.state.task.wrongAnswers[2]],
					sectionId: this.state.task.sectionId
				}
			});
		} else {
			this.setState({
				task: {
					id: this.state.task.id,
					name: this.state.task.name,
					type: this.state.task.type, 
					instructions: this.state.task.instructions, 
					answer: this.state.task.answer,
					wrongAnswers: [this.state.task.wrongAnswers[0], this.state.task.wrongAnswers[1], e.target.value],
					sectionId: this.state.task.sectionId
				}
			});
		}
	}

	handleTypeChange(value) {
    	this.setState({
      		task: {
      			id: this.state.task.id,
      			name: this.state.task.name,
      			type: value,
      			instructions: this.state.task.instructions, 
				answer: this.state.answer, 
				wrongAnswers: this.state.task.wrongAnswers,
				sectionId: this.state.task.sectionId
      		},
    	});
  	};
	
	handleSubmit(e) {
		this.setState({loading:true});
		if(this.state.task.instructions.length > 0) {
			console.log(this.state.task)
			e.preventDefault();
			$.ajax({
		      url: "http://localhost:3000/api/Tasks",
		      dataType: 'json',
		      type: 'PUT',
		      data: this.state.task,
		      success: function(data) {
		      	browserHistory.push('/worksheet/' + this.props.params.worksheetId);
		      }.bind(this),
		      error: function(xhr, status, err) {
		        console.error(this.props.url, status, err.toString());
		      }.bind(this)
    		});
		} else {
			this.setState({error:true});
		}
		
	}

	render() {
		const tabStyles = {
			inkBarStyle: {
				backgroundColor: '#FFFFFF'
			}
		}
		const titleInputStyle = {
			fontSize: '2.5vh',
		}
		const paperStyle = {
		  height: '100%',
		  width: 'inherit',
		  margin: 20,
		  padding: 10,
		  display: 'inline-block',
		  border: '2px solid #36BA93'
		};

		const buttonStyles = {
			backgroundColor: 'transparent',
			rippleColor: '#36BA93',
			labelStyle: {
				color: '#36333C',
			}
		}

		const borderStyle = {
			border: '2px solid #36BA93',
			marginTop: '2.5vh',
			width: 'inherit'
		}

		const inputStyles = {
		  underlineStyle: {
		    borderColor: '#36BA93',
		  },
		  floatingLabelFocusStyle: {
		  	color: '#36BA93'
		  }
		};

		return (
			<div>
				<Grid>
					<Row className="show-grid">
						<Col md={10}>
							<MuiThemeProvider>
								<Paper style={paperStyle}>
									<TextField 
		          						id="question" 
		          						placeholder="Enter task name" 
		          						underlineFocusStyle={inputStyles.underlineStyle}
										floatingLabelFocusStyle={inputStyles.floatingLabelFocusStyle}
										underlineShow={false}
		          						style={titleInputStyle}
		          						onChange={this.onNameChange}
		          						value={this.state.task.name}
	          						/>
	          						<hr />
	          						<h4 style={{color: '#BBB9BF'}}>Select task type:</h4>
	          						<Tabs
							          onChange={this.handleTypeChange}
							          value={this.state.task.type}
							          inkBarStyle={tabStyles.inkBarStyle}
							        >
							        	<Tab 
							          		label="Learn" 
							          		value="Learn"
							          		style={{backgroundColor: '#36BA93'}} 
						          	  	/>
							        	<Tab 
							          		label="Questions" 
							          		value="Questions"
							          		style={{backgroundColor: '#36BA93'}} 
						          		/>
        							</Tabs>
								</Paper>
							</MuiThemeProvider>

							<RichTextEditor 
								updateInstructions={this.onInstructionsChange} 
								taskId={this.state.task.id} 
							/>

			        		{this.state.task.type != 'Learn' ? <MuiThemeProvider>
			        			<Paper style={paperStyle}>
			        				<Row className="show-grid">
				          				<Col md={12}>
				          					<Row className="show-grid">
				          						<Col md={6} mdOffset={3}>
						          					<TextField 
						          						id="answer" 
						          						floatingLabelText="Enter Answer"
						          						underlineFocusStyle={inputStyles.underlineStyle}
														floatingLabelFocusStyle={inputStyles.floatingLabelFocusStyle} 
						          						onChange={this.onAnswerChange}
						          						value={this.state.task.answer}
					          						/>
				          						</Col>
			          						</Row>
			          						<Row className="show-grid">
				          						<Col md={6} mdOffset={3}>
							          				<TextField 
							          					id="wrongAnswer1" 
							          					floatingLabelText="Enter Wrong Answer"
							          					underlineFocusStyle={inputStyles.underlineStyle}
														floatingLabelFocusStyle={inputStyles.floatingLabelFocusStyle} 
							          					onChange={this.onWrongChange}
							          					value={this.state.task.wrongAnswers[0]}
						          					/>
					          					</Col>
			          						</Row>

			          						<Row className="show-grid">
				          						<Col md={6} mdOffset={3}>
						          					<TextField 
						          						id="wrongAnswer2" 
						          						floatingLabelText="Enter Wrong Answer"
						          						underlineFocusStyle={inputStyles.underlineStyle}
														floatingLabelFocusStyle={inputStyles.floatingLabelFocusStyle} 
						          						onChange={this.onWrongChange}
						          						value={this.state.task.wrongAnswers[1]}
					          						/>
					          					</Col>
			          						</Row>
											
											<Row className="show-grid">
				          						<Col md={6} mdOffset={3}>
							          				<TextField 
							          					id="wrongAnswer3" 
							          					floatingLabelText="Enter Wrong Answer"
							          					underlineFocusStyle={inputStyles.underlineStyle}
														floatingLabelFocusStyle={inputStyles.floatingLabelFocusStyle} 
							          					onChange={this.onWrongChange}
							          					value={this.state.task.wrongAnswers[2]}
						          					/>
					          					</Col>
				          					</Row>
				          				</Col>
			          				</Row>
			        			</Paper>
			        		</MuiThemeProvider> : null }
	        			</Col>
	        			<Col md={2}>
	        				{!this.state.loading ?
		        				<div>
			        				 <MuiThemeProvider>
			        					<FlatButton 
											style={borderStyle}
											rippleColor={buttonStyles.rippleColor} 
											backgroundColor={buttonStyles.backgroundColor} 
											labelStyle={buttonStyles.labelStyle}
											hoverColor={buttonStyles.backgroundColor} 
											label="Save" 
											onClick={this.handleSubmit} 
										/>

									</MuiThemeProvider>
								</div> : 
								<div>
									<MuiThemeProvider>
										<CircularProgress 
											size={0.5} 
											color='#36BA93'
											style={{marginLeft: 15}} 
										/>
									</MuiThemeProvider> 
								</div>
							}
	        			</Col>
	        			<TastyNotification  open={this.state.error} message="Instructions cannot be left blank."/>
					</Row>
	    		</Grid>
			</div>
		)
	}
}
export default TaskEditor