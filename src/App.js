import React, { useState } from "react";
import useForm from "react-hook-form";
import "./App.css";

function App() {
	const { register, handleSubmit, errors } = useForm();
	const [indexes, setIndexes] = useState([]);
	const [counter, setCounter] = useState(0);

	const onSubmit = data => {
		console.log(JSON.stringify(data, null, 2));
	};

	const addFriend = () => {
		setIndexes(prevIndexes => [...prevIndexes, counter]);
		setCounter(prevCounter => prevCounter + 1);
	};

	const removeFriend = index => () => {
		setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
	};

	const clearFriends = () => {
		setIndexes([]);
	};

	return (
		<div className='App'>
			<header className='App-header'>
				<h1>This Is A Form </h1>
				{/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
				<form onSubmit={handleSubmit(onSubmit)}>
					<label>
						Your Name
						<input name='name' ref={register({ required: true })} />
					</label>
					{errors.name && <p>This field is required</p>}
					<label>
						Your Email
						<input name='email' ref={register({ required: true })} />
					</label>
					{errors.email && <p>This field is required</p>}
					{indexes.map(index => {
						const fieldName = `friends[${index}]`;
						return (
							<fieldset name={fieldName} key={fieldName} className='friendBox'>
								<label>
									First Name {index}:
									<input
										type='text'
										name={`${fieldName}.firstName`}
										ref={register}
									/>
								</label>

								<label>
									Last Name {index}:
									<input
										type='text'
										name={`${fieldName}.lastName`}
										ref={register}
									/>
								</label>
								<button type='button' onClick={removeFriend(index)}>
									Remove
								</button>
							</fieldset>
						);
					})}
					<div className='buttonsBox'>
						<button type='button' onClick={addFriend}>
							Add Friend
						</button>
						<button type='button' onClick={clearFriends}>
							Clear Friends
						</button>
					</div>
					<input type='submit' />
				</form>
			</header>
		</div>
	);
}

export default App;
