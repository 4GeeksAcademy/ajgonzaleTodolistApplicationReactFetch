import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {

	const [list, setList] = useState(['Make the bed', 'Make a bot', 'develop an project']);
	const [item, setItem] = useState('');

	function getList() {
		fetch('https://playground.4geeks.com/todo/users/ajgonzale')
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			console.log(data);
			setList(data.todos);
		});
	}

	useEffect(() => {
		getList()
	}, []);

	let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"label": "","is_done": false})
    };   

	function addItem() {
		
		requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({"label": item,"is_done": false})
		};

		fetch('https://playground.4geeks.com/todo/todos/ajgonzale', requestOptions)
			.then(response => response.json())
			.then(data => {
				console.log(data);
				console.log(list);
				setList([...list, data]);
			});
		setItem('');		
	}

	function removeItem(id) {

		requestOptions = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
		};
		
		fetch('https://playground.4geeks.com/todo/todos/'+id, requestOptions)
			.then(response => {
				getList();
			});
	}

	return (
		<div className="text-center container-fluid d-flex justify-content-center">
			<div>
				<h1 className="text-center mt-5 tittle" >todos</h1>
				<div>
					<input type="text" className="w-100 border-bottom input" onChange={e => setItem(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter') addItem()}} value={item}></input>
				</div>
				<div id='parentItems'>{ 
							list.map((item, index) => {
								return <div key={index} className="itemList"><div>{item.label}</div><i className="fas fa-times" onClick={e => removeItem(item.id)}></i></div>
							}) 
						}
						{ list.length == 0 && <div className="itemList">No tasks, add a task</div>}
				</div>
				<div className='bottomList'>{list.length} item left</div>
				<p className="p-3">
					Made by{" "}
					<a href="#">Alejandro Gonzalez</a>, with
					love!
				</p>`
			</div>
		</div>
	);
};

export default Home;