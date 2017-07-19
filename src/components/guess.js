import React ,{Component} from 'react';

class Guess extends Component{
	constructor(props){
		super(props);

		this.state={
			randomNumber : Math.floor(Math.random() *10) + 1,
			userGuess : '',
			outcome:'',
			history:[],
			Try: 10
		}
	}
	handleChange(e){
			this.setState({
				userGuess: e.target.value
			});		
	}

	submitGuess(e){
			e.preventDefault();
			let { randomNumber, userGuess } = this.state;
			userGuess = parseInt(userGuess);
			let newOutcome = '';

			if(userGuess > randomNumber){
				newOutcome = "TOO HIGH";
				this.subTry();
				
			}else if(userGuess < randomNumber){
				newOutcome = "TOO LOW";
				this.subTry();
				
			}else if(userGuess === randomNumber){
				newOutcome = "YOU GOT IT!";
				this.newRandomNumber();
				this.addTry();
				

			}else{
				newOutcome = "INPUT NUMBER!";
			}

			const newHistory = `You guessed : ${userGuess}   Outcome: ${newOutcome}`;
			isNaN(userGuess) ? "":this.setState({
				outcome:newOutcome,
				history:[newHistory, ...this.state.history]
			});
		}
	subTry(){
			this.state.Try === 0? this.gameOver():this.setState({
			Try: this.state.Try - 1
		})
	}


	addTry(){
		this.setState({
			Try: this.state.Try + 1
		})
	}

	reset(e){
	this.setState({
		randomNumber: Math.floor(Math.random() * 10 ) + 1,
		userGuess: "",
		history: [],
		outcome: "",
		Try: 10
		})
	}

	gameOver(e){
			this.setState({
			randomNumber: Math.floor(Math.random() * 10 ) + 1,
			userGuess: "",
			history: [],
			outcome: "",
			Try: 10
		})
			alert("game over!You dont have any Tries")
	}
	newRandomNumber(e){
		
		this.setState({
			randomNumber : Math.floor(Math.random() *50) + 1,
		})
	}




	render(){
		const{ outcome, history } = this.state;

		const historyOutput = history.map((item,index)=>{
			return <h5 key={index}>{item}</h5>;
		});
		return(
				<div id="bigContainer">
					<div>
						<div>
							
							<div id="try">Tries: {this.state.Try}</div>
							<form onSubmit={(e)=> this.submitGuess(e)}>
									<div>
											<input onChange={(e) => this.handleChange(e)} type="number" value={this.state.userGuess}/>
													<span>
												<button  id="btn">Guess</button>
												<button  id="btn" onClick={(e) => this.reset(e)}>Restart</button>
													</span> 
											</div>
											<div id="outcome">
											<h2   className={(outcome === 'YOU GOT IT!'? "text-success":(outcome === "TOO HIGH" ? "text-danger" :"text-primary"))}>{outcome}</h2>
											</div>
										</form>
									</div>
								</div>
									<div id="historybox" className="col-sm-12">	
									<div> {historyOutput}</div>
							</div>
			</div>
			)
	}
}



export default Guess;